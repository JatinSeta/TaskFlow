import { useEffect, useState } from "react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
export default function CreatedTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assign, setAssign] = useState("");
  const [priority, setPriority] = useState("");
  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");
  const [error, setError] = useState("");
  const [createdBy, setCreatedby] = useState('')
  const [getUser,setGetuser] = useState([])
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
  
    
      const task = {
        id: taskid,
        title: title,
        description: description,
        assign: JSON.parse(assign),
        priority: priority,
        sdate: sdate,
        edate: edate,
        createdBy : JSON.parse(createdBy),
        status : "Pending",
        CreatedAt : new Date(),
        CompletedDate : ""
      };
      await setDoc(newDocRef, task);
      setTitle("")
      setDescription("")
      setSdate("")
      setEdate("")
    } else {
      setError("File The All Filed");
    }
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
  useEffect(() => {
    GetUsers();
    onAuthStateChanged(auth, (current_user) => {
      const user_Detiles = {
        name : current_user.displayName,
        id : current_user.uid
      }
      console.log(user_Detiles)
        setCreatedby(JSON.stringify(user_Detiles))
      })
  }, []);

  return (
    <div className="h-screen w-screen justify-center flex flex-col">
      <div className="flex flex-col w-[50%] m-auto justify-center">
        <h1 className="text-center p-2 text-2xl font-bold">Create Task</h1>
        <label htmlFor="">Task Title</label>
        <input
          type="text"
          value={title}
          className="border-2 p-1 rounded-md"
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="">Description</label>
        <textarea
          name=""
          id=""
          rows={4}
          value={description}
          className="border-2 p-1 rounded-md"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label htmlFor="">Assign To</label>
     <select name="" id="" onChange={(e) => setAssign(e.target.value)}  >
            {getUser.map((res,index)=>(

              <option key={index} value={JSON.stringify({userid : res.userid , name : res.name})}>{res.name}</option>
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
        </select>
        <div className="flex align-middle justify-evenly m-2">
          <div>
            <label htmlFor="">Start Date </label>
            <input
            value={sdate}
              type="date"
              className="border-2 p-1 rounded-md "
              onChange={(e) => setSdate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Due Date </label>
            <input
              type="date"
              value={edate}
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
