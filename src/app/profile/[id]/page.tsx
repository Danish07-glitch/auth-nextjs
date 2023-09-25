import React from 'react'

const Profile = ({params}:any) => {
  return (
    <div className='flex  flex-col justify-center items-center text-white min-h-screen py-2'>
        <h1>Profile</h1>
        <hr />
        <p className='text-4xl'>Profile Page {params.id}</p>
        
    </div> 
   
  )
}

export default Profile