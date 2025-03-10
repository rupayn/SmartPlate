import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
//   console.log("Middleware executed for:", req.nextUrl.pathname);

  if (req.nextUrl.pathname.startsWith("/auth")) {
    // console.log("Rewriting to auth service... ", req.nextUrl.pathname,"\n\n");
    return NextResponse.rewrite(`http://localhost:3001${req.nextUrl.pathname}`);
  }

  return NextResponse.next();
}
