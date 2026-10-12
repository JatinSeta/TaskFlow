// import CreatedTask from "./Pages/CreatedTask";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditTask from "./Pages/EditTask";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import AllTask from "./Pages/AllTask";
import CreatedTask from "./Pages/CreatedTask";
import SingUp from "./Pages/SingUp";
import ViewTask from "./Pages/ViewTask";
import Protected from "./component/Protected";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import TeamPage from "./Pages/TeamPage";
import ViewTeam from "./Pages/ViewTeam";
import Join from "./component/Join.jsx";
import About from "./component/About.jsx";
import Features from "./component/Features.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
export default function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/all-task" element={<Protected Page={AllTask} />} />
            <Route path="/dashboard" element={<Protected Page={Dashboard} replace />} />
            <Route path="/create-task" element={<Protected Page={CreatedTask} />} />
            <Route path="/profile" element={<Protected Page={Profile} />} />
            <Route path="/teams" element={<Protected Page={TeamPage} />} />
          </Route>
          {/* Open Nested Page */}
          <Route path="/" element={<Home /> }/>
          <Route path="/about" element={<About/> }/>
          <Route path="/features" element={<Features/> }/>
  
          <Route path="/login" element={<Login />} />
          <Route path="/singUp" element={<SingUp />} />
          <Route path="/edit-task/:id" element={<Protected Page={EditTask}/>} />
          <Route path="/view-task/:id" element={<Protected Page={ViewTask} />} />
          <Route path="/view-team/:id" element={<Protected Page={ViewTeam} />} />
          <Route path="/join/:id" element={<Protected Page={Join} />} />
          
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}
