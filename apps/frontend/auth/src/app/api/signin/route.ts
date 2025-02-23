import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@repo/db/config"
import bcrypt from "bcrypt"

export function GET(){
    return NextResponse.json({
        message: "Hello, Next.js Serverless Functions!",
        name: "John Doe"
    })
}
export async function POST(req:NextRequest){
    try {
        const data = await req.json();
        const emailOrEnroll=parseInt(data["Enrollment No / Email"]);
        let user;
        
        if(!emailOrEnroll){
            user = await prisma.user.findFirst({
              where: {
                email: data["Enrollment No / Email"],
              },
            });
        }
        else{
            user=await prisma.user.findFirst({
                where:{
                    enrollment:emailOrEnroll
                }
            })
            
        }
        if(!user){
            return NextResponse.json({
                status:404,
                error:"User Not Found"
            })
        }
        // const salt = parseInt(process.env.BCRYPT_SALT!);
        const checkPass = await bcrypt.compare(data["Password"], user.password);
       
        
        if(!checkPass){
             return NextResponse.json({
               status: 404,
               error: "Password Incorrect",
             });
        }
        return NextResponse.json({
            message: "Hello, Next.js Serverless Functions!",
            user
        })
    } catch (error) {
        
        NextResponse.json({
            err:error
        })
    }
}