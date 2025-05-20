"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, Users, Package, Settings, LogOut, Home, ChevronRight, Bell, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AdminSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/admin/dashboard" },
    { id: "analytics", label: "Analytics", icon: BarChart, href: "/admin/dashboard/analytics" },
    { id: "devices", label: "Device Management", icon: Package, href: "/admin/dashboard/devices" },
    { id: "users", label: "User Management", icon: Users, href: "/admin/dashboard/users" },
    { id: "settings", label: "System Settings", icon: Settings, href: "/admin/dashboard/settings" },
  ]

  const handleLogout = () => {
    // Clear the authentication cookie
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    // Redirect to login page
    window.location.href = "/admin/login"
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
          Admin Portal
        </h2>
        <p className="text-xs text-slate-500">Computer Resale Calculator</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors",
                    isActive ? "bg-blue-100 text-blue-700 font-medium" : "text-slate-600 hover:bg-gray-100",
                  )}
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.label}
                  {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Support</h3>
          <ul className="mt-2 space-y-1">
            <li>
              <button className="flex items-center w-full px-3 py-2 text-sm rounded-md text-slate-600 hover:bg-gray-100">
                <HelpCircle className="h-4 w-4 mr-3" />
                Help Center
              </button>
            </li>
            <li>
              <button className="flex items-center w-full px-3 py-2 text-sm rounded-md text-slate-600 hover:bg-gray-100">
                <Bell className="h-4 w-4 mr-3" />
                Notifications
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">3</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-4 w-4 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
