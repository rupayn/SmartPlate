import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/db/config";
import bcrypt from "bcrypt"
export async function POST(req:NextRequest){
    const body=await req.json()
    const salt = parseInt(process.env.BCRYPT_SALT!);
    const updatedPass = await bcrypt.hash(body["Password"],salt);
    const upUser = await prisma.user.update({
      where: {
        email: "sp@ei.com",
      },
      data: {
        password: updatedPass,
      },
    });
    return NextResponse.json({
      success: true,
      upUser
    });
}