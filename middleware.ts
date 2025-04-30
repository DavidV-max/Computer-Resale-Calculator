import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Check if the path is for the admin area (excluding login)
  const isAdminPath = path.startsWith("/admin") && !path.startsWith("/admin/login")

  // Check if the user is authenticated
  const isAuthenticated = request.cookies.has("admin_session")

  // If trying to access admin pages without authentication, redirect to login
  if (isAdminPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  // If already authenticated and trying to access login, redirect to dashboard
  if (path === "/admin/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
