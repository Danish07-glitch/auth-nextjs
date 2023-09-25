"use client"
import axios from "axios"
import Link from 'next/link'
import React,{useEffect,useState} from "react"

export default function VerifyEmailPage(){
    const [token, settoken] = useState("")
    const [verified, setverified] = useState(false)
    const [error, seterror] = useState(false)

    const verifyUserEmail=async()=>{
        try {
            await axios.post('/api/users/verifyemail',{token})
            setverified(true)
            
        } catch (e:any) {
            seterror(true)
            console.log(e.response.data);
            
            
        }
    }


    useEffect(() => {
        const urlToken=window.location.search.split("=")[1]
        settoken(urlToken || "")
     
    }, [])
    
    useEffect(() => {
        if(token.length>0) {
            verifyUserEmail()
        }
    }, [token])
    
    return(
        <>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl text-white">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token?`${token}`:"No token"}</h2>
        
            {verified &&(
                <div className="text-white">
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href='/login'>Login</Link>

                </div>
            )}
            {error &&(
                <div className="text-white">
                    <h2 className="text-2xl bg-red-600 text-black">Error</h2>
                  

                </div>
            )}
        </div>
        </>
    )
    





}