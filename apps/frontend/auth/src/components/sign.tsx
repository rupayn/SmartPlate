"use client"
import React, { MouseEvent, useState } from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


import toast from 'react-hot-toast';
type inputFildsType ={
    inputFilds: string[][],
    accountStatus: string
}
function useSign({
    inputFilds,
    accountStatus

}:inputFildsType) {
  const [ipType,setIpType]=useState("password")
  const showPass = (e: MouseEvent) => {
    e.preventDefault();
    if(ipType === "password")  setIpType("text") 
    else setIpType("password");
    toast.success("done");
  };
  return (
    <div className="flex flex-col">
      <p className="sm:text-4xl text-xl my-2 sm:my-5 font-bold m-auto text-center">
        {accountStatus.toUpperCase()}
      </p>
      <form>
        {/* <input type="file" accept='.png .jpg'/> */}

        {inputFilds.map((ifil: string[], i) => (
          <div key={i}>
            <label
              htmlFor={ifil[0]}
              className="text-xs sm:text-base block font-bold m-1 "
            >
              {ifil[0]}:
            </label>
            <input
              name={ifil[0]}
              id={ifil[0]}
              type={ifil[1] == "password" ? ipType : ifil[1]}
              className="m-1 text-black"
            />
            {ifil[1] == "password" ? (
              <button
                onClick={(e) => showPass(e)}
                className=" bg-black text-white"
              >
                <FontAwesomeIcon icon={faEye} />
              </button>
            ) : (
              <div />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 h-10 text-lg font-bold mx-auto mt-5 mb-2 w-full disabled:bg-indigo-600 hover:bg-indigo-800"
          disabled={true}
        >
          Submit
        </button>
      </form>
      <span className="block md:inline-block my-2 sm:mt-5">
        {accountStatus == "signup"
          ? `already have account? `
          : `Don't have account?`}
      </span>
      <Link
        href={`${accountStatus == "signup" ? "signin" : "/"}`}
        className={`focus:text-red-600 text-center w-full block sm:inline  bg-pink-400 sm:bg-transparent focus:bg-pink-200 sm:focus:bg-transparent sm:text-lg sm:font-bold sm:text-pink-400 sm:pl-2 mx-auto disabled:bg-pink-600`}
      >
        {accountStatus == "signup" ? "signin" : "signup"}
      </Link>
    </div>
  );
}

export default useSign;
