import { getSupabase } from "./supabase"

// User types
export type UserRole = "Admin" | "Manager" | "User"
export type UserStatus = "Active" | "Inactive" | "Pending"

export interface UserProfile {
  id: string
  email: string
  name: string
  role: UserRole
  status: UserStatus
  avatar_url?: string
  created_at: string
  updated_at: string
}

// Get current user
export async function getCurrentUser(): Promise<UserProfile | null> {
  try {
    const supabase = getSupabase()

    // Get the current session
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

    if (sessionError || !sessionData.session) {
      return null
    }

    // Get the user profile
    const { data, error } = await supabase.from("users").select("*").eq("id", sessionData.session.user.id).single()

    if (error || !data) {
      return null
    }

    return data as UserProfile
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// Get all users
export async function getAllUsers(): Promise<UserProfile[]> {
  try {
    const supabase = getSupabase()

    const { data, error } = await supabase.from("users").select("*").order("name")

    if (error) {
      throw error
    }

    return data as UserProfile[]
  } catch (error) {
    console.error("Error getting all users:", error)
    return []
  }
}

// Create a new user
export async function createUser(userData: {
  email: string
  password: string
  name: string
  role?: UserRole
  status?: UserStatus
}): Promise<{ success: boolean; message: string; user?: UserProfile }> {
  try {
    const supabase = getSupabase()

    // Create the auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: userData.email,
      password: userData.password,
      email_confirm: true,
    })

    if (authError) {
      return { success: false, message: authError.message }
    }

    // Create the user profile
    const { data, error } = await supabase
      .from("users")
      .insert({
        id: authData.user.id,
        email: userData.email,
        name: userData.name,
        role: userData.role || "User",
        status: userData.status || "Active",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      // Clean up the auth user if profile creation fails
      await supabase.auth.admin.deleteUser(authData.user.id)
      return { success: false, message: error.message }
    }

    return { success: true, message: "User created successfully", user: data as UserProfile }
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to create user" }
  }
}

// Update a user
export async function updateUser(
  userId: string,
  updates: {
    name?: string
    role?: UserRole
    status?: UserStatus
    avatar_url?: string
  },
): Promise<{ success: boolean; message: string; user?: UserProfile }> {
  try {
    const supabase = getSupabase()

    const { data, error } = await supabase
      .from("users")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single()

    if (error) {
      return { success: false, message: error.message }
    }

    return { success: true, message: "User updated successfully", user: data as UserProfile }
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to update user" }
  }
}

// Delete a user
export async function deleteUser(userId: string): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = getSupabase()

    // Delete the user profile
    const { error: profileError } = await supabase.from("users").delete().eq("id", userId)

    if (profileError) {
      return { success: false, message: profileError.message }
    }

    // Delete the auth user
    const { error: authError } = await supabase.auth.admin.deleteUser(userId)

    if (authError) {
      return { success: false, message: authError.message }
    }

    return { success: true, message: "User deleted successfully" }
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to delete user" }
  }
}

// Change user password
export async function changePassword(
  currentPassword: string,
  newPassword: string,
): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = getSupabase()

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      return { success: false, message: error.message }
    }

    return { success: true, message: "Password changed successfully" }
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to change password" }
  }
}

// Request password reset
export async function requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = getSupabase()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      return { success: false, message: error.message }
    }

    return { success: true, message: "Password reset email sent" }
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to send password reset email" }
  }
}

// Complete password reset
export async function completePasswordReset(newPassword: string): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = getSupabase()

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      return { success: false, message: error.message }
    }

    return { success: true, message: "Password reset successfully" }
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to reset password" }
  }
}

// Sign in user
export async function signInUser(
  email: string,
  password: string,
): Promise<{ success: boolean; message: string; user?: UserProfile }> {
  try {
    const supabase = getSupabase()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { success: false, message: error.message }
    }

    // Get the user profile
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.user.id)
      .single()

    if (userError) {
      return { success: false, message: userError.message }
    }

    return { success: true, message: "Signed in successfully", user: userData as UserProfile }
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to sign in" }
  }
}

// Sign out user
export async function signOutUser(): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = getSupabase()

    const { error } = await supabase.auth.signOut()

    if (error) {
      return { success: false, message: error.message }
    }

    return { success: true, message: "Signed out successfully" }
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to sign out" }
  }
}
