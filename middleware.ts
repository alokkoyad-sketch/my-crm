import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // login aur unauthorized page skip
  if (pathname.startsWith("/login") || pathname.startsWith("/unauthorized")) {
    return NextResponse.next();
  }

  // cookie check
  const cookie = req.cookies.get("crm_auth")?.value;
  if (!cookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const user = JSON.parse(cookie);

  // --- Role/Permission Logic ---
  if (pathname.startsWith("/companies") && !user.permissions.includes("companies")) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/employees") && !user.permissions.includes("employees")) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/reports") && !user.permissions.includes("reports")) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|robots.txt).*)"],
};
