import { prisma } from "@repo/db/config";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path"
import {
    jwtEncryptUser,
    objectFilter,
    userInterface,
} from "@repo/common/config";

export function GET() {
    return NextResponse.json({
        success: true,
        message: "Welcome to our API",
    });
}

export async function POST(req: NextRequest) {
    try {
        const fromdata = await req.formData();

        const salt = parseInt(process.env.BCRYPT_SALT!);

        const tempUser = {
            name: fromdata.get("Full Name") as string,
            enrollment: parseInt(fromdata.get("Enrollment No") as string),
            email: fromdata.get("Email") as string,
            password: fromdata.get("Password") as string,
        };
        for (const [key, value] of Object.entries(tempUser)) {
            if (!value) {
                NextResponse.json({
                    success: false,
                    error: `${key} does not exist`,
                });
            }
        }

        const img = fromdata.get("image") as File | null;
        if (img) {
            const bytes = await img.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const fileName = `${Date.now()}-${img.name.replace(/\s+/g,'-')}`;
            const uploadDir=path.join(process.cwd(),'public/uploads')
            fs.stat("/Users/joe/test.txt", (err, stats) => {
                if (err) {
                    throw  err;
                }
                if(stats.size>1024 * 1024 * 20){
                    return NextResponse.json({
                        success: false,
                        error: "Image size exceeds 20MB",
                    })
                }
                
            });
            try {
                if (!fs.existsSync(uploadDir)){
                    await fs.promises.mkdir(uploadDir, { recursive: true });
                }
                    await fs.promises.writeFile(
                        `${uploadDir}/${fileName}`,
                        buffer
                    ); 
            } catch (error) {
                const filePath = path.join(uploadDir, fileName);
                if(img) await fs.promises.unlink(filePath)
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
                avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${name}`,
            },
        });

        const userWithoutPass: userInterface = await objectFilter(
            userd,
            "password"
        );

        const encryptUser: string = await jwtEncryptUser(
            userWithoutPass,
            String(process.env.NEXTAUTH_SECRET)
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
