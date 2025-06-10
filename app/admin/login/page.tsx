"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Lock, Mail } from "lucide-react"
import { signIn } from "@/lib/auth"

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      console.log("Attempting login with:", email)
      const result = await signIn(email, password)
      console.log("Login result:", result)

      if (result.success && result.user) {
        // For demo purposes, allow any successful login to access admin
        router.push("/admin/dashboard")
      } else {
        setError(result.error || "Invalid email or password")
      }
    } catch (error: any) {
      console.error("Login error:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-sky-50 to-slate-50 p-4">
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
              <Label htmlFor="email" className="text-blue-700">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                <Input
                  id="email"
                  type="text" // Changed from email to text to allow "admin" login
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 border-blue-200 focus:ring-blue-500"
                  placeholder="Enter your email or username"
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 border-blue-200 focus:ring-blue-500"
                  placeholder="Enter your password"
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
            <p className="mt-1">- OR -</p>
            <p>Email: admin@example.com</p>
            <p>Password: admin123</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
