"use client";
import Link from "next/link"
import React,{useEffect, useState} from 'react'
import { useRouter } from "next/navigation";
import axios  from "axios";



const Login = () => {

  const router=useRouter()

    const [user, setUser] = useState({
        email:"",
        password:"",
      
    })
    const [buttonDisabled, setbuttonDisabled] = useState(false)
    const [loading, setloading] = useState(false)

    const onLogin=async ()=>{
      setloading(true)
      try {
        const response=await axios.post('/api/users/login',user)
        router.push("/profile")
      } catch (error:any) {
        console.log("login failed",error.message);
        
        
      }finally{
        setloading(false)
      }


    }

    useEffect(()=>{

      if(user.email.length>0 && user.password.length>0){
        setbuttonDisabled(false)
      }
      else{
        setbuttonDisabled(true)
      }

    },[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white">
            
                <h1>{loading?"Processing":"Login"}</h1>
                <hr />
               
               
                <label>email</label>
                <input className="text-black" type="text" id="email" value={user.email} onChange={(e)=>{setUser({...user,email:e.target.value})}} placeholder="email" />
                
                <label>password</label>
                <input className="text-black" type="password" id="email" value={user.password} onChange={(e)=>{setUser({...user,password:e.target.value})}} placeholder="password" />

                <button onClick={onLogin} disabled={buttonDisabled} className={`${buttonDisabled? 'border p-2 mt-5 rounded-xl cursor-not-allowed':'border p-2 mt-5 rounded-xl hover:text-gray-950 hover:bg-white'}`}>Login</button>
                <Link className="mt-3" href="/signup">Visit Signup</Link>
    </div>
  )
}

export default Login