import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@repo/db/config"
import bcrypt from "bcrypt"
import { cookies } from "next/headers";
import { jwtEncryptUser, objectFilter } from "@repo/common/config"
export function GET(){
    return NextResponse.json({
        message: "Hello, Next.js Serverless Functions!",
        name: "John Doe"
    })
}
interface userInterface {
  name: string ;
  id: number ;
  email: string ;
  enrollment: number ;
  created_at: object ;
  updated_at: object ;
  avatar: string ;
  isAdmin: boolean ;
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
        
        const userWithoutPass:userInterface =await objectFilter(user, "password");
        
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
            message: "Hello, Next.js Serverless Functions!",
            user
        })
    } catch (error) {
        
        NextResponse.json({
            err:error
        })
    }
}