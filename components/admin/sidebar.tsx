"use client"
import {
  BarChart,
  Users,
  Database,
  Settings,
  LogOut,
  Home,
  ChevronRight,
  FileText,
  Bell,
  User,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { logoutAdmin } from "@/lib/auth"

interface AdminSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await logoutAdmin()
    router.push("/admin/login")
  }

  const menuItems = [
    { id: "overview", label: "Dashboard", icon: Home },
    { id: "analytics", label: "Analytics", icon: BarChart },
    { id: "devices", label: "Device Management", icon: Database },
    { id: "users", label: "User Management", icon: Users },
    { id: "logs", label: "System Logs", icon: FileText },
    { id: "settings", label: "System Settings", icon: Settings },
    { id: "profile", label: "Profile Settings", icon: User },
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
