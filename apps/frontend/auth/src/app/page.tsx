"use client"
import Sign from "@/components/sign"
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React, { useState } from "react";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";


export default function HomePage(){
  
  const [imageInput, setImageInput] = useState("/images.jpeg");
  const [fData,setFData]=useState<File|undefined>(undefined);
  const imageFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files&&e.target.files.length>0){ 
      const file = e.target.files[0];
      if(file){ 
        setImageInput(URL.createObjectURL(file))
        
        setFData(file)
      }

    }
  }; 
  return (
    <>
      <div className="flex h-auto w-auto items-center   justify-center">
        <div className="p-5 my-10 bg-slate-700 flex-col sm:flex-row flex items-center justify-center md:w-auto md:h-auto">
          <div className="file-input  flex flex-col justify-evenly">
            <Image
              src={imageInput}
              alt="image"
              width={1000}
              height={1000}
              className="sm:m-8 sm:mb-4  rounded-full sm:rounded-lg w-28 sm:w-72 sm:h-96 "
            />
            <input
              onChange={(e) => imageFunc(e)}
              type="file"
              id="file"
              className="file hidden"
            />

            <label
              htmlFor="file"
              className="mx-auto p-2 mt-3 sm:mt-0 sm:p-4 rounded-lg font-bold sm:text-2xl bg-gray-900"
            >
              <FontAwesomeIcon icon={faArrowUpFromBracket}></FontAwesomeIcon>
            </label>
          </div>
          <Sign
            inputFilds={[
              ["Full Name", "text"],
              ["Enrollment No", "text"],
              ["Email", "email"],
              ["Password", "password"],
              ["Re-enter Password", "password"],
            ]}
            link="/api/signup"
            accountStatus="signup"
            imageData={fData}
          />
        </div>
      </div>
    </>
  );
}