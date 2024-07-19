"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function Page() {

    const [token,setToken] = useState('');
    const [verified,setVerified] = useState(false);
    const [password , setPassword] = useState<string>()
    const [confirmPassword , setConfirmPassword] = useState<string>()
    const [loading,setLoading] = useState(false)
    const router  = useRouter()
    const VerifyToken = async()=>{
        try {
            setLoading(true)
            await axios.post('api/users/forgottokenverify',{token}).then((res)=>{
                if(res.data.success == true){
                    setVerified(true)
                }  
                else{
                    toast.error('invalid token')
                }
            })
            
        } catch (error:any) {
        }
        finally{
            setLoading(false)
        }
    }

        useEffect(()=>{
            const urlToken = window.location.search.split('=')[1];
            setToken(urlToken || '')
        },[])

        useEffect(()=>{
            if(token.length>0){
                VerifyToken();
            }
        },[token])


        const changePassword = async()=>{

            if(password == '' || password == null || password == undefined){
                return
            }
            if(password == confirmPassword){
                return
            }
            try {
                setLoading(true)
                axios.post('/api/users/changepassword',{token,password}).then(()=>{
                    console.log('password changed successfully')
                    router.push('/login')
                })
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
        }

  return (
    <>
    
{verified && <>


<input  type='password' onChange={e=>{setPassword(e.target.value)}}  />
<input type='password'  onChange={e=>{setConfirmPassword(e.target.value)}} />


{loading ?
    <button disabled onClick={e=>{e.preventDefault();changePassword()}}> change password </button>
:
<button onClick={e=>{e.preventDefault();changePassword()}}> change password </button>
}


</>}

    </>
  )
}

export default Page