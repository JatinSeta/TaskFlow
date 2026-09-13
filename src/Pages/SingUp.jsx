import { useEffect, useState } from "react";
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
// import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { collection, getDoc, setDoc } from "firebase/firestore";

export default function SingUp() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [contact,setContact] = useState()
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword ] = useState('')
    const [error,setError] = useState('')
    const Singin = useNavigate()
    function goSingin(){
      Singin('/login')
    }
 async function handelSubmite(){
    if(password != confirmPassword){
        setError('Please Check Password!')
    }else{
      await createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
      const user = userCredential.user;
     console.log(user)
       updateProfile(user,{
        email : name,
        phoneNumber : contact
       }) 
       
    }).catch((error)=>{
      console.log(error)
    })    
    }  
  }
  return (
    <div className="h-screen w-full flex justify-center flex-col ">
        <div className="flex flex-col w-[25%] m-auto font-bold">
        <label htmlFor="">Full Name</label>
        <input type="text" className="align-middle self-center p-2 m-1 border-2 w-full rounded-md" onChange={(e)=>setName(e.target.value)}/>
        <label htmlFor="">Email</label>
        <input type="text" className="align-middle self-center p-2 m-1 border-2 w-full rounded-md" onChange={(e)=>setEmail(e.target.value)}/>
        <label htmlFor="">Contact</label>
        <input type="text" className="align-middle self-center p-2 m-1 border-2 w-full rounded-md" onChange={(e)=>setContact(e.target.value)}/>
        <label htmlFor="">Password</label>
        <input type="text" className="align-middle self-center p-2 m-1 border-2 w-full rounded-md" onChange={(e)=>setPassword(e.target.value)}/>
        <label htmlFor="">Confirm Password</label>
        <input type="text" className="align-middle self-center p-2 m-1 border-2 w-full rounded-md" onChange={(e)=>setConfirmPassword(e.target.value)}/>
        <h1 className="text-center">{error}</h1>
         <p>I have an account? <span className="underline text-blue-500 cursor-pointer" onClick={goSingin}>Sign in</span></p>
        <button onClick={handelSubmite} className="bg-blue-500 p-2 text-white m-2 rounded-md w-[50%] self-center" >SingUp</button>
        
        </div>
        </div>
  )
}
