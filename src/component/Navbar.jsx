// import Logo from "../../public/Image/Logo.png"
import LoginIcon from '@mui/icons-material/Login';
export default function Navbar() {
  return (
     <div className="">
       <div className="flex justify-between">
           <div className="w-[40%] sm:w-[50%]">
           {/* <img src={Logo} alt="" className="w-[20%]" /> */}
           <h1 className="m-4 font-bold">TaskFlow</h1>
           </div>
           <div className="w-[60%] sm:w-[50%] ">
               <button className="absolute right-0 p-2 m-2 w-[50%]  sm:w-[15%] font-bold border-blue-500 border-4 rounded-2xl hover:bg-blue-500 hover:text-white hover:cursor-pointer transition duration-1000">Login <LoginIcon/></button>
           </div>
       </div>
       </div>
  )
}
