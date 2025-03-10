import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const allowedOrigins = [
    "http://localhost:3000", // shell
    "http://localhost:3002", // menu
    "http://localhost:3003", // orders
    "http://localhost:3004", // others
  ];

  const origin = req.headers.get("origin") || "";

  const res = NextResponse.next();

  // Allow requests only from the defined origins
  if (allowedOrigins.includes(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  }

  // Handle OPTIONS preflight requests
  if (req.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers: res.headers });
  }

  return res;
}

// Apply middleware to all API routes
export const config = {
  matcher: "/api/:path*",
};
