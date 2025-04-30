"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

export default function SiteHeader() {
  const pathname = usePathname()
  const isAdminPage = pathname.startsWith("/admin")

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Resale Calculator
            </span>
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          {!isAdminPage ? (
            <Link href="/admin/login">
              <Button variant="outline" size="sm" className="gap-2">
                <Lock className="h-3.5 w-3.5" />
                Admin Login
              </Button>
            </Link>
          ) : (
            <Link href="/">
              <Button variant="outline" size="sm">
                Back to Calculator
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
