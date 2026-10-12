import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "../component/Navbar";
export default function ViewTeam() {
  const { id } = useParams();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [link, setLink] = useState();
  const [createdby, setCreatedby] = useState();
  const [iscopy, setIsCopy] = useState(false);
  const [index, setIndex] = useState();
  const [all_users, setAll_Users] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const backPage =useNavigate()
  async function GetTeamDetiles() {
    const docs = doc(db, "Tems", id);
    const docref = await getDoc(docs);
    const data = docref.data();

    setName(data.name);
    setDescription(data.description);
    setLink(data.link);
    setCreatedby(data.createdby);
    setIndex(data.id);
    setAll_Users(data.users);
  }

  async function handelAccept(value) {
    const doc_ref = doc(db, "Tems", id);
    const get_doc = await getDoc(doc_ref);
    const data = get_doc.data().users;
    data[value].ismember = true;
    console.log(data);
    const update_doc = await updateDoc(doc_ref, {
      users: data,
    });
    console.log(update_doc);
  }
  async function handelRemove(value) {
    console.log(value);
    const doc_ref = doc(db, "Tems", id);
    const get_doc = await getDoc(doc_ref);
    if (!get_doc.exists()) return;
    const data = get_doc.data().users;

    data[value] = "";
    console.log(data);
    const updated_data = [];
    data.map((ele) => {
      if (ele !== "") {
        updated_data.push(ele);
      }
    });
    const update_doc = await updateDoc(doc_ref, {
      users: updated_data,
    });
    console.log(update_doc);
  }

  async function handelCopy() {
    try {
      await navigator.clipboard.writeText(link);
      setIsCopy(true);
      setTimeout(() => {
        setIsCopy(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    GetTeamDetiles();
    onAuthStateChanged(auth, (current_user) => {
      if (current_user != null) {
        const user = {
          id: current_user.uid,
          name: current_user.displayName,
        };
        setCurrentUser(user);
      }
    });
  }, []);
  function Back(){
    backPage('/teams')
  }
  return (
    <div className=""> 
      <div>
        <Navbar />
      </div>
      <div key={index} className=" p-10 flex gap-10">
        <div className="w-[55%] bg-[#FFFFFF] border-2 border-gray-400 p-8 rounded-2xl">
          <button onClick={Back} className="bg-gray-600 hover:cursor-pointer  text-white px-4 py-2 rounded-md hover:bg-gray-700">
  Back To Team Page
</button>
          <div>
            <h1 className="text-[28px] font-bold text-[#0F172A] mb-2">
              {name}
            </h1>

            <h1 className="text-[15px] font-normal text-[#64748B] mb-6">
              {description}
            </h1>

            <div className="mb-6">
              <h1 className="text-[11px] font-semibold uppercase text-[#94A3B8]">
                Created by
              </h1>
              <h1 className="text-[#334155] text-[15px] font-semibold">
                {createdby?.name}
              </h1>
            </div>

            <div className="mt-6">
              <h1 className="text-[18px] font-semibold  text-[#0F172A] mb-1 ">
                Invitation Link
              </h1>
              <h1 className="text-[14px] text-[#64748B] mb-3">
                Share this link with people you want to invite.
              </h1>

              <div className="flex  mt-3 gap-1 ">
                <input
                  type="text"
                  value={link}
                  readOnly
                  className=" m-1 p-1 rounded-md text-[14px] font-normal bg-[#F8FAFC] border-2 w-[80%] border-[#CBD5E1] focus:border-[#009FC6] outline-0 text-[#374151] "
                />
                <button
                  onClick={handelCopy}
                  className=" m-1 hover:cursor-pointer group text-[14px] font-semibold  text-center self-center p-2 bg-[#2563EB] text-white border-[#2563EB] hover:bg-[#1D4ED8] hover:border-[#1D4ED8] rounded-full"
                >
                  <ContentCopyIcon className="" />
                </button>
              </div>
            </div>
            <p className="text-[13px] font-semibold text-[#16A34A] text-center">
              {iscopy == true ? "Link Copied Successfully" : ""}
            </p>
          </div>
        </div>
        <div className="w-[45%] bg-[#ffffff] border-gray-400 border-2 p-[12px_14px] m-2 rounded-2xl">
          <div>
            <h1 className="text-[20px] font-bold text-[#0F172A] ">
              Team Members
            </h1>

            <h1 className="text-[13px] font-medium text-[#64748B] whitespace-nowrap">
              Total Members : {all_users.length}
            </h1>
          </div>
          <div className="overflow-y-auto">
            {all_users.map((res, index) => (
              <div
                key={index}
                className="bg-[#FFFFFF] border-[#E2E8F0] border-2 rounded-lg  p-[12px_14px] m-2 flex justify-between gap-4 hover:border-[#CBD5E1] hover:bg-[#F8FAFC] align-middle transition-all duration-300 "
              >
                <div className="flex gap-3 ">
                  <h1 className="h-10 w-10 rounded-full bg-[#DBEAFE] text-[#2563EB] text-[16px] font-bold uppercase flex items-center justify-center self-center">
                    {res.name[0]}
                  </h1>
                  <h1 className="text-[15px] text-[#334155] font-semibold self-center">
                    {res.name}
                  </h1>
                </div>
                <div className="flex">
                  {!res.ismember == false ? (
                    <div>
                      <h1 className="bg-[#DCFCE7] text-[#15803D] border-2 border-[#BBF7D0] text-[12px] font-semibold p-[4px_10px] rounded-[10px] ">
                        Accepted
                      </h1>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <h1 className="bg-[#FEF3C7] text-[#B45309] border-2 border-[#FDE68A] text-[12px] font-semibold p-[4px_10px] rounded-[10px] w-fit ml-auto self-center">
                        Pending
                      </h1>
                      <div className="flex gap-2 ml-auto mt-2">
                        <button
                          onClick={() => handelAccept(index)}
                          className="bg-[#2563EB] text-[#FFFFFF]  border-2 border-[#2563EB] font-semibold text-[13px] p-[7px_13px] rounded-md hover:cursor-pointer hover:bg-[#1D4ED8] hover:border-[#1D4ED8]"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handelRemove(index)}
                          className="bg-[#FFFFFF] text-[#DC2626]  border-2 border-[#FCA5A5] font-semibold text-[13px] p-[7px_13px] rounded-md hover:cursor-pointer hover:bg-[#FEF2F2] hover:border-[#DC2626]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
  );
}
