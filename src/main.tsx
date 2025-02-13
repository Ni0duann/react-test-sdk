import { createRoot } from 'react-dom/client'
import './index.css'
import router from './router'
// import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { Monitor } from "../dist/index";

// 初始化监控并配置性能数据上报地址
const monitor = new Monitor({
    reportUrl: 'http://localhost:5500/api/push_pref',
    delay: 3000 // 等待3秒确保性能数据稳定
});


createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
    
)
