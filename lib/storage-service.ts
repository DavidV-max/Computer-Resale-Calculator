import { getSupabase } from "./supabase"

// Define storage buckets
const DEVICE_IMAGES_BUCKET = "device-images"
const USER_AVATARS_BUCKET = "user-avatars"
const DOCUMENTS_BUCKET = "documents"

// Initialize storage buckets
export async function initializeStorage() {
  const supabase = getSupabase()

  // Create device images bucket if it doesn't exist
  const { data: deviceBucket, error: deviceError } = await supabase.storage.createBucket(DEVICE_IMAGES_BUCKET, {
    public: true,
    fileSizeLimit: 5242880, // 5MB
    allowedMimeTypes: ["image/png", "image/jpeg", "image/webp"],
  })

  if (deviceError && deviceError.message !== "Bucket already exists") {
    console.error("Error creating device images bucket:", deviceError)
  }

  // Create user avatars bucket if it doesn't exist
  const { data: avatarBucket, error: avatarError } = await supabase.storage.createBucket(USER_AVATARS_BUCKET, {
    public: true,
    fileSizeLimit: 2097152, // 2MB
    allowedMimeTypes: ["image/png", "image/jpeg", "image/webp"],
  })

  if (avatarError && avatarError.message !== "Bucket already exists") {
    console.error("Error creating user avatars bucket:", avatarError)
  }

  // Create documents bucket if it doesn't exist
  const { data: docBucket, error: docError } = await supabase.storage.createBucket(DOCUMENTS_BUCKET, {
    public: false,
    fileSizeLimit: 10485760, // 10MB
    allowedMimeTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  })

  if (docError && docError.message !== "Bucket already exists") {
    console.error("Error creating documents bucket:", docError)
  }
}

// Upload device image
export async function uploadDeviceImage(file: File, deviceId: string): Promise<string | null> {
  try {
    const supabase = getSupabase()

    // Create a unique file path
    const fileExt = file.name.split(".").pop()
    const filePath = `${deviceId}/${Date.now()}.${fileExt}`

    // Upload the file
    const { data, error } = await supabase.storage.from(DEVICE_IMAGES_BUCKET).upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    })

    if (error) {
      console.error("Error uploading device image:", error)
      return null
    }

    // Get the public URL
    const { data: urlData } = supabase.storage.from(DEVICE_IMAGES_BUCKET).getPublicUrl(data.path)

    return urlData.publicUrl
  } catch (error) {
    console.error("Unexpected error uploading device image:", error)
    return null
  }
}

// Upload user avatar
export async function uploadUserAvatar(file: File, userId: string): Promise<string | null> {
  try {
    const supabase = getSupabase()

    // Create a unique file path
    const fileExt = file.name.split(".").pop()
    const filePath = `${userId}.${fileExt}`

    // Upload the file
    const { data, error } = await supabase.storage.from(USER_AVATARS_BUCKET).upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    })

    if (error) {
      console.error("Error uploading user avatar:", error)
      return null
    }

    // Get the public URL
    const { data: urlData } = supabase.storage.from(USER_AVATARS_BUCKET).getPublicUrl(data.path)

    return urlData.publicUrl
  } catch (error) {
    console.error("Unexpected error uploading user avatar:", error)
    return null
  }
}

// Upload document
export async function uploadDocument(file: File, userId: string): Promise<string | null> {
  try {
    const supabase = getSupabase()

    // Create a unique file path
    const fileExt = file.name.split(".").pop()
    const filePath = `${userId}/${Date.now()}_${file.name}`

    // Upload the file
    const { data, error } = await supabase.storage.from(DOCUMENTS_BUCKET).upload(filePath, file)

    if (error) {
      console.error("Error uploading document:", error)
      return null
    }

    // Return the file path (not public)
    return data.path
  } catch (error) {
    console.error("Unexpected error uploading document:", error)
    return null
  }
}

// Get document download URL (time-limited)
export async function getDocumentUrl(path: string): Promise<string | null> {
  try {
    const supabase = getSupabase()

    const { data, error } = await supabase.storage.from(DOCUMENTS_BUCKET).createSignedUrl(path, 60) // 60 seconds expiry

    if (error) {
      console.error("Error getting document URL:", error)
      return null
    }

    return data.signedUrl
  } catch (error) {
    console.error("Unexpected error getting document URL:", error)
    return null
  }
}

// Delete file
export async function deleteFile(bucket: string, path: string): Promise<boolean> {
  try {
    const supabase = getSupabase()

    const { error } = await supabase.storage.from(bucket).remove([path])

    if (error) {
      console.error(`Error deleting file from ${bucket}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Unexpected error deleting file from ${bucket}:`, error)
    return false
  }
}
