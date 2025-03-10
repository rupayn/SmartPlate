import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerifyUser } from "@repo/common/config";
export async function GET() {
    const cookiesS = await cookies();
    const CookieUser = cookiesS.get("next-auth-token");
    let decode = undefined;
  
    if (CookieUser)
      decode = await jwtVerifyUser(
        String(CookieUser?.value),
        process.env.NEXTAUTH_SECRET!
      );
    if(!decode) return NextResponse.json({
      success:false,
      data:null
    })
    
    
    
    return NextResponse.json({
      success: true,
      data:decode
    })
}
