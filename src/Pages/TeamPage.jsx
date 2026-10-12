import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {doc, collection,  getDocs, setDoc }  from "firebase/firestore";
import {db,auth}  from "../firebase.js"
import { onAuthStateChanged } from "firebase/auth";
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useNavigate } from "react-router-dom";
export default function TeamPage() {
  const [tems, setTems] = useState(false);
  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [createdby,setCreatedby] = useState()
  const [link,setLink] = useState("")
  const [copyLink,setCopyLink] = useState(false)
  const [iscopy,setIsCopy]=useState(false) 
  const [alltems,setAllTems] = useState([])
  const view_team = useNavigate()
async  function handelSubmite(){
    const collections  = collection(db,"Tems");
    const docref = doc(collections) 
    const id = docref.id
    setLink(`http://localhost:5173/join/${id}`)
    const TeamDetiles = {
      id : id,
      name : name,
      description : description,
      createdby : JSON.parse(createdby),
      createdAt : new Date(),
      link : `http://localhost:5173/join/${id}`,
      users : [JSON.parse(createdby)]
    }
    await setDoc(docref,TeamDetiles)
    setTems(false)
    setCopyLink(true)
    setName("")
    setDescription("")
  }
  async function handelCopy() {
    try{
        await navigator.clipboard.writeText(link)
        setIsCopy(true)
      setTimeout(()=>{
        setIsCopy(false)
      },3000)
    }catch(error){
      console.log(error)
    }
  }

  async function handelTeam(current_user){
    const data =[]
    const res = await getDocs(collection(db,"Tems"))
    res.forEach((team_data)=>{
      const users = team_data.data().users
      users.map((ele)=>{
        if(ele.id == current_user.id && ele.ismember == true){
            data.push(team_data.data()) 
          }
        })
    })
    setAllTems(data)
  }
  function handelTems() {
    setTems(true);
  }
  
  useEffect(()=>{
    onAuthStateChanged(auth,(current_user)=>{
      const createdby = {
        name : current_user.displayName,
        id : current_user.uid,
        ismember : true
      }
      setCreatedby(JSON.stringify(createdby))
      handelTeam(createdby)
    })
  },[])

  return (
    <>
   
      <div className="flex">
       
      <div className={`w-full p-4`}>
        <div className=" flex flex-col">
          <h1 className="text-[28px] font-bold text-[#172B36] ">Teams</h1>
        <p className="text-[14px] font-normal text-[#64748B] ">
          Manage your teams and collaborate with your members.
        </p>
        <button
          onClick={handelTems}
          className="bg-[#009FC6] text-[#FFFFFF] text-[14px] font-semibold rounded-md mt-2 p-2 ml-auto"
        >
          Create Team
        </button>
        </div>
        {alltems.map((ele,index)=>(
          <div key={index} onClick={()=>view_team(`/view-team/${ele.id}`)} className="bg-[#FFFFFF] border-2 border-[#E2E8F0] rounded-md p-1 m-2 hover:bg-[#F8FAFC] hover:border-[#BAE6FD] transition-all duration-300 hover:cursor-pointer">
            <h1 className="m-1 text-[18px] text-[#172B36] font-bold">{ele.name}</h1>
            <h1 className="m-1 text-[13px] font-normal text-[#64748B]">{ele.description}</h1>
            <label className="m-1 p-1 rounded-md text-[#475569] text-[13px] font-semibold bg-[#F1F5F9]">{ele.createdby.name}</label>
          </div>
        ))}
      </div>

      </div>
    

      {tems && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className={`${tems == true ? "block" : "hidden"}`}>
            <div className="flex flex-col  p-2 m-auto  bg-white rounded-md border-2 border-[#E2E8F0] z-50 shadow-2xl shadow-black">
              <CloseIcon
                className="ml-auto hover:cursor-pointer"
                onClick={() => setTems(false)}
              />
              <h1 className="text-[28px] font-bold text-[#172B36] m-1">
                Create New Team
              </h1>
              <p className="text-[14px] font-normal text-[#64748B] m-1 ">
                Create a team and add members who will collaborate on tasks and
                projects.
              </p>
              <label
                htmlFor=""
                className="m-1 text-[13px] font-semibold uppercase text-[#64748B] bg-transparent"
              >
                Team Name
              </label>
              <input
                type="text"
                value={name}
                placeholder="Enter team name"
                className="text-[14px] m-1 bg-[#FFFFFF] border-2 border-[#D1D5DB] rounded-md focus:border-[#2563EB] outline-0 p-1.5 hover:cursor-pointer"
                onChange={(e)=>setName(e.target.value)}
              />
              <h1 className="text-[14px] m-1 text-[#374151] font-semibold">
                Team Description
              </h1>
              <textarea
                type="text"
                value={description}
                placeholder="Describe what this team is responsible for..."
                className="m-1 text-[14px] text-[#374151] border-[#D1D5DB] border-2 rounded-md p-1.5 hover:cursor-pointer line-clamp-5 focus:border-[#2563EB] outline-0"
                onChange={(e)=>setDescription(e.target.value)}
             />
              <div className="flex justify-end">
                <button
                  className="hover:cursor-pointer m-1 w-[25%] self-center rounded-md text-[#FFFFFF] bg-[#009FC6] hover:bg-[#007FA3] font-bold text-[14px] p-2"
                  onClick={() => setTems(false)}
                >
                  Cancel
                </button>
                <button onClick={handelSubmite} className="hover:cursor-pointer m-1 w-[25%] self-center rounded-md text-[#FFFFFF] bg-[#009FC6] hover:bg-[#007FA3] font-bold text-[14px] p-2">
                  Create Team
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {copyLink && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className={`bg-[#FFFFFF] flex flex-col ${copyLink == true ? "block" : "hidden"} flex flex-col w-[50%] m-auto p-5`}>
              <CheckIcon className="self-center text-[#16A34A] bg-[#DCFCE7] rounded-full text-[32px]! p-1"/> 
                <h1 className="text-[#172B36] m-1  text-[24px] font-bold text-center">Team Created Successfully</h1>
                <p className="text-[#64748B]  m-1 text-[14px] font-normal text-center">Invite teammates using this link:</p>
                <div className="flex justify-center ">
                <input type="text" value={link} readOnly className=" m-1 p-1 rounded-md text-[14px] font-normal bg-[#F8FAFC] border-2 w-[80%] border-[#CBD5E1] focus:border-[#009FC6] outline-0 text-[#374151] "/> 
                  <button onClick={handelCopy} className="bg-transparent m-1 hover:cursor-pointer group text-[14px] font-semibold p-1 rounded-md hover:"><ContentCopyIcon className="text-[#009FC6] group-hover:text-[#007FA3]"/></button>
                </div>
                <button onClick={()=>setCopyLink(false)} className="bg-[#F1F5F9]  p-1 rounded-md w-[25%] m-1 text-[14px]  text-[#374151] font-semibold hover:bg-[#E2E8F0] hover:cursor-pointer self-center">Done</button>
               <p className={`${iscopy == true ? "block" : "hidden"} text-center font-semibold text-[#16A34A] p-1 m-1 bg-[#DCFCE7] rounded-md `}>Link Copied Successfully</p> 
                </div>
        </div>
      )}

    </>

  );
}
