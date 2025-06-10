import { getSupabase } from "./supabase"
import type { Database } from "./supabase"

// Get all devices
export async function getAllDevices() {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase.from("devices").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching devices:", error)
      return { success: false, data: [], error: error.message }
    }

    return { success: true, data, error: null }
  } catch (error: any) {
    console.error("Unexpected error fetching devices:", error)
    return { success: false, data: [], error: "Failed to fetch devices" }
  }
}

// Get device by ID
export async function getDeviceById(id: string) {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase.from("devices").select("*").eq("id", id).single()

    if (error) {
      console.error(`Error fetching device ${id}:`, error)
      return { success: false, data: null, error: error.message }
    }

    return { success: true, data, error: null }
  } catch (error: any) {
    console.error(`Unexpected error fetching device ${id}:`, error)
    return { success: false, data: null, error: "Failed to fetch device" }
  }
}

// Create a new device
export async function createDevice(deviceData: Database["public"]["Tables"]["devices"]["Insert"]) {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from("devices")
      .insert({
        ...deviceData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      console.error("Error creating device:", error)
      return { success: false, data: null, error: error.message }
    }

    return { success: true, data: data[0], error: null }
  } catch (error: any) {
    console.error("Unexpected error creating device:", error)
    return { success: false, data: null, error: "Failed to create device" }
  }
}

// Update a device
export async function updateDevice(id: string, deviceData: Database["public"]["Tables"]["devices"]["Update"]) {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from("devices")
      .update({
        ...deviceData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()

    if (error) {
      console.error(`Error updating device ${id}:`, error)
      return { success: false, data: null, error: error.message }
    }

    return { success: true, data: data[0], error: null }
  } catch (error: any) {
    console.error(`Unexpected error updating device ${id}:`, error)
    return { success: false, data: null, error: "Failed to update device" }
  }
}

// Delete a device
export async function deleteDevice(id: string) {
  try {
    const supabase = getSupabase()
    const { error } = await supabase.from("devices").delete().eq("id", id)

    if (error) {
      console.error(`Error deleting device ${id}:`, error)
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (error: any) {
    console.error(`Unexpected error deleting device ${id}:`, error)
    return { success: false, error: "Failed to delete device" }
  }
}

// Get devices by type
export async function getDevicesByType(type: string) {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase.from("devices").select("*").eq("type", type).order("name")

    if (error) {
      console.error(`Error fetching devices of type ${type}:`, error)
      return { success: false, data: [], error: error.message }
    }

    return { success: true, data, error: null }
  } catch (error: any) {
    console.error(`Unexpected error fetching devices of type ${type}:`, error)
    return { success: false, data: [], error: "Failed to fetch devices" }
  }
}

// Get devices by brand
export async function getDevicesByBrand(brand: string) {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase.from("devices").select("*").eq("brand", brand).order("name")

    if (error) {
      console.error(`Error fetching devices of brand ${brand}:`, error)
      return { success: false, data: [], error: error.message }
    }

    return { success: true, data, error: null }
  } catch (error: any) {
    console.error(`Unexpected error fetching devices of brand ${brand}:`, error)
    return { success: false, data: [], error: "Failed to fetch devices" }
  }
}
