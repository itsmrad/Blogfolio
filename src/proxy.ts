import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  console.log("Middleware triggered for:", request.nextUrl.pathname);
  const sessionCookie = getSessionCookie(request);
  console.log("Session cookie present:", !!sessionCookie);

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!sessionCookie) {
    console.log("Redirecting to login...");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/create"], // Only protect routes that require authentication
};
