import './App.css'

// 扩展全局 Window 接口
declare global {
  interface Window {
    someVar: {
      error: string;
    };
  }
}

function App() {
  return (
    <div>
      <h1>异常数据</h1>
      <h2>前端异常</h2>
      <button onClick={() => {window.someVar.error = "error"}}>代码执行异常</button>
      
    </div>
  )
}




export default App
