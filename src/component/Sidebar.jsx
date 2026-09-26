import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { Link, useNavigate } from "react-router-dom"

export default function Sidebar() {
  const all_task = useNavigate()
  const dash_board = useNavigate()
  async function LogOut() {
    signOut(auth).then(()=>(
      console.log("Done!")
    )).catch((error)=>(
      console.log(error)
    ))
  }

  function AllTask(){
    all_task('/all-task')
  }
  function Dashboard(){
    dash_board('/dashboard')
  }
  
  return (
    <div className=" flex-col p-2 justify-center">
        <button onClick={Dashboard} className="p-4 w-[90%] bg-blue-500 m-3 self-center text-white rounded-2xl">Dashboard</button>
        <button onClick={AllTask} className="p-4 w-[90%] bg-blue-500 m-3 self-center text-white rounded-2xl">My Tasks</button>
        <button className="p-4 w-[90%] bg-blue-500 m-3 self-center text-white rounded-2xl" onClick={LogOut}>Log Out</button>
    </div>
  )
}
