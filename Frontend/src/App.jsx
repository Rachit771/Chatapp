import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from './Pages/Home';
import ChatPage from "./Pages/ChatPage";
function App() {


  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<Home/>}></Route>   //it is for rendering specific component at a particular url
      <Route path="/chats" element={<ChatPage/>} />
    </Routes>
    </div>
  )
}

export default App
