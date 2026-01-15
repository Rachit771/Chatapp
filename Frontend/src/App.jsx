import { Routes, Route } from "react-router-dom";
import './App.css'
import Auth from './Pages/Auth';
import Home from './Pages/Home';
function App() {


  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Auth/>}></Route>
    </Routes>
    </div>
  )
}

export default App
