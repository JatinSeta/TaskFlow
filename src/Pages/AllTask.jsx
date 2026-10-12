import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import PersonOutlineIcon from "@mui/icons-material/Person";
import { onAuthStateChanged } from "firebase/auth";
import EventIcon from "@mui/icons-material/Event";
export default function AllTask() {
  const [storedTask, setStoredTask] = useState([]);
  const CreateTaskPage = useNavigate();
  const viewPage = useNavigate();
  async function getData(current_Useruid) {
    console.log("Current User Uid: ", current_Useruid);
    const data = [];
    const task = await getDocs(collection(db, "createTask"));
   task.forEach((res)=>{
    const respons = res.data()
    if(respons.assign.userid == current_Useruid || respons.createdBy.id == current_Useruid){
      data.push(respons)
    }
  })
   
   
    setStoredTask(data);
  }
  function createTask() {
    CreateTaskPage("/create-task");
  }
  function CurrenUser() {
    onAuthStateChanged(auth, (current_user) => {
      const user_uid = current_user.uid;
      if (user_uid) {
        getData(user_uid);
      } else {
        console.log("Not Found");
      }
    });
  }
  useEffect(() => {
    CurrenUser();
  }, []);

  return (

    <div className="">
        <div className="flex p-4 align-middle flex-col md:flex-row ">
          <div>
            <h1 className="text-[28px] text-[#172B36] font-bold">
              All Tasks <br />
              <span className="text-[14px] text-[#64748B] font-normal">
                Manage and track all your project tasks
              </span>
            </h1>
          </div>
          <div className="ml-auto ">
            <button
              className="ml-auto bg-[#009FC6] hover:bg-[#007FA3]  text-white  p-1.5 font-bold  rounded-lg flex text-[14px]"
              onClick={createTask}
            >
              <AddIcon className="text-[18px] " />
              <h1 className="">Create Task</h1>
            </button>
          </div>
        </div>
        <div className="grid gap-2 p-2">
          {storedTask.map((res, index) => (
            <div
              className="border-2 grid rounded-[10px] border-[#E2E8F0] p-4 hover:border-[#B6E8F2] hover:cursor-pointer shadow-md"
              key={index}
              onClick={() => viewPage(`/view-task/${res.id}`)}
            >
              <div className="flex">
                <div
                  className={`${res.priority == "High" ? "bg-red-200 text-red-700" : res.priority == "Medium" ? "bg-yellow-200 text-yellow-700" : "bg-green-200 text-green-600"} text-center font-medium p-2 py-0.5 rounded flex `}
                >
                  <h1 className="text-[12px] font-semibold">{res.priority}</h1>
                </div>
              </div>
              <h1 className="text-[18px] font-semibold text-[#172B36] mb-1">
                {res.title}
              </h1>
              <h1 className="text-[14px] font-normal text-[#64748B] line-clamp-3">
                {res.description}
              </h1>
              <div className="flex justify-end align-middle self-center m-2 flex-col md:flex-row">
                <div className="flex align-middle items-center m-1 p-1">
                  <PersonOutlineIcon className="p-0.5" />
                  <h1 className="text-[13px]">{res.createdBy.name}</h1>
                </div>
                <div className="flex align-middle m-1 p-1 ">
                  <EventIcon className="p-0.5" />
                  <h1 className="text-[13px]">{res.edate}</h1>
                </div>
                <div
                  className={`m-1 p-1  rounded-md ${res.status == "Pending" ? "text-[#D97706] bg-[#FEF3C7]" : res.status == "In Progress" ? "text-[#2563EB] bg-[#DBEAFE]" : res.status == "Completed" ? "text-[#16A34A] bg-[#DCFCE7]" : "text-[#DC2626] bg-[#FEE2E2]"} w-fit flex`}
                >
                  <h1 className="font-bold text-[13px]">{res.status}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
   
  );
}
