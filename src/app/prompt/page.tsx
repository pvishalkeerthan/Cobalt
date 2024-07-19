'use client'
import axios from 'axios';
import React, { useState } from 'react'


function page() {
 const [prompt,setPrompt] = useState<string>();
 
const ask = ()=>{
    if(prompt == null || prompt.length<0){
        return
    }
    try {
        axios.post('/api/users/askgeminitext',{prompt}).then((res)=>{
            console.log(res.data.message)
            setPrompt("")
        })
    } catch (error) {
        console.log(error)
    }
}

 
const askImage = ()=>{
    try {
        axios.get('/api/users/askgeminiimage').then((res)=>{
            console.log(res.data.message)
        })
    } catch (error) {
        console.log(error)
    }
}

    return (
    <>
    
    <input type="text" onChange={(e)=>{setPrompt(e.target.value)}}  name="" id="" />

        <button onClick={e=>{e.preventDefault();ask()}} >ask</button>
        <button onClick={e=>{e.preventDefault();askImage()}} >ask Image</button>

    </>
  )
}

export default page