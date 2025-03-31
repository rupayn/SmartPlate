import { prisma } from "@repo/db/config";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { cookies } from "next/headers";

import {
    jwtEncryptUser,
    objectFilter,
    userInterface,
} from "@repo/common/config";

import { cloudinaryConfigFun,cloudinary } from "@repo/common/config";
// import {v2 as cloudinary} from "cloudinary"

type cloudinaryUploadResult = {
    public_id: string;
    secure_url: string;
    url: string;
} & Record<string, unknown>;

cloudinaryConfigFun({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
     api_key: process.env.CLOUDINARY_API_KEY!,
     api_secret: process.env.CLOUDINARY_API_SECRET!,
     secure: true,
 });

export function GET() {
    return NextResponse.json({
        success: true,
        message: "Welcome to our API",
    });
}

export async function POST(req: NextRequest) {
    
    try {
        const fromData = await req.formData();

        const salt = parseInt(process.env.BCRYPT_SALT!);

        const tempUser = {
            name: fromData.get("Full Name") as string,
            enrollment: parseInt(fromData.get("Enrollment No") as string),
            email: fromData.get("Email") as string,
            password: fromData.get("Password") as string,
        };
        for (const [key, value] of Object.entries(tempUser)) {
            if (!value) {
                NextResponse.json({
                    success: false,
                    error: `${key} does not exist`,
                });
            }
        }

        const img = fromData.get("image") as File | null;
        let result;
        if (img) {
            if (img.size > 1024 * 1024 * 20) 
                return NextResponse.json({
                    success:false,
                    error:"Image Size excide"
                })
            const bytes = await img.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const fileName = `${Date.now()}-${img.name.replace(/\s+/g,'-')}`;
            
            
            if (buffer.length > 1024 * 1024 * 20) {
                return NextResponse.json({
                    success: false,
                    error: "Image size exceeds 20MB",
                });
            }
            try {
 
                    result = await new Promise<cloudinaryUploadResult>((resolve,reject)=>{
                        const uploadStream = cloudinary.uploader.upload_stream(
                            {
                                folder: "uploads",
                                public_id: `${fileName}`,
                            },

                            (errUpload, resUpload) => {
                                if (errUpload) reject(errUpload);
                                else resolve(resUpload as cloudinaryUploadResult);
                            }
                        );
                        uploadStream.end(buffer)
                    })
                    
            } catch (error) {
                
                throw error;    
            }
        }
        const encryptedPassword = await bcrypt.hash(tempUser.password, salt);
        tempUser.password = encryptedPassword;
        const { name, email, password, enrollment } = tempUser;
        const existingUser = await prisma.user.findMany({
            where: {
                OR: [{ email }, { enrollment }],
            },
        });

        if (existingUser.length > 0) {
            return NextResponse.json({
                success: false,
                error: "User already exists",
            });
        }
        const userd = await prisma.user.create({
            data: {
                name,
                enrollment,
                email,
                password,
                avatar:
                    result && result.secure_url
                        ? result.secure_url
                        : `https://api.dicebear.com/7.x/identicon/svg?seed=${name}`,
                avatar_id:
                    result && result.secure_url ? String(result.public_id) : "1234",
            },
        });

        const userWithoutPass: userInterface = await objectFilter(
            userd,
            "password"
        );

        const encryptUser: string = await jwtEncryptUser(
            userWithoutPass,
            String(
                process.env.NEXTAUTH_SECRET
            )
        );

        const cookieStore = await cookies();
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
    } catch (error) {
        let errorMessage = "Something went wrong"; // Default message

        if (error instanceof Error) {
            errorMessage = error.message; // Extracts error message
        } else if (typeof error === "string") {
            errorMessage = error; // Handles string errors
        }
        return NextResponse.json({
            success: false,
            message: "Failed to sign up",
            error: errorMessage,
        });
    }
}
