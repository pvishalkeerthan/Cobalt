"use client";
import "@/cssFiles/homeanimations.css";
import axios from "axios";
import toast from "react-hot-toast";
import  { useRouter } from "next/navigation";


export default function LogoutButton() {
  const router = useRouter();
  const onLogout = ()=>{
    try {
      axios.get('/api/users/logout').then(()=>{
        toast.success('logout successfully')
        router.push('/login')
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <button onClick={e=>{onLogout()}} >logout</button>
  );
}
