import type React from "react"
import { checkAdminSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Server-side authentication check
  const isAuthenticated = await checkAdminSession()

  // Get the current path segment
  const segment = children.props?.childProp?.segment

  // If not authenticated and not on login page, redirect to login
  if (!isAuthenticated && segment !== "login") {
    redirect("/admin/login")
  }

  return <>{children}</>
}
