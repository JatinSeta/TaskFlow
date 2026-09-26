import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import logo from "../../public/Image/Logo.png";
import Singup_img from "../../public/Image/Sing_Up_Img.jpg"
export default function SingUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const Singin = useNavigate();
  const dash_board = useNavigate()
  function goSingin() {
    Singin("/login");
  }
  async function handelSubmite() {
    if (password != confirmPassword) {
      setError("Please Check Password!");
    } else {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const update_user_detiles = userCredential.user;
          const collectionRef = collection(db, "users");
          const newDocRef = doc(collectionRef, userCredential.user.uid);
          const useruid = userCredential.user.uid;
          updateProfile(update_user_detiles, {
            displayName: name,
            phoneNumber: contact,
          });
          const user = {
            name: name,
            email: email,
            userid: useruid,
            contact: contact,
          };
          setDoc(newDocRef, user);
          dash_board('/dashboard')
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    <div className="h-screen  flex justify-center flex-col sm:flex-row bg-linear-50 from-[#F4FBFD] to-[#E5F6FA]">
      <div className="m-auto w-[80%] flex flex-col md:flex-row font-bold bg-white border-4 border-[#E0EEF2] rounded-[20px] p-5 align-middle ">
        <div className="flex flex-col  sm:w-[50%] m-auto">
        <img src={logo} alt="" className="w-[30%] self-center" />
        <h1 className="text-2xl text-[#063F58] text-center">Create Your Account</h1>
        <p className="text-[16px] text-[#6B7F88] text-center">Sign up to get started.</p>
        <img src={Singup_img} alt="" className="m-2 rounded-2xl hidden sm:block" />
        </div>
        <div className="sm:w-[50%] m-auto">
           <label htmlFor="" className="text-[14px] text-[#102A36]">
          Full Name
        </label>
        <input
          type="text"
          className="text-[16px] align-middle self-center border-[#DCE8EC] hover:border-[#08C9DC]  p-2 m-1 border-2 w-full rounded-md"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="" className="text-[14px] text-[#102A36]">
          Email
        </label>
        <input
          type="text"
          className="text-[16px] align-middle self-center  border-[#DCE8EC] hover:border-[#08C9DC] p-2 m-1 border-2 w-full rounded-md"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="" className="text-[14px] text-[#102A36]">
          Contact
        </label>
        <input
          type="text"
          className="text-[16px] align-middle self-center  border-[#DCE8EC] hover:border-[#08C9DC] p-2 m-1 border-2 w-full rounded-md"
          onChange={(e) => setContact(e.target.value)}
        />
        <label htmlFor="" className="text-[14px] text-[#102A36]">
          Password
        </label>
        <input
          type="password"
          className="text-[16px] align-middle self-center border-[#DCE8EC] hover:border-[#08C9DC]  p-2 m-1 border-2 w-full rounded-md"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="" className="text-[14px] text-[#102A36]">
          Confirm Password
        </label>
        <input
          type="password"
          className="text-[16px] align-middle self-center  border-[#DCE8EC] hover:border-[#08C9DC]  p-2 m-1 border-2 w-full rounded-md"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <h1 className="text-center">{error}</h1>
        <p className="text-[14px]">
          Already have an account?{" "}
          <span
            className="underline text-blue-500 cursor-pointer"
            onClick={goSingin}
          >
            Sign in
          </span>
        </p>
        <button
          onClick={handelSubmite}
          className="bg-[#0795AE] p-2 text-white m-2 rounded-md w-[50%] self-center"
        >
          SingUp
        </button>
        </div>
      </div>
    </div>
  );
}
