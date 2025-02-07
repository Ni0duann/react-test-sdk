// 扩展全局 Window 接口
declare global {
  interface Window {
    someVar?: {
      error: string;
    };
  }
}
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()
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
            navigate('/Page1') ;
          }}
        >
          点击事件1
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out shadow-md"
          onClick={() => {
            navigate('/Page2') ;
          }}
        >
          点击事件2
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out shadow-md"
          onClick={() => {
            navigate('/Page3') ;
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