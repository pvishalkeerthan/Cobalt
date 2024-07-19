"use client"
import axios from 'axios'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

function CheckExistence() {
   const router = useRouter();
    useEffect(()=>{
        axios.get('/api/users/checkexistence').then((res)=>{
            if(res.data.success == false){
                toast.error("you are logged out")
                router.push('/login');
            }
        })
    },[])
  return <></>
}

export default CheckExistence