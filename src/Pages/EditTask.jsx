import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom"
import {db} from "../firebase"
import { useEffect, useState } from "react";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
export default function EditTask() {
    const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assign, setAssign] = useState("");
  const [priority, setPriority] = useState("");
  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");
  const {id} = useParams();
  console.log(id)
  const [getUser,setGetuser] = useState([])
  const Back = useNavigate()
  async function GetData() {
      const data =  doc(db,"createTask",id);
    const getedData = await getDoc(data)
    const task = getedData.data()
    setTitle(task.title)
    setDescription(task.description)
    setPriority(task.priority)
    setAssign(task.assign.name)
    setSdate(task.sdate)
    setEdate(task.edate)
    
  }
  async function handelUpdate() {
    const updatedObj = {
      id : id,
      title: title,
      description: description,
      assign: assign,
      priority: priority,
      sdate: sdate,
      edate: edate,
    }
    const docRef = doc(db,"createTask",id)
    await updateDoc(docRef,updatedObj)
    console.log("Updated!")
  }
  async function GetUsers() {
    try {
      const Allusers = [];
      const seeTask = await getDocs(collection(db, "users"));
      seeTask.forEach((ele) => {
        Allusers.push(ele.data());
      });
      console.log(Allusers)
      setGetuser(Allusers);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(()=>{
GetUsers()
GetData()
  },[])

  return (
    <div className="h-screen  justify-center flex flex-col bg-linear-50 from-[#F8FCFF] to-[#EAF6FA]">
        <div className="m-4">
          <button onClick={()=>Back(`/view-task/${id}`)} className="p-2 flex bg-blue-500 text-[#475569] border-2 border-[#E2E8F0]  font-bold hover:bg-[#F1F5F9] rounded-md"><ArrowLeftIcon/><h1>Back to Tasks</h1></button>
        </div>
        <div className="flex flex-col w-[50%] m-auto justify-center bg-white border-[#E2E8F0] border-2 rounded-md p-[28px]">
          <h1 className="text-[32px] font-bold text-[#0F172A] text-center">Edit Task</h1>
          <p className="text-[14px] text-[#64748B] text-center">Update task information, assignment, priority and deadlines.</p>
          <label htmlFor="" className="text-[#334155] font-semibold text-[14px] ">Title</label>
     <input type="text"  value={title} onChange={(e)=>setTitle(e.target.value)} className="border-2 border-[#CBD5E1] focus:border-[#4F46E5] focus:ring-0 focus:outline-none text-[#0F172A] font-[15px] p-1 m-1 rounded-md"/>
        <label htmlFor="">Description</label>
        <textarea name="" id="" className="p-1 focus:border-[#4F46E5] focus:ring-0 focus:outline-none border-2 rounded-md text-[15px] text-[#334155] border-[#CBD5E1] bg-[#FFFFFF]" rows={4} value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
      <div className="grid grid-cols-2 m-2">
         <div className="flex flex-col">
           <label htmlFor="">Assign To</label>
            <select name="" id=""   onChange={(e) => setAssign(e.target.value)}  >
              <option value={assign}  className="bg-white border-2 border-[#CBD5E1] text-[14px] hidden">{assign}</option>
            {getUser.map((res,index)=>(
              <option key={index} value={JSON.stringify({userid : res.userid , name : res.name})}>{res.name}</option>
            ))}            
          </select>
         </div>
        <div className="flex flex-col">
          <label htmlFor="">Priority</label>
        <select name="" id="" onChange={(e)=>setPriority(e.target.value)}>
          <option value={priority} hidden >{priority}</option>
           <option value="Low" className="bg-[#16A34A]">Low</option>
          <option value="Medium" className="bg-[#2563EB]">Medium</option>
          <option value="High" className="bg-[#EA580C]">High</option>
          <option value="Urgent" className="bg-[#DC2626]">Urgent</option>
        </select>
        </div>
      </div>
        <div className="flex align-middle justify-evenly m-2">
          <div>
            <label htmlFor="">Start Date </label>
            <input
              type="date"
              className="border-2 border-[#CBD5E1] p-1 rounded-md "
              value={sdate}
              onChange={(e) => setSdate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Due Date </label>
            <input
              type="date"
              className="border-2 border-[#CBD5E1] p-1 rounded-md "
              value={edate}
              onChange={(e) => setEdate(e.target.value)}
            />
          </div>
        </div>
        <button onClick={handelUpdate} className="bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold text-[15px] rounded-md w-[20%] self-center p-2 hover:cursor-pointer">Update Task</button>
        </div>
    </div>
  )
}
