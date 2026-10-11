import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function CreatedTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assign, setAssign] = useState("");
  const [priority, setPriority] = useState("");
  const [sdate, setSdate] = useState();
  const [edate, setEdate] = useState();
  const [error, setError] = useState("");
  const [createdBy, setCreatedby] = useState("");
  const [getUser, setGetuser] = useState([]);
  const AllTask = useNavigate()
  const TeamPage = useNavigate()
  async function handelSubmite() {
    if (
      title !== "" &&
      description !== "" &&
      priority !== "" &&
      sdate !== "" &&
      edate !== ""
    ) {
      const collectionRef = collection(db, "createTask");
      const newDocRef = doc(collectionRef);
      const taskid = newDocRef.id;
      console.log(JSON.parse(assign))
      const task = {
        id: taskid,
        title: title,
        description: description,
        assign: JSON.parse(assign),
        priority: priority,
        sdate: sdate,
        edate: edate,
        createdBy: JSON.parse(createdBy),
        status: "Pending",
        CreatedAt: new Date(),
        CompletedDate: "",
      };
      await setDoc(newDocRef, task);
      AllTask('/all-task')
      setTitle("");
      setDescription("");
      setSdate("");
      setEdate("");
      const created_by = JSON.parse(createdBy);
      console.log(created_by);
      const assgin_user = JSON.parse(assign);
      const notfication_detiles = {
        id: assgin_user.userid,
        name: created_by.name,
        content: `${created_by.name} has assigned you a task: "${title}". Please review and complete it.`,
      };
      await handelNotification(assgin_user, notfication_detiles);
    } else {
      setError("File The All Filed");
    }
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
            if(Allusers.length == 0){
              Allusers.push(users);
            }else{
              Allusers.map((res) => {
                if (res.id != users.id) {
                  Allusers.push(users);
                }
              });
            }
          });
        }
      });
      if(Allusers.length == 0){
        setError(`No users found. Kindly create a team first and invite users.`)
      }
      setGetuser(Allusers);
    } catch (error) {
      console.log(error);
    }
  }
  async function handelNotification(assgin_user, detiles) {
    console.log(detiles);
    console.log(assgin_user.userid);
    const res = doc(db, "users", assgin_user.userid);
    const docref = await getDoc(res);
    const data = docref.data().notification;
    const update_notfication = [...data];
    update_notfication.push(detiles);
    await updateDoc(res, {
      notification: update_notfication,
    });
  }
  useEffect(() => {
    onAuthStateChanged(auth, (current_user) => {
      const user_Detiles = {
        name: current_user.displayName,
        id: current_user.uid,
      };
      setCreatedby(JSON.stringify(user_Detiles));
      GetUsers(user_Detiles);
    });
  }, []);

  function Low(){
 setPriority("Low")
  }
  function Medium(){
 setPriority("Medium")
  }
  function High(){
     setPriority("High")
  }
  return (
<div className=" flex items-center justify-center"> <div className="bg-white w-full max-w-2xl rounded-xl shadow-[04px20px_rgba(0,0,0,0.06)]"> <div> <h1 className="text-2xl sm:text-[28px] font-bold text-[#111827]"> Create Task </h1> <p className="text-sm text-[#6B7280]"> Organize work and assign responsibilities. </p> </div>

<div className="flex flex-col gap-2">

<label htmlFor="title" className="text-sm font-semibold text-[#374151]"> Task Title </label> <input id="title" type="text" value={title} placeholder="Enter task title" onChange={(e) => setTitle(e.target.value)} className="w-full h-11 text-sm text-[#374151] bg-white border border-[#D1D5DB] rounded-md px-3 focus:border-[#2563EB] outline-none focus:ring-4 focus:ring-blue-100" />

<label htmlFor="description" className="text-sm font-semibold text-[#374151]"> Description </label> <textarea name="description" id="description" rows={4} value={description} placeholder="Describe the task, requirements, and expected outcome..." onChange={(e) => setDescription(e.target.value)} className="w-full min-h-28 text-sm text-[#374151] rounded-md p-3 resize-y border border-[#D1D5DB] focus:border-[#2563EB] outline-none focus:ring-4 focus:ring-blue-100" />

<label htmlFor="assign" className="text-sm font-semibold text-[#374151]"> Assign To </label> {getUser.length == 0 ? ( <p>No users found. Kindly create a team first and invite users <span className="text-blue-500 font-semibold hover:cursor-pointer" onClick={()=>TeamPage("/teams")}>Create Team</span></p> ):( <select name="assign" id="assign" onChange={(e) => setAssign(e.target.value)} className="w-full h-11 px-3 text-sm bg-white text-[#374151] border border-[#D1D5DB] rounded-md focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100" > <option value="">Select Users</option> {getUser.map((res, index) => ( <option key={index} value={JSON.stringify({ userid: res.id, name: res.name, })} > {res.name} </option> ))} </select> )}

<label className="text-sm font-semibold text-[#374151]"> Priority </label> <div className="grid grid-cols-3 gap-2 sm:gap-3"> <button type="button" onClick={Low} className="bg-[#DCFCE7] text-[#15803D] h-10 font-semibold text-sm rounded-md hover:brightness-95 transition" > Low </button> <button type="button" onClick={Medium} className="bg-[#FEF3C7] text-[#B45309] h-10 font-semibold text-sm rounded-md hover:brightness-95 transition" > Medium </button> <button type="button" onClick={High} className="bg-[#FEE2E2] text-[#B91C1C] h-10 font-semibold text-sm rounded-md hover:brightness-95 transition" > High </button> </div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

<div className="flex flex-col gap-2"> <label htmlFor="sdate" className="text-sm font-semibold text-[#374151]"> Start Date </label> <input id="sdate" type="date" value={sdate} onChange={(e) => setSdate(e.target.value)} className="h-11 w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" /> </div>

<div className="flex flex-col gap-2"> <label htmlFor="edate" className="text-sm font-semibold text-[#374151]"> Due Date </label> <input id="edate" type="date" value={edate} onChange={(e) => setEdate(e.target.value)} className="h-11 w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" /> </div>

</div>

{error && ( <p className="text-sm text-red-600 text-center font-semibold" role="alert"> {error} </p> )}

<button type="button" onClick={handelSubmite} className="w-full h-12 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-base font-semibold rounded-md shadow-[02px4px_rgba(37,99,235,0.15)] transition-colors" > Create Task </button>

</div> </div> </div>
  );
}
