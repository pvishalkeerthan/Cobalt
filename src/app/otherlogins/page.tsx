'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import NavBar from "@/components/NavBar";

function Page() {
  
  const [logins , setLogins] = useState([]);
  const [myToken,setMyToken] = useState();
  
  const getsessions = async()=>{
    try {
    await axios.get('/api/users/getsessions').then((res)=>{
      setLogins(res.data.sessions)
      setMyToken(res.data.yourtoken)
  })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
getsessions();
  },[])


  const logoutSession = async (token)=>{
   await axios.post('/api/users/logoutothers',{token}).then((res)=>{
      toast.success("successfully logged out")
      location.reload();
    })
  }



  return (
    <div>
      <NavBar/>
      <div className="my-2 mx-auto text-white ">{logins && <>
    
    {logins.map((login)=>{

        return <div key={login._id} className='bg-[#264F9460] border pl-4 pt-4 flex flex-col hover:bg-[#4e78c180] gap-2 my-2  text-center w-[800px] mx-auto border rounded-md'>

        <p class='className="text-xl font-mono"'>Token:{login.token} </p> 
        <p class='className="text-xl font-mono"'>Browe rName{login.browser_name} </p> 
        <p class='className="text-xl font-mono"'>Browser Version{login.browser_version} </p> 
        <p class='className="text-xl font-mono"'>Os Name:{login.os_name} </p> 
        <p class='className="text-xl font-mono"'>Os Version:{login.os_version} </p> 

        <button  className="inline mr-2 bg-red-500 text-center px-3 py-1 rounded-md border text-[#ffffff] mb-2 w-32 mx-auto"onClick={(e)=>{e.preventDefault();logoutSession(login.token)}} > Logout {login.token == myToken ? "this" : "other"} Session </button>
        </div> 

    })}
    
    
    </>}</div>

    </div>
    
    
  )
}

export default Page