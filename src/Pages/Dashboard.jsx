import { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function Dashboard() {
    const [user,setUser] = useState('')
    const [time,setTime] = useState('')
    function Timezone(){
        const date = new Date()
        const hour =  date.getHours()
        
    }
    useEffect(()=>{
    onAuthStateChanged(auth,(current_user)=>{
        setUser(current_user.displayName)
    })
    Timezone()
    },[])
    
  return (
    <div className="flex">
        <div className="">
            <Sidebar/>
        </div>
        <div className="w-full sm:w-[80%]">
            <h1 className="m-2">{time}, {user}</h1>
            <div className="flex flex-col sm:flex-row justify-evenly">
                <div className="sm:w-[50%] flex flex-col sm:flex-row ">
                    <div className="m-2 sm:m-5 text-center w-[90%] sm:w-[50%] p-5 bg-blue-500 text-[20px] text-white rounded-2xl">
                    <h1>Projects</h1>
                    <h1>12</h1>
                </div>
                <div className="m-2 sm:m-5 text-center w-[90%] sm:w-[50%] p-5 bg-blue-500 text-[20px] text-white rounded-2xl">
                    <h1>My Tasks</h1>
                    <h1>18</h1>
                </div>
                </div>
                <div className="sm:w-[50%] flex flex-col sm:flex-row ">
                    <div className="m-2 sm:m-5 text-center w-[90%] sm:w-[50%] p-5 bg-blue-500 text-[20px] text-white rounded-2xl">
                    <h1>Completed</h1>
                    <h1>42</h1>
                </div>
                <div className="m-2 sm:m-5 text-center w-[90%] sm:w-[50%] p-5 bg-blue-500 text-[20px] text-white rounded-2xl">
                    <h1>Overdue</h1>
                    <h1>3</h1>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}
