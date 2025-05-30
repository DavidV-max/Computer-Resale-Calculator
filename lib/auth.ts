"use server"

import { cookies } from "next/headers"

// In a real application, you would use a database and proper authentication
// This is a simplified example for demonstration purposes
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123",
}

export async function authenticateAdmin(formData: FormData): Promise<{ success: boolean; message: string }> {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  // Simple authentication check
  const isValid = username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password

  if (isValid) {
    // Set a cookie to maintain the session
    const cookieStore = cookies()
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

    return {
      success: true,
      message: "Authentication successful",
    }
  }

  return {
    success: false,
    message: "Invalid username or password",
  }
}

export async function checkAdminSession(): Promise<boolean> {
  const cookieStore = cookies()
  const session = cookieStore.get("admin_session")
  return session?.value === "authenticated"
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = cookies()
  cookieStore.delete("admin_session")
}
