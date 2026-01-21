import { Routes, Route } from "react-router-dom";
import './App.css'
import Auth from './Pages/Auth';
import Home from './Pages/Home';
import ChatPage from "./Pages/ChatPage";
function App() {


  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path="/chats" element={<ChatPage/>} />
      <Route path='/login' element={<Auth/>}></Route>
    </Routes>
    </div>
  )
}

export default App
