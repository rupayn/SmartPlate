import { prisma } from "@repo/db/config";
import {  NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { jwtEncryptUser, objectFilter, userInterface } from "@repo/common/config";
export function GET(){
    return NextResponse.json({
        success: true,
        message: "Welcome to our API"
    })
}

export async function POST(req:NextRequest){
    const body=await req.json();
    
    const salt = parseInt(process.env.BCRYPT_SALT!);
    const encryptedPassword = await bcrypt.hash(
      body["Password"],
      salt
    );
    const tempUser = {
      name: body["Full Name"],
      enrollment: parseInt(body["Enrollment No"]),
      email: body["Email"],
      password: encryptedPassword,
    };
    const {name, email, password,enrollment} = tempUser
    const existingUser =await prisma.user.findMany({
      where: {
        OR: [{ email }, { enrollment }],
      },
    });
    
    
    if( existingUser.length>0){
      throw new Error("User already exists")
    }
    const userd = await prisma.user.create({
      data: {
        name,
        enrollment,
        email,
        password,
        avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${name}`,
      },
    });
    
    const userWithoutPass:userInterface =await objectFilter(userd, "password");

    const encryptUser:string = await jwtEncryptUser(
              userWithoutPass,
              String(process.env.NEXTAUTH_SECRET)
            );

    const cookieStore=await cookies();
            cookieStore.set({
              name: "next-auth-token",
              value: encryptUser,
              httpOnly: true,
              path: "/",
              sameSite: "lax",
              expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
              domain: "localhost",
            });

    return NextResponse.json({
      success: true,
      userWithoutPass,  
    });
}