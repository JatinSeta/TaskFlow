import { useState } from "react";
import { getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "../../public/Image/Logo.png";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isForgot,setIsForgot] = useState(false)
  const [resetLink,setResetLink] = useState("")
  const singUp = useNavigate();
  const dash_board = useNavigate()
  function goSingUp() {
    singUp("/singUp");
  }
  async function handelSubmite() {
    if (email == "" && password == "") {
        setError("Enter Email & Password");
    } else {
      await signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log("Done!", res);
          dash_board("/")
        })
        .catch((error) => {
          if (error.message == "Firebase: Error (auth/invalid-credential).") {
            setError("Invalid Password");
          } else if (error.message == "Firebase: Error (auth/invalid-email).") {
            setError("Invalid Email");
          }
        });
    }
  }
  const auth = getAuth();
  function ResetPassword(){
   if (!email.trim()) {
    setError("Please enter your email address");
    return;
  }

  sendPasswordResetEmail(auth, email.trim())
    .then(() => {
      setResetLink("Password reset email sent! Please check.");
    })
    .catch((error) => {
      console.log(error);
      setResetLink(error.message);
    });
  }
   setTimeout(()=>{
          setError("")
        },3000)
  onAuthStateChanged(auth, (current_user) => {
    if (current_user != null) {
      const user_name = current_user.displayName;
      console.log("Logined Email", user_name);
    } else {
      console.log("No User Found");
    }
  });
  function ForgotPassword(){
    if(isForgot == false){
      setIsForgot(true)
    }else{
      setIsForgot(false)
    }
  }
  return (
   <section className="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center">
    <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
      <div className="px-5 flex flex-col">
        <img src={logo} alt="" className="w-25 self-center "/>
        <h2 className="text-2xl text-center font-bold text-[#002D74]">Welcome back</h2>
        <p className="text-sm mt-4 text-[#002D74] text-center">Sign in to your TaskFlow account</p>
        {/* <form className="" onClick={handelSubmite} method="POST"> */}
          <div className="mt-6">
            <label className="block text-gray-700">Email Address</label>
            <input type="email" name="" id="" placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required onChange={(e)=>setEmail(e.target.value)}/>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" name="" id="" placeholder="Enter Password" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none" required onChange={(e)=>setPassword(e.target.value)}/>
          </div>

          <div className="text-right mt-2">
            <button href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700" onClick={ForgotPassword}>Forgot Password?</button>
          </div>

          <button type="submit" className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6 hover:cursor-pointer" onClick={handelSubmite} >Log In</button>
        {/* </form> */}
                <p className="text-center text-red-500 font-semibold mt-2">{error}</p>

        <div className="text-sm flex justify-between items-center mt-3">
          <p>If you don't have an account...</p>
          <button className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400 hover:cursor-pointer" onClick={goSingUp}>Register</button>
        </div>
      </div>
    </div>

      <div className={`${isForgot == true ? "block" : "hidden"} inset-0 fixed flex justify-center align-middle items-center bg-black/75 h-full w-full z-50`}>
         <div className="mt-7 bg-white  rounded-xl shadow-lg ">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800">Forgot password?</h1>
          <p className="mt-2 text-sm text-gray-600">
            Remember your password?
            <button className="text-blue-600 decoration-2 hover:underline font-medium hover:cursor-pointer" onClick={()=>setIsForgot(false)}>
              Login here
            </button>
          </p>
        </div>
        <div className="mt-5">
          <form>
            <div className="grid gap-y-4">
              <div>
                <label className="block text-sm font-bold ml-1 mb-2">Email address</label>
                <div className="relative" >
                  <input type="email" id="email" name="email" className="py-3 px-4 block w-full border-2 font-semibold border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error" onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
              </div>
              <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" onClick={ResetPassword}>Reset password</button>
            </div>
            <p className="text-green-500 font-semibold mt-2 text-center">{resetLink}</p>
            <p className="text-red-500 font-semibold mt-2 text-center">{error}</p>
          </form>
        </div>
      </div>
    </div>
      </div>
  </section>
  );
}
