import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Add a new header x-current-path which passes the path to downstream components
  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.href.split("?")[0]!);
  return NextResponse.next({ headers });
}

export default clerkMiddleware();

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};