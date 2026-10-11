import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { onAuthStateChanged } from "firebase/auth";
import CloseIcon from "@mui/icons-material/Close";
import EditTask from "./EditTask";
export default function ViewTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assign, setAssign] = useState("");
  const [priority, setPriority] = useState("");
  const [sdate, setSdate] = useState("");
  const [created, setCreated] = useState("");
  const [edate, setEdate] = useState("");
  const [status, setStatus] = useState("");
  const [cdate,setCDate] = useState("")
  const [isEdit,setIsEdit] = useState(false)
  const { id } = useParams();
  const [vissble,setVissble] = useState(false)
  const [current_users,setCurrent_users] = useState()
  const BackPage = useNavigate();
  const [statusUpdate,setStatusUpdate] = useState()
  async function getData(current_user) {
    const res = doc(db, "createTask", id);
    const data = await getDoc(res);
    const taskDetiles = data.data();
    setTitle(taskDetiles.title);
    setDescription(taskDetiles.description);
    setPriority(taskDetiles.priority);
    setAssign(taskDetiles.assign.name);
    setSdate(taskDetiles.sdate);
    setEdate(taskDetiles.edate);
    setStatus(taskDetiles.status);
    setCreated(taskDetiles.createdBy.name);
    setCDate(taskDetiles.CompletedDate)
    if(taskDetiles.createdBy.id == current_user ){
      setVissble(true)
    }
  }
 async function handelUpdate(){
    if(statusUpdate == "Completed"){
      const updatedobj = {
      status:statusUpdate,
      CompletedDate:new Date()
    }
       const update = doc(db,"createTask",id);
    await updateDoc(update,updatedobj)
    }else{
  const updatedobj = {
      status:statusUpdate
    }
    const update = doc(db,"createTask",id);
    await updateDoc(update,updatedobj)
    }
  }
  async function handelDelete() {
    const docref = doc(db,"createTask",id)
    try{
      await deleteDoc(docref)
      Back()
      console.log("Task Deleted")
    }catch{
      console("Task Not Deleted")
    }
  }
  useEffect(() => {
    onAuthStateChanged(auth, (current_user) => {
      if (current_user) {
          getData(current_user.uid);
          setCurrent_users(current_user.uid)
        }
    });
  }, []);

  function handelEdit(){
    if(isEdit == true){
      setIsEdit(false)
    }else{
      setIsEdit(true)
    }
  }
  function Back() {
    BackPage("/all-task");
  }
  return (
 <div>
     <div className="h-screen p-5 bg-linear-50 from-[#F8FCFF] to-[#EAF6FA]">
      {/* Hader Section */}
      <div className="flex justify-between w-full">
        <div
          onClick={Back}
          className="flex align-middle self-center p-2 rounded-md gap-2 text-[#4B5563] font-medium group hover:bg-[#E8F1FF] hover:cursor-pointer"
        >
          <KeyboardBackspaceIcon className="text-[20px] group-hover:text-[#2563EB]" />
          <h1 className="text-[14px] group-hover:text-[#2563EB]">
            Back To All Tasks
          </h1>
        </div>
        <div className="flex">
          <div onClick={handelEdit} className={`${vissble == false ? "hidden" : "block"} flex bg-[#FFFFFF] border-[#2563EB] border-2 font-semibold  align-middle self-center p-2 justify-center rounded-full group hover:bg-[#2563EB] transition-all duration-300 hover:cursor-pointer`}>
            <ModeEditOutlineOutlinedIcon className="text-[#2563EB] group-hover:text-[#FFFFFF]" />
          </div>
          <div onClick={handelDelete} className={`${vissble == false ? "hidden" : "block"} flex  border-[#B91C1C] p-2 justify-center m-2 border-2  text-[#B91C1C] bg-white font-medium rounded-full transition-all duration-300 group hover:bg-[#DC2626] hover:cursor-pointer`}>
            <DeleteOutlineOutlinedIcon className="text-[#DC2626] group-hover:text-white" />
          </div>
        </div>
      </div>
      {/* Card Section */}
      <div className="w-full gap-5 sm:grid sm:grid-cols-3  m-auto ">
        <div className="m-2 col-span-2 bg-white  border-3 rounded-lg border-[#E5E7EB] p-6">
          <h1
            className={`${priority == "High" ? "bg-[#B91C1C] text-white" : priority == "Medium" ? "bg-[#B45309] text-white" : "bg-[#15803D] text-white"} m-2 w-[25%] text-center text-[16px] font-bold text-[#FFFFFF] p-1 rounded-lg`}
          >
            {priority}
          </h1>
          <h1 className="text-[34px] p-2 text-[#111827] font-bold leading-[1.2]">
            {title}
          </h1>
          <h1 className=" m-2 text-[16px] font-normal text-[#4B5563] leading-[1.6]">
            {description}
          </h1>
          <h1 className=" m-2 text-[15px] text-[#374151] font-semibold">
            Task Progress
          </h1>
          <div className="flex m-1 align-middle">
            <div className="flex align-middle">
              <div
                className={`${
                  status === "Pending"
                    ? "bg-[#2563EB] border-[#2563EB]"
                    : status === "Completed"
                      ? "bg-[#16A34A] border-[#16A34A]"
                      : "bg-white border-[#CBD5E1]"
                } border-2 h-3 w-3 rounded-full align-middle self-center m-0.5`}
              ></div>

              <h1
                className={`${
                  status === "Pending"
                    ? "text-[#1D4ED8]"
                    : status === "Completed"
                      ? "text-[#16A34A]"
                      : "text-[#94A3B8]"
                } self-center align-middle m-0.5`}
              >
                Pending
              </h1>
            </div>

            <hr
              className={`border-2 w-[10%] self-center ${
                status === "Pending" || status === "In Progress"
                  ? "border-[#2563EB]"
                  : "border-[#E5E7EB]"
              }`}
            />

            <div className="flex align-middle">
              <div
                className={`${
                  status === "In Progress"
                    ? "bg-[#2563EB] border-[#2563EB]"
                    : status === "Completed"
                      ? "bg-[#16A34A] border-[#16A34A]"
                      : "bg-white border-[#CBD5E1]"
                } border-2 h-3 w-3 rounded-full align-middle self-center m-0.5`}
              ></div>

              <h1
                className={`${
                  status === "In Progress"
                    ? "text-[#1D4ED8]"
                    : status === "Completed"
                      ? "text-[#16A34A]"
                      : "text-[#94A3B8]"
                } self-center align-middle m-0.5`}
              >
                In Progress
              </h1>
            </div>

            <hr
              className={`border-2 w-[10%] self-center ${
                status === "Completed" ? "border-[#16A34A]" : "border-[#E5E7EB]"
              }`}
            />

            <div className="flex align-middle">
              <div
                className={`${
                  status === "Completed"
                    ? "bg-[#16A34A] border-[#16A34A]"
                    : "bg-white border-[#CBD5E1]"
                } border-2 h-3 w-3 rounded-full align-middle self-center m-0.5`}
              ></div>

              <h1
                className={`${
                  status === "Completed" ? "text-[#16A34A]" : "text-[#94A3B8]"
                } self-center align-middle m-0.5`}
              >
                Completed
              </h1>
            </div>
          </div>
            <div className="flex flex-col">
               <h1>Update Task Status</h1>
              <select name="" id="" className="w-[20%] p-1 m-1" onChange={(e)=>setStatusUpdate(e.target.value)}>
                <option value={status} className="hidden">{status}</option>
                <option value="In Progress"  disabled ={status == "In Progress" || status == "Completed"} className={`disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF] disabled:cursor-not-allowed bg-[#DBEAFE] text-[#1D4ED8] border-2 border-[#93C5FD]`}>In Progress</option>
                <option value="Completed" disabled={status == "Completed"} className="bg-[#DCFCE7] text-[#15803D] border-2 border-[#86EFAC] disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF] disabled:cursor-not-allowed">Completed</option>
              </select>
              <button onClick={handelUpdate} className="w-[20%] bg-[#2563EB] text-[#FFFFFF] text-[13px] font-semibold rounded-md hover:bg-[#1D4ED8] p-2 m-1 hover:cursor-pointer disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF]" disabled={status == "Completed"} >Update Status</button></div> 
        </div>
        <div className="m-2 bg-[#FFFFFF] col-span-1  p-2 rounded-md border-3 border-[#E5E7EB]">
          <h1 className="m-2 text-[13px] font-bold text-[#6B7280] p-b-[12px] border-b-2 border-[#E5E7EB]">
            TASK INFORMATION
          </h1>
          <div className="m-2">
            <h1 className="text-[12px] font-semibold  uppercase text-[#6B7280]">
              ASSIGNED BY:
            </h1>
            <h1 className="text-[16px] font-medium   text-[#111827]">
              {assign}
            </h1>
          </div>
          <div className="m-2">
            <h1 className="text-[12px] font-semibold  uppercase text-[#6B7280]">
              Created BY:
            </h1>
            <h1 className="text-[16px] font-medium   text-[#111827]">
              {created}
            </h1>
          </div>
          <div className="m-2">
            <h1 className="text-[12px] font-semibold  uppercase text-[#6B7280]">
              Start Date :
            </h1>
            <h1 className="text-[16px] font-medium   text-[#111827]">
              {sdate}
            </h1>
          </div>
          <div className="m-2">
            <h1 className="text-[12px] font-semibold uppercase text-[#6B7280]">
              End Date :
            </h1>
            <h1 className="text-[16px] font-medium   text-[#111827]">
              {edate}
            </h1>
          </div>
          <div className="m-2">
            <h1 className="text-[12px] font-semibold uppercase text-[#6B7280]">
              Complated Date : 
            </h1>
         <h1 className="text-[16px] font-medium text-[#111827]">
  {cdate?.toDate
    ? cdate.toDate().toLocaleString()
    : "Not completed"}
</h1>
          </div>
          <div className="m-2">
            <h1 className="text-[12px] font-semibold  uppercase text-[#6B7280]">
              Status :
            </h1>
            <h1
              className={`text-[12px] font-semibold p-1  w-fit rounded-md ${status == "Pending" ? "bg-[#FEF3C7] text-[#B45309]" : status == "In Progress" ? "bg-[#DBEAFE] text-[#1D4ED8]" : "bg-[#DCFCE7] text-[#15803D]"}`}
            >
              {status}
            </h1>
          </div>
        </div>
      </div>
      
    </div>
        {isEdit && (
          <div className="absolute  inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="flex flex-col m-autojustify-center bg-white border-[#E2E8F0] border-2 rounded-md p-4">
                <CloseIcon
                className="ml-auto hover:cursor-pointer"
                onClick={() => setIsEdit(false)}
              />
            <EditTask onClose={()=>(getData(current_users),setIsEdit(false))}/>
            </div>
          </div>
        )}
 </div>
  );
}
