"use client"
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import React, { useState } from 'react'

const Profile = () => {
  const router=useRouter()

  const [data,setdata]=useState("nothing")


  const getUserDetails=async ()=>{
    const res=await axios.get('/api/users/me')
    console.log(res.data);
    
    setdata(res.data.data._id)
  }

  const logout=async ()=>{
    try {
      const res=await axios.get("/api/users/logout")
      toast.success("Logout successfull")
      router.push('/login')

      
    } catch (error:any) {
      console.log(error.message);
      
      
    }

  }
  return (
    <div className='flex  flex-col justify-center items-center text-white min-h-screen py-2'>
        <h1>Profile</h1>
        <hr />
        <p>Profile Page</p>
        <h2>{data=="nothing"?"Nothing":<Link href={`/profile/${data}`}>
          {data}</Link>}</h2>

        <hr />
        <button onClick={getUserDetails} className='p-4 text-white border mt-4'>getdetails</button>

        <button onClick={logout} className='p-4 text-white border mt-4'>Logout</button>
        
    </div> 
   
  )
}

export default Profile