import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { onAuthStateChanged } from "firebase/auth";
import Sidebar from "../component/Sidebar.jsx";
export default function AllTask() {
  const [storedTask, setStoredTask] = useState([]);
  const CreateTaskPage = useNavigate()
  const editPage = useNavigate()
  const viewPage = useNavigate()
  async function getData() {
    const data = [];
    const task = await getDocs(collection(db, "createTask"));
    task.forEach((task) => {
      data.push(task.data());
    });
    setStoredTask(data);
  }
  function createTask(){
    CreateTaskPage('/create-task')
  }
  useEffect(() => {
    getData();
  }, []);

  console.log(storedTask);
  return (
    <div className="flex">
     <div>
      <Sidebar />
     </div>
      <div>
            <div className="flex p-4 align-middle ">
        <div>
          <h1>All Tasks <br/> Manage and track all your project tasks</h1>
        </div>
        <div className="ml-auto">
          <button className="ml-auto bg-blue-500 text-white p-1 rounded-md" onClick={createTask}><AddIcon/></button>
        </div>
     
       
      </div>
      <div className="gap-4 grid grid-cols-3">
        {storedTask.map((res,index) => (
        <div className=" flex flex-col  m-2 p-2 rounded-2xl" key={index}>
         <div className="flex ml-auto">
             <EditIcon key={index} className="m-1 p-1 bg-yellow-500 rounded-md text-2xl text-white" onClick={()=> editPage(`/edit-task/${res.id}`)}/>
          <DeleteIcon className="m-1 p-1 bg-red-500 rounded-md text-2xl text-white"/>
          <VisibilityIcon className="m-1 p-1 bg-green-500 rounded-md text-2xl text-white" onClick={()=> viewPage(`/view-task/${res.id}`)}/>
         </div>
          <h1>Title : {res.title}</h1>
          <h1>Description : {res.description}</h1>
          <h1>Start Date : {res.sdate}</h1>
          <h1>End Date : {res.edate}</h1>
          <h1>Priority : {res.priority}</h1>
        </div>

        
      ))}
      </div>
      </div>
    </div>
  );
}
