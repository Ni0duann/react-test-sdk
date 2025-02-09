import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { UAParser } from 'ua-parser-js';


// 扩展全局 Window 接口
declare global {
  interface Window {
    someVar?: {
      error: string;
    };
  }
}

// 在组件外生成并存储UUID
let uuid = localStorage.getItem('uuid');
if (!uuid) {
  uuid = uuidv4();
  localStorage.setItem('uuid', uuid);
}

function App() {
  const navigate = useNavigate()
  const navigationType = useNavigationType();
  const location = useLocation();
  const [entryTime, setEntryTime] = useState<number | null>(null);

  const sendPageView = (path: string) => {
    const userAgent = new UAParser(navigator.userAgent);

    const data = {
      page_path: path,
      browser: userAgent.getBrowser().name,
      os: userAgent.getOS().name,
      device_type: userAgent.getDevice().type || 'desktop',
      timestamp: new Date().toISOString(),
    };

    fetch('http://localhost:5501/api/page-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(console.error);
  };

  //更新用户点击页面次数发送到数据库
  const updatePvUv = async (eventId: string) => {
    try {
      await fetch(`http://localhost:5501/api/update-pv-uv/${eventId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('更新 pv/uv 数据失败:', error);
    }
  };

  // 记录用户进入某个页面的时间
  useEffect(() => {
    setEntryTime(Date.now());
    // 组件卸载时计算停留时长并发送到服务端
    return () => {
      if (entryTime) {
        const exitTime = Date.now();
        const duration = exitTime - entryTime;
        sendDurationData(location.pathname, duration);
      }
    };
  }, [location.pathname, entryTime]);

  // 将用户进入某个页面的时间发送到数据库
  const sendDurationData = async (pagePath: string, duration: number) => {
    try {
      await fetch('http://localhost:5501/api/report-duration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pagePath,
          duration
        })
      });
    } catch (error) {
      console.error('发送停留时长数据失败:', error);
    }
  };

  // // 监控路由跳转，收集用户浏览页面次数发送到数据库，更新 PV 和 UV
  // useEffect(() => {
  //   console.log('Navigation Type:', navigationType);
  //   console.log('Location Pathname:', location.pathname);
  //   // 处理首次加载
  //   if (!entryTime) {
  //     const path = location.pathname;
  //     const eventId = path.split('/').pop();
  //     console.log('epath ', path);
  //     console.log('eventId', eventId);
  //     if (eventId) {
  //       updatePvUv(eventId);
  //     }
  //     setEntryTime(Date.now());
  //   }
  //   if (navigationType === 'PUSH' || navigationType === 'REPLACE') {
  //     const path = location.pathname;
  //     // 提取页面标识，例如 /Page1 提取出 1
  //     const eventId = path.split('/').pop();
  //     console.log('eventId', eventId)
  //     if (eventId) {
  //       updatePvUv(eventId);
  //     }
  //   }
  // }, [navigationType, location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold underline text-gray-800">前端异常</h1>
      <div className="flex flex-row space-x-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out shadow-md"
          onClick={() => {
            if (window.someVar) {
              window.someVar.error = "error";
            }
          }}
        >
          代码执行异常
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out shadow-md"
          onClick={() => {
            new Promise(function (resolve, reject) {
              if (window.someVar) {
                window.someVar.error = "error";
              }
              reject(new Error("Promise异常"));
            }).catch((error) => console.error(error));
          }}
        >
          Promise异常
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out shadow-md"
          onClick={() => console.log("bugAsset")}
        >
          静态资源加载异常
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out shadow-md"
          onClick={() => {
            console.error(new Error("错误捕获"));
          }}
        >
          console.error 异常
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out shadow-md"
          onClick={() => {
            console.log("todo");
          }}
        >
          跨域异常
        </button>
      </div>
      <h1 className="text-4xl font-bold underline text-gray-800">接口异常</h1>
      <div className="flex flex-row justify-between space-x-5">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out shadow-md"
          onClick={() => {
            console.log("todo");
          }}
        >
          未响应/超时响应异常
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out shadow-md"
          onClick={() => {
            console.log("todo");
          }}
        >
          4xx 请求异常
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out shadow-md"
          onClick={() => {
            console.log("todo");
          }}
        >
          fetch 请求异常
        </button>
      </div>
      <h1 className="text-4xl font-bold underline text-gray-800">白屏异常</h1>

      <div className="flex flex-row space-x-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out shadow-md"
          onClick={() => {
            // alert("页面加载时已经监控");
            navigate('/White')
          }}
        >
          白屏异常
        </button>
      </div>

      <h1 className="text-4xl font-bold underline text-gray-800">行为数据</h1>
      <div className="flex flex-row space-x-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out shadow-md"
          onClick={() => {
            alert("页面加载时已经监控");
          }}
        >
          用户设备类型，浏览器版本，webview引擎类型
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out shadow-md"
          onClick={() => {
            alert("页面加载时已经监控");
          }}
        >
          获取页面性能指标
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out shadow-md"
          onClick={() => {
            alert("页面加载时已经监控");
          }}
        >
          获取页面性能指标
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out shadow-md"
          onClick={() => {
            updatePvUv('1');
            navigate('/Page1');
          }}
        >
          点击事件1
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out shadow-md"
          onClick={() => {
            updatePvUv('2');
            navigate('/Page2');
          }}
        >
          点击事件2
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out shadow-md"
          onClick={() => {
            updatePvUv('3');
            navigate('/Page3');
          }}
        >
          点击事件3
        </button>
      </div>
    </div>
  );
}

export default App;


// // typescript jacscript
// import { Monitor } from "../dist/index";

// window.addEventListener('load', function () {
//   const monitor = new Monitor({
//     // 配置项
//     reportUrl: 'http://127.0.0.1:5501/'
//   });
// });