import type { Metadata } from "next"
import AdminDashboard from "@/components/admin/dashboard"
import { Calculator } from "lucide-react"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Computer Resale Calculator Admin Dashboard",
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      {/* Added Calculator Image Banner */}
      <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center gap-4 mb-4">
        <div className="flex items-center justify-center bg-indigo-100 p-4 rounded-full">
          <Calculator className="h-12 w-12 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-indigo-600">Computer Resale Calculator</h2>
          <p className="text-gray-500">Admin Dashboard - Updated Version</p>
        </div>
      </div>

      <AdminDashboard />
    </div>
  )
}
