import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import Home from "../Pages/Home";
export default function Sidebar() {
  const navigate = useNavigate();
const [isOpen,setIsOpen] = useState(false)
  async function LogOut() {
    try {
      await signOut(auth);
      console.log("Logged out!");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }
  
function Menu(){
  if(isOpen == false){
    setIsOpen(true)
  }else{
    setIsOpen(false)
  }
  console.log(isOpen)
}
  return (
   <div className="flex">
     <div className="hidden flex-col p-2 justify-center bg-transparent md:block ">
      <button
        onClick={() => navigate("/dashboard")}
        className="p-4 w-[90%] bg-blue-500 m-3 self-center text-white rounded-2xl hover:cursor-pointer"
      >
        Dashboard
      </button>
      <button
        onClick={() => navigate("/all-task")}
        className="p-4 w-[90%] bg-blue-500 m-3 self-center text-white rounded-2xl hover:cursor-pointer"
      >
        All Tasks
      </button>
      <button
        onClick={() => navigate("/teams")}
        className="p-4 w-[90%] bg-blue-500 m-3 self-center text-white rounded-2xl hover:cursor-pointer"
      >
        My Teams
      </button>
      <button
        onClick={() => navigate("/profile")}
        className="p-4 w-[90%] bg-blue-500 m-3 self-center text-white rounded-2xl hover:cursor-pointer"
      >
        Profile 
      </button>
      <button
        onClick={LogOut}
        className="p-4 w-[90%] bg-red-500 m-3 self-center text-white rounded-2xl hover:cursor-pointer"
      >
        Logout
      </button>
    </div>
    <div className="h-full w-full flex">
          <div onClick={Menu} className="bg-blue-500 text-white fixed right-4 mt-2 lg:hidden rounded-full ">
      <MenuIcon className="text-3xl! p-0.5" onClick={()=>setIsOpen(false)}/>
      </div>
      <div className={`${isOpen == true ? "block" : "hidden"} w-full bg-black/75 fixed top-0 h-full`}>
          <div className="w-[70%] bg-white ml-auto mt-[25%] m-2 rounded-2xl h-fit flex flex-col p-2" onClick={Menu}>
          <CloseIcon className="ml-auto"/>
              <button
        onClick={() => navigate("/dashboard")}
        className="p-4 w-[90%] bg-blue-500 m-3 self-center text-white rounded-2xl hover:cursor-pointer"
      >
        Dashboard
      </button>
      <button
        onClick={() => navigate("/all-task")}
        className="p-4 w-[90%] bg-blue-500 m-2 self-center text-white rounded-2xl hover:cursor-pointer"
      >
        All Tasks
      </button>
      <button
        onClick={() => navigate("/teams")}
        className="p-4 w-[90%] bg-blue-500 m-2 self-center text-white rounded-2xl hover:cursor-pointer"
      >
        My Teams
      </button>
      <button
        onClick={() => navigate("/profile")}
        className="p-4 w-[90%] bg-blue-500 m-2 self-center text-white rounded-2xl hover:cursor-pointer"
      >
        Profile 
      </button>
      <button
        onClick={()=>navigate("/")}
        className="p-4 w-[90%] bg-blue-500 m-2 self-center text-white rounded-2xl hover:cursor-pointer"
      >
        Home
      </button>
      <button
        onClick={LogOut}
        className="p-4 w-[90%] bg-red-500 m-2 self-center text-white rounded-2xl hover:cursor-pointer"
      >
        Logout
      </button>
          </div>
      </div>
    </div>
   </div>

  );
}