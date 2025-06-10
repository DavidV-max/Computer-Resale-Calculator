"use client"

import { getSupabase } from "./supabase"
import { useEffect, useState } from "react"

// Subscribe to device changes
export function useDeviceChanges() {
  const [devices, setDevices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = getSupabase()

    // Initial fetch
    const fetchDevices = async () => {
      try {
        const { data, error } = await supabase.from("devices").select("*").order("name")

        if (error) {
          throw error
        }

        setDevices(data || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDevices()

    // Set up real-time subscription
    const subscription = supabase
      .channel("devices-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "devices",
        },
        (payload) => {
          // Handle different change types
          switch (payload.eventType) {
            case "INSERT":
              setDevices((prev) => [...prev, payload.new])
              break
            case "UPDATE":
              setDevices((prev) => prev.map((device) => (device.id === payload.new.id ? payload.new : device)))
              break
            case "DELETE":
              setDevices((prev) => prev.filter((device) => device.id !== payload.old.id))
              break
          }
        },
      )
      .subscribe()

    // Clean up subscription
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { devices, loading, error }
}

// Subscribe to valuation changes
export function useValuationChanges(limit = 10) {
  const [valuations, setValuations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = getSupabase()

    // Initial fetch
    const fetchValuations = async () => {
      try {
        const { data, error } = await supabase
          .from("valuations")
          .select(`
            *,
            devices (name, type, brand, model),
            users (name, email)
          `)
          .order("created_at", { ascending: false })
          .limit(limit)

        if (error) {
          throw error
        }

        setValuations(data || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchValuations()

    // Set up real-time subscription
    const subscription = supabase
      .channel("valuations-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "valuations",
        },
        async (payload) => {
          // Fetch the complete valuation with related data
          const { data, error } = await supabase
            .from("valuations")
            .select(`
            *,
            devices (name, type, brand, model),
            users (name, email)
          `)
            .eq("id", payload.new.id)
            .single()

          if (!error && data) {
            setValuations((prev) => [data, ...prev.slice(0, limit - 1)])
          }
        },
      )
      .subscribe()

    // Clean up subscription
    return () => {
      subscription.unsubscribe()
    }
  }, [limit])

  return { valuations, loading, error }
}

// Subscribe to user presence
export function useUserPresence() {
  const [onlineUsers, setOnlineUsers] = useState<Record<string, any>>({})

  useEffect(() => {
    const supabase = getSupabase()

    // Set up presence channel
    const channel = supabase.channel("online-users", {
      config: {
        presence: {
          key: supabase.auth.getUser() ? supabase.auth.getUser().data.user?.id : "anonymous",
        },
      },
    })

    // Track presence changes
    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState()
        setOnlineUsers(state)
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        setOnlineUsers((prev) => ({
          ...prev,
          [key]: newPresences,
        }))
      })
      .on("presence", { event: "leave" }, ({ key }) => {
        setOnlineUsers((prev) => {
          const newState = { ...prev }
          delete newState[key]
          return newState
        })
      })
      .subscribe()

    // Track user's own presence
    const updatePresence = () => {
      channel.track({
        online_at: new Date().toISOString(),
        user_agent: navigator.userAgent,
      })
    }

    // Update presence immediately and every 5 minutes
    updatePresence()
    const interval = setInterval(updatePresence, 5 * 60 * 1000)

    // Clean up
    return () => {
      clearInterval(interval)
      channel.unsubscribe()
    }
  }, [])

  return onlineUsers
}
