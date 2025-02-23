import { prisma } from "@repo/db/config";
import {  NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
export function GET(){
    return NextResponse.json({
        success: true,
        message: "Welcome to our API"
    })
}

export async function POST(req:NextRequest){
    const body=await req.json();
    console.log(body["Full Name"], body["Enrollment No"], body["Email"], body["Password"], body["Re-enter Password"]);
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
        avatar: "asdfghj",
      },
    });

    return NextResponse.json({
        success: true,
        userd
    })
}