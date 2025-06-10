"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Settings, Package, BarChart3, FileText, User, Calculator } from "lucide-react"

interface AdminSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, href: "/admin/dashboard" },
    { id: "analytics", label: "Analytics", icon: BarChart3, href: "/admin/dashboard/analytics" },
    { id: "devices", label: "Devices", icon: Package, href: "/admin/dashboard/devices" },
    { id: "users", label: "Users", icon: Users, href: "/admin/dashboard/users" },
    { id: "settings", label: "Settings", icon: Settings, href: "/admin/dashboard/settings" },
    { id: "logs", label: "System Logs", icon: FileText, href: "#" },
    { id: "profile", label: "Profile", icon: User, href: "#" },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      {/* Added calculator icon at the top of sidebar */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded-full">
            <Calculator className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Calculator</h2>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              activeTab === item.id
                ? "bg-indigo-50 text-indigo-600 font-medium"
                : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50",
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
