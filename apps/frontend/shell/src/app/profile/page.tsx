import { jwtVerifyUser } from '@repo/common/config';
import { cookies } from 'next/headers';
import React from 'react'
import Image from "next/image";
import {JwtPayload} from "jsonwebtoken"
import { userStoreInterface } from '@/store/auth';
import LogoutComp from '@/components/buttonComs/logoutComp';
async function Page() {
  const cookiesS = await cookies();
  const CookieUser = cookiesS.get("next-auth-token");
  let decode:
    string
    | JwtPayload
    | null
    | userStoreInterface
    | undefined = undefined;
  
  if (CookieUser)
    decode = await jwtVerifyUser(String(CookieUser?.value),
          process.env.NEXTAUTH_SECRET!
        );
    let profLink;
    if(typeof decode !== 'object' && decode)decode=JSON.parse(decode)
    if(decode&& typeof decode==='object') profLink=String(decode?.avatar)  
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col items-center  w-screen h-screen">
        <Image
          src={
            profLink
              ? profLink
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjclDv0e9IVQdcKL5CgI8DITEgglEavaKqww&s"
          }
          height={200}
          width={200}
          alt="picture"
          className="rounded-full mt-10"
          unoptimized={profLink ? true : false}
        />
        <p className="mt-5 mb-2">
          {typeof decode === "object" ? String(decode?.name) : ""}
        </p>
        <p className="mb-2">
          {typeof decode === "object" ? decode?.email : ""}
        </p>
        <p className="mb-2">
          {typeof decode === "object"
            ? decode?.enrollment
              ? decode?.enrollment
              : ""
            : ""}
        </p>
        <LogoutComp/>
      </div>
    </div>
  );
}

export default Page