"use client"
import { BarChart, Users, Database, Settings, LogOut, Home, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface AdminSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  onLogout: () => void
}

export default function AdminSidebar({ activeTab, setActiveTab, onLogout }: AdminSidebarProps) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "analytics", label: "Analytics", icon: BarChart },
    { id: "devices", label: "Device Management", icon: Database },
    { id: "users", label: "User Management", icon: Users },
    { id: "settings", label: "System Settings", icon: Settings },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          Admin Portal
        </h2>
        <p className="text-xs text-slate-500">Computer Resale Calculator</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors",
                  activeTab === item.id
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "text-slate-600 hover:bg-gray-100",
                )}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
                {activeTab === item.id && <ChevronRight className="h-4 w-4 ml-auto" />}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-4 w-4 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
