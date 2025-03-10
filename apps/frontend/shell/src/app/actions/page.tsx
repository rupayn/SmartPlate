"use client"
import { useAuthStore } from "@/store/auth"; 
import React from "react";

function Page() {
  const {user}=useAuthStore();
  console.log(user);
  
  return <div>{user?.name}</div>;
}

export default Page;
