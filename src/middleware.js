import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const url = req.nextUrl;
    const token = req.nextauth.token;

    if (!token) {
      if (url.pathname !== "/admin/login") {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }
      return NextResponse.next();  // Allow /admin/login if not authenticated
    }

    if (url.pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    if (url.pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => true,  // Always true, logic handled manually
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};


