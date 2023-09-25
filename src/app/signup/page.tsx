"use client";
import Link from "next/link"
import React,{useState,useEffect} from 'react'
import { useRouter } from "next/navigation";
import axios  from "axios";

const SignUp = () => {
  const router=useRouter()
    const [user, setUser] = useState({
        email:"",
        password:"",
        username:""
    })
    const [buttonDisabled, setbuttonDisabled] = useState(false)
    const [loading, setloading] = useState(false)

    const onSignUp=async ()=>{
        try {
          setloading(true)
          const response=await axios.post("/api/users/signup",user)
          console.log("Signup Success",response.data);
          router.push("/login")
          
          
        } catch (error:any) {
          console.log("signup failed",error.message);
          
          
        }finally{
          setloading(false)
        }

    }

    useEffect(() => {
      if(user.email.length>0 && user.password.length>0 && user.username.length>0){
        setbuttonDisabled(false)
      }
      else{
        setbuttonDisabled(true)
      }
    }, [user])
        


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white">
      
            
                <h1>{loading?"Processing":"Signup"}</h1>
                <hr />
                <label>username</label>
                <input className="text-black" type="text" id="username" value={user.username} onChange={(e)=>{setUser({...user,username:e.target.value})}} placeholder="username" />
               
                <label>email</label>
                <input className="text-black" type="text" id="email" value={user.email} onChange={(e)=>{setUser({...user,email:e.target.value})}} placeholder="email" />
                
                <label>password</label>
                <input className="text-black" type="password" id="email" value={user.password} onChange={(e)=>{setUser({...user,password:e.target.value})}} placeholder="password" />

                <button onClick={onSignUp} disabled={buttonDisabled} className={`${buttonDisabled? 'border p-2 mt-5 rounded-xl  cursor-not-allowed':'border p-2 mt-5 rounded-xl hover:text-gray-950 hover:bg-white'} `}>Sign Up</button>
                <Link className="mt-3" href="/login">Visit Login</Link>
    </div>
  )
}

export default SignUp