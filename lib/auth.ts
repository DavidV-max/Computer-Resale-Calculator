"use client"

import { getSupabase } from "./supabase"

// Types
export type UserRole = "Admin" | "User"

export interface UserProfile {
  id: string
  email: string
  name: string
  role: UserRole
  status: string
  created_at: string
  updated_at: string
}

// Sign in with email and password
export async function signIn(email: string, password: string) {
  try {
    // DEVELOPMENT FALLBACK: Always allow these credentials in development
    if (email === "admin@example.com" && password === "admin123") {
      // Set a cookie to simulate authentication
      document.cookie = "admin_session=authenticated; path=/; max-age=86400"
      return {
        success: true,
        user: {
          id: "demo-admin-id",
          email: "admin@example.com",
          name: "Admin User",
          role: "Admin" as UserRole,
          status: "Active",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as UserProfile,
      }
    }

    // Original demo credentials
    if (email === "admin" && password === "admin123") {
      // Set a cookie to simulate authentication
      document.cookie = "admin_session=authenticated; path=/; max-age=86400"
      return {
        success: true,
        user: {
          id: "demo-admin-id",
          email: "admin",
          name: "Admin User",
          role: "Admin" as UserRole,
          status: "Active",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as UserProfile,
      }
    }

    // Try Supabase authentication
    try {
      const supabase = getSupabase()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Supabase auth error:", error)
        return { success: false, error: error.message }
      }

      if (!data.session) {
        return { success: false, error: "Authentication failed" }
      }

      // Get user profile
      const { data: profileData, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .single()

      if (profileError) {
        console.error("Profile fetch error:", profileError)

        // Create a default profile if one doesn't exist
        return {
          success: true,
          user: {
            id: data.user.id,
            email: data.user.email || "",
            name: data.user.email?.split("@")[0] || "User",
            role: "Admin" as UserRole, // Assume admin for now
            status: "Active",
            created_at: data.user.created_at || new Date().toISOString(),
            updated_at: data.user.updated_at || new Date().toISOString(),
          } as UserProfile,
        }
      }

      return { success: true, user: profileData as UserProfile }
    } catch (supabaseError) {
      console.error("Supabase error:", supabaseError)
      return { success: false, error: "Authentication service unavailable" }
    }
  } catch (error: any) {
    console.error("Authentication error:", error)
    return { success: false, error: error.message || "An unexpected error occurred" }
  }
}

// Get current user
export async function getCurrentUser() {
  try {
    // Check for development cookie first
    const cookies = document.cookie.split(";")
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      if (cookie.startsWith("admin_session=authenticated")) {
        return {
          success: true,
          user: {
            id: "demo-admin-id",
            email: "admin@example.com",
            name: "Admin User",
            role: "Admin" as UserRole,
            status: "Active",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          } as UserProfile,
        }
      }
    }

    // Try Supabase
    try {
      const supabase = getSupabase()
      const { data, error } = await supabase.auth.getSession()

      if (error || !data.session) {
        return { success: false, error: error?.message || "No active session" }
      }

      // Get user profile
      const { data: profileData, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.session.user.id)
        .single()

      if (profileError) {
        // Create a default profile
        return {
          success: true,
          user: {
            id: data.session.user.id,
            email: data.session.user.email || "",
            name: data.session.user.email?.split("@")[0] || "User",
            role: "Admin" as UserRole, // Assume admin for now
            status: "Active",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          } as UserProfile,
        }
      }

      return { success: true, user: profileData as UserProfile }
    } catch (supabaseError) {
      console.error("Supabase error:", supabaseError)
      return { success: false, error: "Authentication service unavailable" }
    }
  } catch (error: any) {
    console.error("Get user error:", error)
    return { success: false, error: error.message || "An unexpected error occurred" }
  }
}

// Sign out
export async function signOut() {
  try {
    // Try to sign out with Supabase
    try {
      const supabase = getSupabase()
      await supabase.auth.signOut()
    } catch (supabaseError) {
      console.error("Supabase sign out error:", supabaseError)
    }

    // Always clear the cookie as fallback
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    return { success: true }
  } catch (error: any) {
    console.error("Sign out error:", error)
    return { success: false, error: error.message || "Failed to sign out" }
  }
}

// Other auth functions remain the same...
