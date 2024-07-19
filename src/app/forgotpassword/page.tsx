'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import "@/cssFiles/homeanimations.css";


export default function LoginPage() {
  
const [email,setEmail] = useState<string>()

const forgotPassword = ()=>{
  if(email == null || email.length == 0){
    toast.error('Please enter email')
    return
  }
  try {
    axios.post('/api/users/forgotpassword',{email}).then(()=>{
      console.log('sent email , click the link to change password');
      toast.success('sent email , click the link to change password');
    })
    
  } catch (error) {
    console.log(error)
  }
}
  return (
    <>
  <div className="grid grid-cols-2  gap-1 px-52 py-15 fade-in">

    <div className="mb-2">
        <label
            className="block text-sm font-semibold text-left text-white"
        >
            Email
        </label>
        <input
        id='email' value={email} onChange={(e)=>setEmail(e.target.value)} 
            type="email"
            className="w-full px-4 py-2 mt-2 bg-[#1e293b] rounded-md text-[#8f9eb3] focus:outline-none focus:ring focus:ring-opacity-40"
        />
    </div>
    <button onClick={e=>{e.preventDefault();forgotPassword()}}  > send email </button>
        </div>
        
        </>
      
  )
}

