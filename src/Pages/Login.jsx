import { useState } from "react";
import { auth  } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const singUp = useNavigate()
  function goSingUp(){
    singUp('/singUp')
  }
  async function handelSubmite() {
   if(email == "" && password == ""){
    setError("Enter Email & Password")
   }else{
     const user = await signInWithEmailAndPassword(auth,email,password).then((res)=>{
      console.log("Done!",res)
    }).catch((error)=>{
      if(error.message == "Firebase: Error (auth/invalid-credential)."){
        setError("Invalid Password")
      }else if(error.message == "Firebase: Error (auth/invalid-email)."){
        setError("Invalid Email")
      }
    })
    console.log(user)
   }
  }
  return (
    <div className="h-screen w-full flex justify-center flex-col ">
      <div className="flex flex-col sm:w-[25%]  m-auto font-bold">
        <label htmlFor="">Email</label>
        <input
          type="text"
          className="align-middle self-center p-2 m-1 border-2 w-full rounded-md"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="">Password</label>
        <input
          type="text"
          className="align-middle self-center p-2 m-1 border-2 w-full rounded-md"
          onChange={(e) => setPassword(e.target.value)}
        />
        <h1 className="text-center text-red-600">{error}</h1>
        <p>I don't have an account? <span className="underline text-blue-500 cursor-pointer" onClick={goSingUp}>Sign up</span></p>
        <button
          className="bg-blue-500 p-2 text-white m-2 rounded-md w-[50%] self-center"
          onClick={handelSubmite}
        >
          Login
        </button>
      </div>
    </div>
  );
}
