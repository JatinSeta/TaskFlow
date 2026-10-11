// import CreatedTask from "./Pages/CreatedTask";
import { BrowserRouter, replace, Route, Routes } from "react-router-dom";
import EditTask from "./Pages/EditTask";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import AllTask from "./Pages/AllTask";
import CreatedTask from "./Pages/CreatedTask";
import SingUp from "./Pages/SingUp";
import ViewTask from "./Pages/ViewTask";
import Protected from "./component/Protected";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./component/Navbar";
import Profile from "./Pages/Profile";
import TeamPage from "./Pages/TeamPage";
import ViewTeam from "./Pages/ViewTeam";
import Join from "./component/Join.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
export default function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            {/* <Route path="/" element={<Home/> }/> */}
            <Route path="/all-task" element={<Protected Page={AllTask} />} />
            <Route path="/dashboard" element={<Protected Page={Dashboard} replace />} />
            <Route path="/create-task" element={<CreatedTask />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/teams" element={<Protected Page={TeamPage} />} />
          </Route>
          {/* Open Nested Page */}
          <Route path="/edit-task/:id" element={<EditTask />} />
          <Route path="/view-task/:id" element={<ViewTask />} />
          <Route path="/view-team/:id" element={<Protected Page={ViewTeam} />} />
          <Route path="/join/:id" element={<Protected Page={Join} />} />
          {/* User Page */}
          <Route path="/login" element={<Login />} />
          <Route path="/singUp" element={<SingUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
