import { getSupabase } from "./supabase"
import type { Database } from "./supabase"

// Get all users
export async function getAllUsers() {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching users:", error)
      return { success: false, data: [], error: error.message }
    }

    return { success: true, data, error: null }
  } catch (error) {
    console.error("Unexpected error fetching users:", error)
    return { success: false, data: [], error: "Failed to fetch users" }
  }
}

// Get user by ID
export async function getUserById(id: string) {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase.from("users").select("*").eq("id", id).single()

    if (error) {
      console.error(`Error fetching user ${id}:`, error)
      return { success: false, data: null, error: error.message }
    }

    return { success: true, data, error: null }
  } catch (error) {
    console.error(`Unexpected error fetching user ${id}:`, error)
    return { success: false, data: null, error: "Failed to fetch user" }
  }
}

// Create a new user
export async function createUser(userData: Database["public"]["Tables"]["users"]["Insert"]) {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase.from("users").insert(userData).select()

    if (error) {
      console.error("Error creating user:", error)
      return { success: false, data: null, error: error.message }
    }

    return { success: true, data: data[0], error: null }
  } catch (error) {
    console.error("Unexpected error creating user:", error)
    return { success: false, data: null, error: "Failed to create user" }
  }
}

// Update a user
export async function updateUser(id: string, userData: Database["public"]["Tables"]["users"]["Update"]) {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase.from("users").update(userData).eq("id", id).select()

    if (error) {
      console.error(`Error updating user ${id}:`, error)
      return { success: false, data: null, error: error.message }
    }

    return { success: true, data: data[0], error: null }
  } catch (error) {
    console.error(`Unexpected error updating user ${id}:`, error)
    return { success: false, data: null, error: "Failed to update user" }
  }
}

// Delete a user
export async function deleteUser(id: string) {
  try {
    const supabase = getSupabase()
    const { error } = await supabase.from("users").delete().eq("id", id)

    if (error) {
      console.error(`Error deleting user ${id}:`, error)
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error(`Unexpected error deleting user ${id}:`, error)
    return { success: false, error: "Failed to delete user" }
  }
}
