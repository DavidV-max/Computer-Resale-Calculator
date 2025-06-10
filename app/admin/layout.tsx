import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Calculator } from "lucide-react"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Admin Panel | Computer Resale Calculator",
  description: "Admin panel for managing the Computer Resale Calculator application",
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Very top admin panel header with calculator icon */}
        <div className="bg-slate-800 text-white p-2 flex items-center">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-white" />
            <span className="font-medium">Admin Panel</span>
          </div>

          {/* Timestamp to verify deployment */}
          <div className="ml-auto text-xs opacity-70">Updated: {new Date().toISOString()}</div>
        </div>

        {children}
      </body>
    </html>
  )
}
