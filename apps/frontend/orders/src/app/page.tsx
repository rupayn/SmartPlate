"use client"

import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  useEffect(()=>{
    axios.get("http://localhost:8000").then(()=>{
      alert("Welcome")
    })
  })
  return (
    <div>

    </div>
  );
}
