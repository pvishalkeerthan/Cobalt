"use client"
import axios from 'axios'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

async function GetUser() {
    let User: any 
       await axios.get('api/users/getuser').then((res)=>{
            if(res.data.success == false){
                return null
            }else{
                User = res.data.user
            }
        })
  return User
}

export default GetUser