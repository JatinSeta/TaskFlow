import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import GroupsIcon from "@mui/icons-material/Groups";
import LinkIcon from "@mui/icons-material/Link";
export default function Join() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdby, setCreatedby] = useState();
  const [all_users, setAll_user] = useState([]);
  const [current_user, setcurrent_user] = useState();
  const [isVissible, setisVissible] = useState(false);
  async function getTeams() {
    const res = doc(db, "Tems", id);
    const docref = await getDoc(res);
    const data = docref.data();
    if (data == undefined) {
      setisVissible(true);
    } else {
      setTitle(data.name);
      setDescription(data.description);
      setCreatedby(data.createdby);
      setAll_user(data.users);
    }
  }
  async function handeljoin() {
    const pushedData = [...all_users];
    let found_user = true
   all_users.map((user) => {
      if(current_user.id !== user.id) {
        found_user = false
      }
    });
    if(found_user == false){
pushedData.push(current_user);
    }
    const update_obj = {
      users: pushedData,
    };
    const docref = doc(db, "Tems", id);
    await updateDoc(docref, update_obj);
    console.log("Document ID:", id);
    console.log("Update data:", update_obj);
    console.log("Users:", pushedData);
    const notfication_detiles = {
      id: current_user.id,
      name: current_user.name,
      content: `${current_user.name} has requested to join your team. Please review and accept their request.`,
    };
    await handelNotification(notfication_detiles);
  }

  async function handelNotification(new_data) {
    const res = doc(db, "users", createdby.id);
    const docref = await getDoc(res);
    const data = docref.data().notification;
    const update_notfication = [...data];
    update_notfication.push(new_data);
    await updateDoc(res, {
      notification: update_notfication,
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (current_user) => {
      const users = {
        id: current_user.uid,
        name: current_user.displayName,
        ismember: false,
      };
      setcurrent_user(users);
    });
    getTeams();
  }, []);
  return (
    <div className="h-screen w-screen flex">
      <div
        className={`${isVissible === false ? "block" : "hidden"} justify-center flex flex-col bg-white m-auto p-4 border-2 border-[#E2E8F0] rounded-md w-120`}
      >
        <GroupsIcon className="bg-[#E0F7FA] text-[#009FC6] p-1 rounded-full text-4xl! self-center" />
        <h1 className="text-[#172B36] text-[26px] font-bold text-center">
          You're Invited!
        </h1>
        <p className="text-[#64748B] text-[14px] text-center">
          You’ve been invited to join a team and collaborate with its members.
        </p>
        <div className="m-1 flex flex-col p-3 bg-[#F8FAFC]  border-2 border-[#E2E8F0] rounded-md w-110 ">
          <h1 className="text-[#172B36] text-[20px]  m-1 font-bold">{title}</h1>
          <h1 className="text-[#64748B] text-[14px]  m-1 font-normal">
            {description}
          </h1>
          <label
            htmlFor=""
            className="text-[#64748B]  m-1 text-[12px] font-semibold"
          >
            Invited by
          </label>
          <h1 className="font-semibold text-[14px] m-1  text-[#172B36]">
            {createdby?.name}
          </h1>
          <button
            onClick={handeljoin}
            className="bg-[#009FC6] text-[#FFFFFF] m-1  w-fit self-end text-[14px] font-semibold rounded-md hover:bg-[#007FA3] p-2 hover:cursor-pointer"
          >
            Join Button
          </button>
          <p className="text-[#64748B] text-center text-[13px] m-1 ">
            By joining this team, you’ll become a member and gain access to the
            team's workspace.
          </p>
        </div>
      </div>

      <div
        className={`${isVissible === true ? "block" : "hidden"}  p-6 bg-[#FFFFFF] shadow-[0_20px_50px_rgba(15,23,42,0.08)] border-2 flex flex-col m-auto border-[#E2E8F0] rounded-md text-center`}
      >
        <LinkIcon className="self-center rotate-75 text-[#0F172A] h-16 w-16 bg-[#F1F5F9]  text-[32px]! rounded-full border-[#F8FAFC] border-8 " />
        <h1 className="text-[24px] font-bold text-[#0F172A] ">Link Expired</h1>
        <p className="text-[14px]  text-[#64748B] *:">
          This invitation link has expired.
        </p>
      </div>
    </div>
  );
}
