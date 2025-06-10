import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerSupabaseClient } from "./lib/supabase"

export async function middleware(request: NextRequest) {
  // Check if the request is for the admin dashboard
  if (request.nextUrl.pathname.startsWith("/admin/dashboard")) {
    try {
      // For development, check for the cookie
      if (process.env.NODE_ENV === "development") {
        const adminSession = request.cookies.get("admin_session")
        if (adminSession?.value === "authenticated") {
          return NextResponse.next()
        }
      }

      // Create a Supabase client
      const supabase = createServerSupabaseClient()

      // Get the session from the request
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        // Redirect to login page if not authenticated
        return NextResponse.redirect(new URL("/admin/login", request.url))
      }

      // Check if user is an admin
      const { data: userData } = await supabase.from("users").select("role").eq("id", session.user.id).single()

      if (!userData || userData.role !== "Admin") {
        // Redirect to login page if not an admin
        return NextResponse.redirect(new URL("/admin/login", request.url))
      }

      // User is authenticated and is an admin
      return NextResponse.next()
    } catch (error) {
      console.error("Middleware error:", error)
      // Redirect to login page on error
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
}
