"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Lock, User } from "lucide-react"

export default function AdminLogin() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Get form data
    const formData = new FormData(e.currentTarget)
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    // Simple demo authentication
    if (username === "admin" && password === "admin123") {
      // Set a cookie to simulate authentication
      document.cookie = "admin_session=authenticated; path=/; max-age=3600"

      // Redirect to dashboard
      window.location.href = "/admin/dashboard"
    } else {
      setError("Invalid username or password")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-blue-50 via-sky-50 to-slate-50 p-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-sky-600 text-white">
          <CardTitle className="text-xl">Admin Portal</CardTitle>
          <CardDescription className="text-blue-100">Sign in to access the admin dashboard</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username" className="text-blue-700">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  className="pl-9 border-blue-200 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-blue-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-9 border-blue-200 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 transition-all duration-300 mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="bg-gradient-to-r from-blue-50 to-sky-50 flex flex-col gap-4">
          <p className="text-xs text-center text-slate-500">
            This portal is restricted to authorized administrators only.
          </p>
          <div className="text-xs text-center text-slate-500 bg-blue-100 p-2 rounded-md">
            <p className="font-medium">Demo Credentials</p>
            <p>Username: admin</p>
            <p>Password: admin123</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
