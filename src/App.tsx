// 扩展全局 Window 接口
declare global {
  interface Window {
    someVar?: {
      error: string;
    };
  }
}

function App() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-3xl font-bold underline">异常数据</h1>
      <h2>前端异常</h2>
      <div className="flex flex-row space-x-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
          onClick={() => {
            if (window.someVar) {
              window.someVar.error = "error";
            }
          }}
        >
          代码执行异常
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
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
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
          onClick={() => console.log("bugAsset")}
        >
          静态资源加载异常
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
          onClick={() => {
            console.error(new Error("错误捕获"));
          }}
        >
          console.error 异常
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
          onClick={() => {
            console.log('todo');
          }}
        >
          跨域异常
        </button>
      </div>
    </div>
  );
}

export default App;
