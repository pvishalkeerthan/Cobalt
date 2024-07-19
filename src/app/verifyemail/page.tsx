'use client';

import axios from 'axios';
import Link from 'next/link';
import React,{ useEffect, useState } from 'react';

export default function VerifyEmailPage(){
    const [token,setToken] = useState('');
    const [verified,setVerified] = useState(false);
    const [error,setError] = useState(false);

    const VerifyUserEmail= async()=>{
        try {
            await axios.post('api/users/verifyemail',{token})
            setVerified(true)
            
        } catch (error:any) {
            setError(true);
        }
}

useEffect(()=>{
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || '')
},[])

useEffect(()=>{
    if(token.length>0){
        VerifyUserEmail();
    }
},[token])

return(
    <>
    <div>
        <h1>Verify Email</h1>

        <h2> {token? `${token}`:'no token'} </h2>
        <h2> {verified && (
            <div>
                Email Verified
            </div>
        )} </h2>

<h2> {error && (
            <div>
                Error Occured ( try to verify again)
            </div>
        )} </h2>


    </div>
    
    </>
)


}