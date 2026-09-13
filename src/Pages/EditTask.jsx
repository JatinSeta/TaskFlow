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
  const [user,setUser] = useState([])
  const BackPage = useNavigate()
  async function GetData() {
      const data =  doc(db,"createTask",id);
    const getedData = await getDoc(data)
    const task = getedData.data()
    setTitle(task.title)
    setDescription(task.description)
    setPriority(task.description)
    setAssign(task.assign)
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
  async function GetUser() {
    const userData = []
    const user = await getDocs(collection(db,"userData"))
    user.forEach(ele => {
      userData.push(ele.data());
    });
    setUser(userData)
  }
  function Back(){
    BackPage('/all-task')
  }
  useEffect(()=>{
GetUser()
GetData()
  },[])

  return (
    <div className="h-screen w-screen justify-center flex flex-col">
        <div className="m-4">
          <button onClick={Back} className="p-2 flex bg-blue-500 text-white rounded-md font-bold"><ArrowLeftIcon/><h1>Go Back</h1></button>
        </div>
        <div className="flex flex-col w-[50%] m-auto justify-center">
          <label htmlFor="">Title</label>
     <input type="text"  value={title} onChange={(e)=>setTitle(e.target.value)} className="border-2 rounded-md"/>
        <label htmlFor="">Description</label>
        <textarea name="" id="" className=" border-2 rounded-md" rows={4} value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
        <label htmlFor="">Assign To</label>
        <select  id="" value={assign} onChange={(e)=>setAssign(e.target.value)}>
          <option value="" selected  hidden>{assign}</option>
          {user.map((ele,index)=>(
            <option value={ele.name} key={index} >{ele.name}</option>
          ))}
        </select>
        <label htmlFor="">Priority</label>
        <select name="" id="" onChange={(e)=>setPriority(e.target.value)}>
          <option value={priority} hidden >{priority}</option>
           <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>
        <div className="flex align-middle justify-evenly m-2">
          <div>
            <label htmlFor="">Start Date </label>
            <input
              type="date"
              className="border-2 p-1 rounded-md "
              value={sdate}
              onChange={(e) => setSdate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Due Date </label>
            <input
              type="date"
              className="border-2 p-1 rounded-md "
              value={edate}
              onChange={(e) => setEdate(e.target.value)}
            />
          </div>
        </div>
        <button onClick={handelUpdate}>Update Task</button>
        </div>
    </div>
  )
}
