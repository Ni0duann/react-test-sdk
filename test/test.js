// test.js
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 基础路径配置（根据实际项目结构调整）
const thisPath = path.resolve(__dirname); // 脚本在 test 目录下
const basePath = path.dirname(path.dirname(thisPath));//获取项目的根路径

const services = {
    influx: {
        name: 'InfluxDB',
        cmd: process.platform === 'win32' ? '.\\influxd.exe' : './influxd',
        cwd: path.join(basePath, 'influx'), // 调整路径指向 influx 目录
        readyPattern: /msg="Welcome to InfluxDB"/ 
    },
    test: {
        name: 'Test Page',
        cmd: process.platform === 'win32' ? 'npm.cmd' : 'npm',
        args: ['run', 'dev'],
        cwd: path.join(basePath, 'react-test-sdk'),
        readyPattern: /Compiled successfully/, // 根据实际输出调整
        url: 'http://localhost:3003' // 假设的默认端口，根据实际修改
    },
    web: {
        name: 'Web Dashboard',
        cmd: process.platform === 'win32' ? 'npm.cmd' : 'npm',
        args: ['run', 'dev'],
        cwd: path.join(basePath, 'monitor-web'),
        readyPattern: /Compiled successfully/, // 根据实际输出调整
        url: 'http://localhost:3002' // 假设的默认端口，根据实际修改

    },
    node: {
        name: 'Node Server',
        cmd: 'node',
        args: ['index.js'],
        cwd: path.join(basePath, 'monitor-node','src',),
        readyPattern: /Server is running/, // 根据实际输出调整
        url: 'http://localhost:3001' // 假设的默认端口，根据实际修改
    }
};

// 进程容器
const processes = [];

// 带就绪检测的服务启动器
async function startServiceWithReadyCheck(service) {
    return new Promise((resolve, reject) => {
        const child = spawn(service.cmd, service.args || [], {
            cwd: service.cwd,
            shell: true,
            stdio: ['pipe', 'pipe', 'pipe']
        });

        // 输出处理
        child.stdout.on('data', (data) => {
            const output = data.toString();
            console.log(`[${service.name}] ${output}`);

            // 检测就绪信号
            if (service.readyPattern && service.readyPattern.test(output)) {
                console.log(`✅ ${service.name} 已就绪`);
                resolve(child);
            }
        });

        child.stderr.on('data', (data) => {
            console.error(`[${service.name} ERROR] ${data}`);
        });

        child.on('error', (err) => {
            console.error(`[${service.name} 启动错误]`, err);
            reject(err);
        });

        child.on('close', (code) => {
            if (code !== 0) {
                console.error(`[${service.name}] exited with code ${code}`);
                reject(new Error(`${service.name} exited with code ${code}`));
            }
        });
    });
}

// 普通服务启动器
function startService(service) {
    const child = spawn(service.cmd, service.args || [], {
        cwd: service.cwd,
        shell: true,
        stdio: 'inherit'
    });
    processes.push(child);
    return child;
}

async function main() {
    try {
        console.log('basePath', basePath)
        // 第一步：启动 InfluxDB 并等待就绪
        console.log('🚦 正在启动 InfluxDB...');
        const influxProcess = await startServiceWithReadyCheck(services.influx);
        processes.push(influxProcess);
        console.log('✅ InfluxDB 已就绪');

        // 第二步：启动 Node Server
        console.log('🚦 正在启动 Node 服务端...');
        startService(services.node);

        // 第三步：并行启动前端服务
        console.log('🚦 正在启动前端服务...');
        startService(services.test);
        startService(services.web);

        console.log('\n🚀 所有服务已启动！按 Ctrl+C 停止');

        // 退出处理
        process.on('SIGINT', () => {
            console.log('\n🛑 正在停止所有服务...');
            processes.forEach(p => p.kill());
            process.exit();
        });

    } catch (error) {
        console.error('\n❌ 启动失败:', error);
        process.exit(1);
    }
}

main()
