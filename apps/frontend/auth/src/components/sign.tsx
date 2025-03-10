"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";


type InputFieldsType = {
  inputFilds: string[][];
  accountStatus: string;
  link: string;
};

function SignForm({ inputFilds, accountStatus, link }: InputFieldsType) {
  const [ipType, setIpType] = useState("password");
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

 

  const showPass = (e: React.MouseEvent) => {
    e.preventDefault();
    setIpType(ipType === "password" ? "text" : "password");
    toast.success("Password visibility toggled");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setInputValues({ ...inputValues, [fieldName]: e.target.value });
  };

  const submitFunc = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await axios.post(link, inputValues);

      if (response.data.error) {
        toast.error(`${response.data.error}`);
      }
      else{
        toast.success("Form submitted successfully!");
        window.location.href="http://localhost:3000/"
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      toast.error("Submission failed");
    }
  };

  return (
    <div className="flex flex-col">
      <p className="sm:text-4xl text-xl my-2 sm:my-5 font-bold m-auto text-center">
        {accountStatus.toUpperCase()}
      </p>
      <form method="post" onSubmit={submitFunc}>
        {inputFilds.map((ifil: string[], i) => (
          <div key={i}>
            <label
              htmlFor={ifil[0]}
              className="text-xs sm:text-base block font-bold m-1"
            >
              {ifil[0]}:
            </label>
            <input
              name={ifil[0]}
              id={ifil[0]}
              type={ifil[1] === "password" ? ipType : ifil[1]}
              className="m-1 text-black"
              onChange={(e) => handleInputChange(e, `${ifil[0]}`)}
            />
            {ifil[1] === "password" ? (
              ipType === "password" ? (
                <button onClick={showPass} className="bg-black text-white">
                  <FontAwesomeIcon icon={faEye} />
                </button>
              ) : (
                <button onClick={showPass} className="bg-black text-white">
                  <FontAwesomeIcon icon={faEyeSlash} />
                </button>
              )
            ) : (
              <div />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 h-10 text-lg font-bold mx-auto mt-5 mb-2 w-full hover:bg-indigo-800"
        >
          Submit
        </button>
      </form>
      <span className="sm:flex">
        <p>{accountStatus === "signup"?'Already have Account?':"Don't have account? "}</p>
        <Link
         className="sm:ml-1 sm:bg-transparent sm:text-pink-400 sm:focus:text-red-600 text-center bg-pink-400 block focus:bg-orange-900 sm:focus:bg-transparent" 
        href={accountStatus === "signup" ? `/signin` : `/`}>
          {accountStatus === "signup" ? "signin" : "signup"}
        </Link>
      </span>
    </div>
  );
}

export default SignForm;
