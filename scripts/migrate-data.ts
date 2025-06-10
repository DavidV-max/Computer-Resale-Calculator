import { createClient } from "@supabase/supabase-js"
import { devices as mockDevices } from "../lib/device-data"

// This script should be run with environment variables set
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Admin user to create
const adminUser = {
  email: "admin@example.com",
  password: "admin123", // In production, use a secure password
  name: "Admin User",
  role: "Admin",
}

// Format device data for Supabase
function formatDeviceData(device: any) {
  return {
    name: device.name || `${device.brand} ${device.model || "Device"}`,
    type: device.type || "Unknown",
    brand: device.brand || "Generic",
    model: device.model || "Standard",
    specs: device.specs || {},
    base_value: device.baseValue || 0,
    status: "Active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

// Create admin user
async function createAdminUser() {
  console.log("Creating admin user...")

  // Check if user already exists
  const { data: existingUsers, error: checkError } = await supabase
    .from("users")
    .select("id")
    .eq("email", adminUser.email)
    .limit(1)

  if (checkError) {
    console.error("Error checking for existing admin:", checkError)
    return null
  }

  if (existingUsers && existingUsers.length > 0) {
    console.log("Admin user already exists, skipping creation")
    return existingUsers[0].id
  }

  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: adminUser.email,
    password: adminUser.password,
    email_confirm: true,
  })

  if (authError) {
    console.error("Error creating admin auth user:", authError)
    return null
  }

  // Create user profile
  const { data, error } = await supabase.from("users").insert({
    id: authData.user.id,
    email: adminUser.email,
    name: adminUser.name,
    role: adminUser.role,
    status: "Active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })

  if (error) {
    console.error("Error creating admin user profile:", error)
    return null
  }

  console.log("Admin user created successfully")
  return authData.user.id
}

// Migrate devices
async function migrateDevices() {
  console.log("Migrating devices...")

  // Check if devices already exist
  const { data: existingDevices, error: checkError } = await supabase.from("devices").select("id").limit(1)

  if (checkError) {
    console.error("Error checking for existing devices:", checkError)
    return
  }

  if (existingDevices && existingDevices.length > 0) {
    console.log("Devices already exist, skipping migration")
    return
  }

  const formattedDevices = mockDevices.map(formatDeviceData)

  // Insert in batches of 50 to avoid rate limits
  const batchSize = 50
  for (let i = 0; i < formattedDevices.length; i += batchSize) {
    const batch = formattedDevices.slice(i, i + batchSize)

    const { data, error } = await supabase.from("devices").insert(batch)

    if (error) {
      console.error(`Error migrating devices batch ${i / batchSize + 1}:`, error)
      continue
    }

    console.log(`Migrated devices batch ${i / batchSize + 1} (${batch.length} devices)`)
  }

  console.log("Device migration completed")
}

// Run migration
async function runMigration() {
  try {
    const adminId = await createAdminUser()
    if (adminId) {
      await migrateDevices()
      console.log("Migration completed successfully")
    } else {
      console.error("Migration failed: Could not create admin user")
    }
  } catch (error) {
    console.error("Migration failed:", error)
  }
}

runMigration()
