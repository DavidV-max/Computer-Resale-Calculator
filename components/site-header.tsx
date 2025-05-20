"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

export default function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const isAdminPage = pathname.startsWith("/admin")

  const handleAdminLogin = () => {
    // Use window.location for a full page navigation to ensure it works
    window.location.href = "/admin/login"
  }

  const handleBackToCalculator = () => {
    // Use window.location for a full page navigation to ensure it works
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
              Resale Calculator
            </span>
          </a>
        </div>
        <nav className="flex items-center gap-4">
          {!isAdminPage ? (
            <Button variant="outline" size="sm" className="gap-2" onClick={handleAdminLogin}>
              <Lock className="h-3.5 w-3.5" />
              Admin Login
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={handleBackToCalculator}>
              Back to Calculator
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}
