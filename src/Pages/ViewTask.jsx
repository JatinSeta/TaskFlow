import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import ArrowLeftIcon  from '@mui/icons-material/ArrowLeft';
export default function ViewTask() {
      const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assign, setAssign] = useState("");
  const [priority, setPriority] = useState("");
  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");
  const {id} = useParams();
  const BackPage = useNavigate();
  async function getData() {
    const res = doc(db,"createTask",id)
    const data = await getDoc(res)
    const taskDetiles = data.data()
     setTitle(taskDetiles.title)
    setDescription(taskDetiles.description)
    setPriority(taskDetiles.description)
    setAssign(taskDetiles.assign)
    setSdate(taskDetiles.sdate)
    setEdate(taskDetiles.edate)
  }
  useEffect(() => {
    getData();
  }, []);
  function Back() {
    BackPage("/all-task");
  }
  return (
    <div>
      <div className="m-4">
        <button
          onClick={Back}
          className="p-2 flex bg-blue-500 text-white rounded-md font-bold"
        >
          <ArrowLeftIcon />
          <h1>Go Back</h1>
        </button>
      </div>
      <div>
          <h1>{priority}</h1>
          <h1>{title}</h1>
          <h1>{description}</h1>
          <h1>{assign}</h1>
          <h1>{sdate}</h1>
          <h1>{edate}</h1>
          <h1>Task Status</h1>
            
      </div>
    </div>
  );
}
