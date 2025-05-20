"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, Users, Laptop, Settings, Menu, X, Home, LogOut } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home, current: pathname === "/admin/dashboard" },
    {
      name: "Analytics",
      href: "/admin/dashboard/analytics",
      icon: BarChart3,
      current: pathname === "/admin/dashboard/analytics",
    },
    { name: "Users", href: "/admin/dashboard/users", icon: Users, current: pathname === "/admin/dashboard/users" },
    {
      name: "Devices",
      href: "/admin/dashboard/devices",
      icon: Laptop,
      current: pathname === "/admin/dashboard/devices",
    },
    {
      name: "Settings",
      href: "/admin/dashboard/settings",
      icon: Settings,
      current: pathname === "/admin/dashboard/settings",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 bg-gray-900/80 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b">
          <div className="flex items-center">
            <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2">
              <path
                d="M256.1 0C255.9 101.9 254.2 122.8 220.7 156.1C215.3 161.5 208.8 162.1 203.4 158.5C198 154.9 196.1 148.8 198.5 142.6C206.9 120.9 210.1 98.7 210.1 76.8C210.1 76.8 185.7 94.1 180.3 133.6C179.5 139.6 175.3 144.4 169.5 145.8C163.7 147.2 157.6 144.9 154.2 139.9C143.5 124.2 138.7 105.7 138.7 87.1C138.7 87.1 120.6 105.9 120.6 145.8C120.6 152.6 115.3 158.3 108.5 159C101.7 159.7 95.3 155.9 93.1 149.4C84.7 125.6 83.1 100.7 88.5 76.8C88.5 76.8 65.7 95.8 65.7 134.9C65.7 141.7 60.4 147.4 53.6 148.1C46.8 148.8 40.4 145 38.2 138.5C29.8 114.7 28.2 89.8 33.6 65.9C33.6 65.9 10.8 84.9 10.8 124C10.8 130.8 5.5 136.5 0 137.2V169.1C0 169.1 33.6 169.1 33.6 196.8C33.6 224.5 0 224.5 0 252.2C0 279.9 33.6 279.9 33.6 307.6C33.6 335.3 0 335.3 0 363C0 390.7 33.6 390.7 33.6 418.4C33.6 446.1 0 446.1 0 473.8V512H512V473.8C512 446.1 478.4 446.1 478.4 418.4C478.4 390.7 512 390.7 512 363C512 335.3 478.4 335.3 478.4 307.6C478.4 279.9 512 279.9 512 252.2C512 224.5 478.4 224.5 478.4 196.8C478.4 169.1 512 169.1 512 169.1V137.2C506.5 136.5 501.2 130.8 501.2 124C501.2 84.9 478.4 65.9 478.4 65.9C483.8 89.8 482.2 114.7 473.8 138.5C471.6 145 465.2 148.8 458.4 148.1C451.6 147.4 446.3 141.7 446.3 134.9C446.3 95.8 423.5 76.8 423.5 76.8C428.9 100.7 427.3 125.6 418.9 149.4C416.7 155.9 410.3 159.7 403.5 159C396.7 158.3 391.4 152.6 391.4 145.8C391.4 105.9 373.3 87.1 373.3 87.1C373.3 105.7 368.5 124.2 357.8 139.9C354.4 144.9 348.3 147.2 342.5 145.8C336.7 144.4 332.5 139.6 331.7 133.6C326.3 94.1 301.9 76.8 301.9 76.8C301.9 98.7 305.1 120.9 313.5 142.6C315.9 148.8 314 154.9 308.6 158.5C303.2 162.1 296.7 161.5 291.3 156.1C257.8 122.8 256.1 101.9 256.1 0H256.1Z"
                fill="#D80621"
              />
            </svg>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
              Admin Panel
            </span>
          </div>
          <button type="button" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                item.current ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className={`h-5 w-5 ${item.current ? "text-blue-600" : "text-gray-400"}`} />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full border-t p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="h-5 w-5 text-gray-400" />
            Logout
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        <div className="sticky top-0 z-10 flex h-16 items-center gap-2 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
          <button type="button" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {navigation.find((item) => item.current)?.name || "Admin Dashboard"}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">A</div>
                  <span className="hidden md:block text-sm font-medium text-gray-700">Admin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
