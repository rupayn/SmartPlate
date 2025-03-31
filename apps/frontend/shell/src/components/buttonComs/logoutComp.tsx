"use client"
import React, { useState } from 'react'
import { useAuthStore } from '@/store/auth';
import axios from"axios"


function LogoutComp() {
    const {clearUser}=useAuthStore();
    const [loading,setLoading]=useState(false)
    const logClick = () => {
        setLoading(true)
      clearUser()
      axios.post('http://localhost:3000/api/logout-user', {
        withCredentials: true,
      }).then(()=>{
        window.location.href="http://localhost:3000/"
      })
    };
  return (
    <div>
      <button
        onClick={logClick}
        className={`w-24 h-12 bg-red-600 rounded-md mt-10 disabled:bg-red-950`}
        disabled={loading}
      >
        Log Out
      </button>
    </div>
  );
}

export default LogoutComp