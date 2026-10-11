import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
export default function EditTask({onClose}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assign, setAssign] = useState("");
  const [priority, setPriority] = useState("");
  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");
  const { id } = useParams();
  const [getUser, setGetuser] = useState([]);
  async function GetData() {
    const data = doc(db, "createTask", id);
    const getedData = await getDoc(data);
    const task = getedData.data();
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setAssign(task.assign);
    setSdate(task.sdate);
    setEdate(task.edate);
    
  }
  console.log("Geted Data",assign)
  async function handelUpdate() {
    const updatedObj = {
      id: id,
      title: title,
      description: description,
      assign: typeof assign == "string" ? JSON.parse(assign) : assign,
      priority: priority,
      sdate: sdate,
      edate: edate,
    };
    console.log("Updated Detiles",assign)
    const docRef = doc(db, "createTask", id);
    await updateDoc(docRef, updatedObj);
    
    onClose();
  }
  async function GetUsers(user_Detiles) {
    try {
      const Allusers = [];
      const docref = collection(db, "Tems");
      const getData = await getDocs(docref);
      getData.forEach((ele) => {
        if (ele.data().createdby.id == user_Detiles.id) {
          const get_users = ele.data().users;
          get_users.map((users) => {
            if (Allusers.length == 0) {
              Allusers.push(users);
            } else {
              Allusers.map((res) => {
                if (res.id != users.id) {
                  Allusers.push(users);
              
       }
              });
            }
          });
        } else {
          console.log("Not Avilable Users");
        }
      });

      setGetuser(Allusers);
    } catch (error) {
      console.log(error);
    }
  }
  function Low() {
    setPriority("Low");
  }
  function Medium() {
    setPriority("Medium");
  }
  function High() {
    setPriority("High");
  }
  useEffect(() => {
    GetUsers();
    GetData();
    onAuthStateChanged(auth,(current_user)=>{
      const user_Detiles = {
        id : current_user.uid,
        name : current_user.displayName
      }
      GetUsers(user_Detiles);
    })
  }, []);

  

  return (
      <div className="justify-center flex flex-col">
      <div className="">
        <h1 className="text-[32px] font-bold text-[#0F172A]">Edit Task</h1>
        <p className="text-[14px] text-[#64748B]">
          Update task information, assignment, priority and deadlines.
        </p>
        <label htmlFor="" className="text-sm font-semibold text-[#374151]">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-11 text-sm text-[#374151] bg-white border border-[#D1D5DB] rounded-md px-3 mb-2 focus:border-[#2563EB] outline-none focus:ring-4 focus:ring-blue-100"
        />
        <label htmlFor="" className="text-sm font-semibold text-[#374151]">
          Description
        </label>
        <textarea
          name=""
          id=""
          className="w-full min-h-28 text-sm text-[#374151] rounded-md p-3 resize-y border border-[#D1D5DB] focus:border-[#2563EB] outline-none focus:ring-4 focus:ring-blue-100 mb-2"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="">
          <div className="flex flex-col">
            <label htmlFor="" className="text-sm font-semibold text-[#374151]">
              Assign To
            </label>
            <select
              name=""
              id=""
              onChange={(e) => setAssign(e.target.value)}
              className="w-full h-11 px-3 text-sm bg-white text-[#374151] border border-[#D1D5DB] rounded-md focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 mb-2 hover:cursor-pointer"
            >
              <option
                value={JSON.stringify({userid : assign.userid,name:assign.name})}
                className="bg-white border-2 border-[#CBD5E1] text-[14px] hidden"
              >
                {assign.name}
              </option>
              {getUser.map((res) => (
                <option
                  key={res.id}
                  value={JSON.stringify({
                    userid: res.id,
                    name: res.name,
                  })}
                >
                  {res.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-[#374151]">
              Priority
            </label>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3">
              <button
                type="button"
                onClick={Low}
                className="bg-[#DCFCE7] text-[#15803D] h-10 font-semibold text-sm rounded-md hover:brightness-95 transition"
              >
                Low
              </button>
              <button
                type="button"
                onClick={Medium}
                className="bg-[#FEF3C7] text-[#B45309] h-10 font-semibold text-sm rounded-md hover:brightness-95 transition"
              >
                Medium
              </button>
              <button
                type="button"
                onClick={High}
                className="bg-[#FEE2E2] text-[#B91C1C] h-10 font-semibold text-sm rounded-md hover:brightness-95 transition"
              >
                High
              </button>
            </div>
          </div>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">

        <div className="flex flex-col gap-2">
          <label htmlFor="sdate" className="text-sm font-semibold text-[#374151]">
            Start Date
          </label>
          <input
            id="sdate"
            type="date"
            value={sdate}
            onChange={(e) => setSdate(e.target.value)}
            className="h-11 w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="edate" className="text-sm font-semibold text-[#374151]">
            Due Date
          </label>
          <input
            id="edate"
            type="date"
            value={edate}
            onChange={(e) => setEdate(e.target.value)}
            className="h-11 w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
        </div>

      </div>
       <div className="flex gap-2 justify-end">
         <button
          onClick={handelUpdate}
          className="bg-[#4F46E5] hover:bg-[#4338CA]  text-white font-semibold text-[15px] rounded-md self-center p-2 hover:cursor-pointer"
        >
          Update Task
        </button>
        
       </div>
      </div>
    </div>
  
  );
}
