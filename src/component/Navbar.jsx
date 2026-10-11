import { useNavigate } from "react-router-dom";
import Logo from "../../public/Image/Logo.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
export default function Navbar() {
  const Login = useNavigate()
  const [isLogin,setisLogin] = useState(true)
  const [isaccount,setIsAccount] = useState(false)
  const [isnotfication,setIsnotfication] = useState(false)
  const [accountDetiles,setAccountDetiles] = useState()
  const [notification,setNotification] = useState()

  function LoginPage(){
    Login('/login')
  }
  function Notification(){
    if(isnotfication == true){
      setIsnotfication(false)
    }else{
      setIsnotfication(true)
    }
  }
  function Account(){
    if(isaccount == true){
      setIsAccount(false)
    }else{
      setIsAccount(true)
    }
  }
  function handellogout(){
     signOut(auth).then(()=>(
       setIsAccount(false),
        Login('/login')
    )).catch((error)=>(
      console.log(error)
    ))
  }
  async function getNotification(current_user_id){
    console.log("Current Uid",current_user_id)
    const res = doc(db,"users",current_user_id)
    const docref = await getDoc(res)
    setNotification(docref.data().notification)
  } 
  useEffect(()=>{
    onAuthStateChanged(auth,(current_user)=>{
        if(current_user == null){
          setisLogin(true)
        }else{
          const AccountDetiles = {
              name : current_user.displayName,
              email : current_user.email,
              id : current_user.uid
            }
            setAccountDetiles(AccountDetiles)
            setisLogin(false)
            getNotification(AccountDetiles.id)
          }
        })
  },[])
  
  return (
     <div className="p-2">
       <div className="flex align-middle justify-between">
          <div>
            <img src={Logo} alt="" className="m-1 h-10"/>
          </div>
          <div className="self-center">
                <button onClick={LoginPage} className={`${isLogin == true ? "block" : "hidden"} bg-blue-500 p-1 m-1 rounded-md  text-center text-white hover:bg-[#eff6ff] hover:text-[#2563eb] transition-all duration-300 hover:cursor-pointer`}>Login <LoginIcon/></button>
              <div className={`${isLogin == false ? "block" : "hidden"}`}>
                <button className="m-1 hover:cursor-pointer bg-blue-500 text-white p-1 rounded-md" onClick={Account} ><AccountCircleIcon/></button>
                <button className="m-1 hover:cursor-pointer bg-blue-500 text-white p-1 rounded-md" onClick={Notification}><CircleNotificationsIcon/></button>
              </div>

          </div>
       </div>
       {isnotfication && (
      <div className="flex flex-col">
      <div className={`${isnotfication == true ? "block" : "hidden"} absolute top-0 bg-black opacity-75 z-50 h-full w-full m-0 p-0 left-0`}>
        </div>
        <div className="bg-white w-[30%] z-50 absolute right-0 p-5 m-4 h-[75%] rounded-md flex flex-col overflow-y-scroll ">
          <CloseIcon className="ml-auto m-2 hover:cursor-pointer text-slate-500 hover:text-red-500 text-xl transition-colors" onClick={()=>setIsnotfication(false)}/>
          <h1 className="text-xl font-bold text-slate-800 border-b-2 border-slate-200 p-1 ">Notifications</h1>
           {notification.map((res)=>(
            <div className="bg-slate-50 mt-2  border border-slate-200 rounded-lg p-3 mb-3 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors">
              <h1>{res.content}</h1>
              <h1 className="text-end">Sent by : {res.name}</h1>
            </div>
           ))}
        </div>
      </div>
      
       )}
       {isaccount && (
      <div className="flex flex-col">
      <div className={`${isaccount == true ? "block" : "hidden"} absolute top-0 bg-black opacity-75 z-50 h-full w-full m-0 p-0 left-0`}>
        </div>
        <div className="bg-slate-50 p-2 w-[30%] z-50 absolute right-0 m-4 h-fit rounded-xl flex flex-col border-2   border-gray-200">
          <CloseIcon className="ml-auto m-1 hover:cursor-pointer" onClick={()=>setIsAccount(false)}/>
          <h1 className="text-[20px] font-bold text-gray-800">Name : </h1>
          <h1 className="text-sm  font-medium uppercase text-gray-500">{accountDetiles.name}</h1>
          <h1 className="text-[20px] font-bold text-gray-800">Email : </h1>
          <h1 className="text-sm  font-medium uppercase text-gray-500">{accountDetiles.email}</h1>
          <button className="bg-red-500 p-1 w-[50%] m-1 rounded-md self-center hover:cursor-pointer  text-white font-medium"  onClick={handellogout}>Log out</button>
        </div>
      </div>
      
       )}
       </div>
  )
}
