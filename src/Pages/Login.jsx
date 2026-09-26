import { useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "../../public/Image/Logo.png";
import login_image from "../../public/Image/Sing_Up_Img.jpg";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const singUp = useNavigate();
  const dash_board = useNavigate()
  function goSingUp() {
    singUp("/singUp");
  }
  async function handelSubmite() {
    if (email == "" && password == "") {
      setError("Enter Email & Password");
    } else {
      const user = await signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log("Done!", res);
          dash_board("/dashboard")
        })
        .catch((error) => {
          if (error.message == "Firebase: Error (auth/invalid-credential).") {
            setError("Invalid Password");
          } else if (error.message == "Firebase: Error (auth/invalid-email).") {
            setError("Invalid Email");
          }
        });
      console.log(user);
    }
  }
  onAuthStateChanged(auth, (current_user) => {
    if (current_user) {
      const user_name = current_user.displayName;
      console.log("Logined Email", user_name);
    } else {
      console.log("No User Found");
    }
  });
  return (
    <div className="h-screen w-full flex justify-center flex-col  bg-linear-30 from-[#F4FBFD] to-[#E5F6FA]">
      <div className=" w-[80%] p-5 rounded-2xl border-4 border-[#E0EEF2] bg-white  m-auto font-bold">
        <div className="flex flex-col  sm:w-[50%] m-auto">
          <img src={logo} alt="" className="w-[25%] self-center" />
          <h1 className="text-2xl text-[#063F58] text-center">Login</h1>
          <p className="text-[16px] text-[#6B7F88] text-center">
            Login to get started.
          </p>
          
        </div>
        <div className="flex">
        <div className="w-[50%] hidden sm:block">
        <img
            src={login_image}
            alt=""
            className="m-2 rounded-2xl hidden sm:block"
          />
        </div>
        <div className=" sm:w-[50%] m-auto p-5">
          <label htmlFor="" className="text-[14px] text-[#102A36]">
            Email
          </label>
          <input
            type="text"
            className=" text-[16px] align-middle self-center border-[#DCE8EC] hover:border-[#08C9DC]  p-2 m-1 border-2 w-full rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="" className="text-[14px] text-[#102A36]">
            Password
          </label>
          <input
            type="text"
            className=" text-[16px] align-middle self-center border-[#DCE8EC] hover:border-[#08C9DC]  p-2 m-1 border-2 w-full rounded-md"
            onChange={(e) => setPassword(e.target.value)}
          />
          <h1 className="text-center text-red-600">{error}</h1>
          <p>
            I don't have an account?{" "}
            <span
              className="underline text-blue-500 cursor-pointer"
              onClick={goSingUp}
            >
              Sign up
            </span>
          </p>
          <button
            className="bg-blue-500 p-2 text-white m-2 rounded-md w-[50%] self-center"
            onClick={handelSubmite}
          >
            Login
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
