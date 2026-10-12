import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import CloseIcon from "@mui/icons-material/Close";
export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [tag, setTag] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [current_users,setCurrent_users] = useState()
  async function handelusers(current_user) {
    const docRef = doc(db, "users", current_user.id);
    const getData = await getDoc(docRef);
    const data = getData.data();
    setName(data.name);
    setEmail(data.email);
    setContact(data.contact);
    setTag(data?.tag || "Tag Not Added");
    setAboutUs(data?.aboutUs || "Short Descriptions Not Added");
  }
  async function handelUpdate() {
    const docref = doc(db,"users",current_users.id)
    // const get_Doc = await getDoc(docref)
    const updated_user = {
      name : name,
      email : email,
      contact : contact,
      tag : tag,
      aboutUs : aboutUs
    }
    await updateDoc(docref,updated_user)
    setIsEdit(false)
    handelusers(current_users)
  }
  function Edit() {
    if (isEdit == false) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }
  useEffect(() => {
    onAuthStateChanged(auth, (current_user) => {
      const user_detiles = {
        name: current_user.displayName,
        email: current_user.email,
        id: current_user.uid,
      };
      handelusers(user_detiles);
      setCurrent_users(user_detiles)
    });
  }, []);
  return (
   <div className="">
    <div className=" text-[#0F172A] p-4 sm:p-6 md:p-10 flex justify-center items-start ">
      
      <div className="flex w-full max-w-3xl bg-white p-4 sm:p-6 md:p-8 border border-[#E2E8F0] rounded-2xl shadow-sm gap-5 sm:gap-6 flex-col sm:flex-row ">
        <div className="h-16 w-16 sm:h-20 sm:w-20 bg-[#DBEAFE] rounded-full text-2xl sm:text-[32px] flex shrink-0 items-center justify-center">
          <h1 className="text-[#1D4ED8] self-center">{name[0]}</h1>
        </div>
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold text-[#0F172A]">
            {name}
          </h1>
          <h1 className="text-sm text-[#2563EB] mt-1 font-medium">{tag}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 ">
            <div>
              <label htmlFor="" className="text-sm font-medium text-[#64748B]">
                <EmailIcon className="h-5 w-5 text-[#64748B]" />
                Email Address
              </label>
              <h1 className="text-sm sm:text-[15px] text-[#475569] break-all mt-1">
                {email}
              </h1>
            </div>
            <div>
              <label htmlFor="" className="text-sm font-medium text-[#64748B]">
                <CallIcon className="h-5 w-5 text-[#64748B]" />
                Contact Number
              </label>
              <h1 className="text-sm sm:text-[15px] text-[#475569] break-all mt-1">
                {contact}
              </h1>
            </div>
          </div>
          <h1 className="text-sm sm:text-[15px] text-[#475569] leading-7  mt-6">
            {aboutUs}
          </h1>
          <button
            onClick={Edit}
            className="bg-[#2563EB] hover:cursor-pointer flex mt-6  text-[#FFFFFF] text-[15px] font-semibold rounded-md hover:bg-[#1D4ED8] px-5 py-2.5"
          >
            Edit Profile <ArrowOutwardIcon />
          </button>
        </div>
      </div>
      {isEdit && (
        <div>
          <div
            className={`${isEdit == true ? "block" : "hidden"} inset-0 fixed bg-black/75 h-screen w-screen`}
          ></div>
          <div className="fixed m-auto inset-0 z-50 w-full max-w-lg  rounded-2xl  p-6 sm:p-8  max-h-fit overflow-y-auto  bg-white flex-col flex">
            <CloseIcon className="ml-auto text-gray-500  rounded-lg  hover:bg-gray-100  hover:text-gray-900 p-0.5  hover:cursor-pointer" onClick={Edit}/>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Edit Profile
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Update your personal information.
            </p>
            <label
              htmlFor=""
              className="text-sm font-medium  text-gray-700 mb-1.5"
            >
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 text-sm  text-gray-900 bg-white  border-gray-300 rounded-lg focus:border-blue-500 outline-0 border-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label
              htmlFor=""
              className="text-sm font-medium  text-gray-700 mb-1.5"
            >
              Email
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 text-sm  text-gray-900 bg-white  border-gray-300 rounded-lg focus:border-blue-500 outline-0 border-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor=""
              className="text-sm font-medium  text-gray-700 mb-1.5"
            >
              Contact
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 text-sm  text-gray-900 bg-white  border-gray-300 rounded-lg focus:border-blue-500 outline-0 border-2"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <label
              htmlFor=""
              className="text-sm font-medium  text-gray-700 mb-1.5"
            >
              Tag
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 text-sm  text-gray-900 bg-white  border-gray-300 rounded-lg focus:border-blue-500 outline-0 border-2"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <label
              htmlFor=""
              className="text-sm font-medium  text-gray-700 mb-1.5"
            >
              Description
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 text-sm  text-gray-900 bg-white  border-gray-300 rounded-lg focus:border-blue-500 outline-0 border-2"
              value={aboutUs}
              onChange={(e) => setAboutUs(e.target.value)}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg w-[50%] mt-2 ml-auto hover:
              cursor-pointer" onClick={handelUpdate}
            >
              Update Profile
            </button>
          </div>
        </div>
      )}
    </div>
   </div>
   
  );
}
