import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(){
    const cookiesStore = await cookies();
    try {
        cookiesStore.set({
          name: "next-auth-token",
          value: "",
          httpOnly: true,
          path: "/",
          sameSite: "lax",
          expires: new Date(0),
        });
        return NextResponse.json({
            success: true,
            data: null,
            message: "Logged out successfully"
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Failed to log out",
            error
        })
    }
}