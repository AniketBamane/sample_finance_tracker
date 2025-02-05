// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("financetoken");  // Get token from cookies

  // Check if user is trying to access login or signup and already has a token
  if (
    (req.nextUrl.pathname.startsWith("/auth/login") || req.nextUrl.pathname.startsWith("/auth/signup")) &&
    token
  ) {
    // Redirect to homepage if user has a token but tries to access login/signup
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Check if user is accessing protected routes without a token
  if (!token && req.nextUrl.pathname !== "/auth/login" && req.nextUrl.pathname !== "/auth/signup") {
    // Redirect to login if no token and trying to access other routes
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

// Define routes to apply the middleware
export const config = {
  matcher: [
    "/",
    "/auth/login",
    "/auth/signup"             // Protect the home route
  ],
};
