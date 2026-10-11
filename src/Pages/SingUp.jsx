import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import logo from "../../public/Image/Logo.png";
import Singup_img from "../../public/Image/Sing_Up_Img.jpg";

export default function SingUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const Singin = useNavigate();
  const dash_board = useNavigate();
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
            notification: [],
          };
          setDoc(newDocRef, user);
          dash_board("/dashboard");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    <section className="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 p-2 flex rounded-2xl shadow-lg max-w-3xl">
        <div className="px-5 flex flex-col">
          <img src={logo} alt="" className="w-25 self-center " />
          <h2 className="text-2xl text-center font-bold text-[#002D74]">
            Create an Account
          </h2>
          <p className="text-sm mt-4 text-[#002D74] text-center">
            Create your TaskFlow account to get started.
          </p>
          <div className="mt-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-6">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              name=""
              id=""
              placeholder="Enter Email Address"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-6">
            <label className="block text-gray-700">Contact</label>
            <input
              type="number"
              name=""
              id=""
              placeholder="Contact Number"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              required
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name=""
              id=""
              placeholder="Enter Password"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name=""
              id=""
              placeholder="Confirm Password"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="text-start mt-3 flex gap-2">
            <input type="checkbox" required className="hover:cursor-pointer" />
            <p>I agree to the Terms & Conditions and Privacy Policy.</p>
          </div>

          <button
            type="submit"
            className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6 hover:cursor-pointer"
            onClick={handelSubmite}
          >
            Log In
          </button>

          <p className="text-center text-red-500 font-semibold mt-2">{error}</p>

          <div className="text-sm flex  items-center mt-3">
            <p>Already have an account? </p>
            <button className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400 hover:cursor-pointer" onClick={goSingin}>
              Log In
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
