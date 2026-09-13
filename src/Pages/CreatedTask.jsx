import { useEffect, useState } from "react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";
export default function CreatedTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assign, setAssign] = useState("");
  const [priority, setPriority] = useState("");
  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");
  const [error, setError] = useState("");
  const [getUser, setGetUser] = useState([]);
  async function handelSubmite() {
    if (
      title !== "" &&
      description !== "" &&
      assign !== "" &&
      priority !== "" &&
      sdate !== "" &&
      edate !== ""
    ) {
        const collectionRef = collection(db, "createTask");
        const newDocRef = doc(collectionRef);
        const taskid = newDocRef.id;
      const task = {
        id : taskid,
        title: title,
        description: description,
        assign: assign,
        priority: priority,
        sdate: sdate,
        edate: edate,
        
      };
      const createTask = await setDoc(newDocRef,task);
      console.log(createTask);
    } else {
      setError("File The All Filed");
    }
  }
  async function GetUsers() {
    try {
      const Allusers = [];
      const seeTask = await getDocs(collection(db, "userData"));
      seeTask.forEach((ele) => {
        Allusers.push(ele.data());
      });
      setGetUser(Allusers);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    GetUsers();
  }, []);
  
  return (
    <div className="h-screen w-screen justify-center flex flex-col">
      <div className="flex flex-col w-[50%] m-auto justify-center">
        <h1 className="text-center p-2 text-2xl font-bold">Create Task</h1>
        <label htmlFor="">Task Title</label>
        <input
          type="text"
          className="border-2 p-1 rounded-md"
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <label htmlFor="">Description</label>
        <textarea
          name=""
          id=""
          rows={4}
          className="border-2 p-1 rounded-md"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label htmlFor="">Assign To</label>
        {/* <input type="text"  className="border-2 p-1 rounded-md" onChange={(e)=>setAssign(e.target.value)}/> */}
        <select name="" id="" onChange={(e) => setAssign(e.target.value)}>
          {getUser.map((res, index) => (
            <option value={res.name} key={index}  >
              {res.name}
            </option>
          ))}
        </select>
        <label htmlFor="">Priority</label>
        <select
          name=""
          id=""
          className="border-2 p-1 rounded-md"
          onChange={(e) => setPriority(e.target.value)}
          >
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
              onChange={(e) => setSdate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Due Date </label>
            <input
              type="date"
              className="border-2 p-1 rounded-md "
              onChange={(e) => setEdate(e.target.value)}
            />
          </div>
        </div>
        <h1 className="text-red-500 text-center font-bold">{error}</h1>
        <button
          className="bg-blue-500  sm:w-[25%] p-2 rounded-2xl text-white font-bold self-center m-2"
          onClick={handelSubmite}
        >
          Create Task
        </button>
      </div>
    </div>
  );
}
