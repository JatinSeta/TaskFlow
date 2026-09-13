
// import CreatedTask from "./Pages/CreatedTask";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditTask from "./Pages/EditTask";
import Home from "./Pages/Home"
import Login from './Pages/Login';
import AllTask from "./Pages/AllTask";
import CreatedTask from "./Pages/CreatedTask";
import SingUp from "./Pages/SingUp";
import ViewTask from "./Pages/ViewTask";
import Protected from "./component/Protected";
export default function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/> }/>
      <Route path="/all-task" element={<Protected Page={AllTask}/>}/>
      <Route path="/create-task" element={<CreatedTask/> }/>
      <Route path="/edit-task/:id" element={<EditTask/> }/>
      <Route path="/view-task/:id" element={<ViewTask/>}/>
      <Route path="/login" element={<Login/> }/>
      <Route path="/singUp" element={<SingUp/> }/>
    </Routes>
    </BrowserRouter>
  )
}
