"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth"; 
import HomePage from "@/components/homePage";
export default  function Home() {
  const { user, setUser } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (user) {
      setLoading(false); // Prevent unnecessary API calls if user already exists
      return;
    }
    axios
      .get("/api/get-user-details", {
        withCredentials: true,
      })
      .then((e) => {
        if (e.data) setUser(e.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [setUser, user, hydrated]);

  if (!hydrated) return (
    <div className="text-center mx-auto py-auto w-full h-screen flex items-center justify-center">
      <p className="text-6xl font-bold font-serif">Loading...</p>
    </div>
  );
    return loading ? (
        <div className="text-center mx-auto py-auto w-full h-screen flex items-center justify-center">
            <p className="text-6xl font-bold font-serif">Loading...</p>
        </div>
    ) : (
        <div className="">
            <HomePage></HomePage>
        </div>
    );
  
}