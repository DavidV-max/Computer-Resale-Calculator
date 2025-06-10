import { initializeStorage } from "./storage-service"

// Initialize Supabase services
export async function initializeSupabase() {
  try {
    console.log("Initializing Supabase services...")

    // Initialize storage buckets
    await initializeStorage()

    console.log("Supabase services initialized successfully")
    return true
  } catch (error) {
    console.error("Failed to initialize Supabase services:", error)
    return false
  }
}

// Add this to your app layout or a server component that runs on startup
export async function runInitialization() {
  if (process.env.NODE_ENV === "production") {
    await initializeSupabase()
  }
}
