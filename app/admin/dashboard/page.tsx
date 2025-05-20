import type { Metadata } from "next"
import AdminDashboard from "@/components/admin/dashboard"

export const metadata: Metadata = {
  title: "Admin Dashboard | Computer Resale Calculator",
  description: "Admin dashboard for the Computer Resale Calculator application",
}

export default function DashboardPage() {
  return <AdminDashboard />
}
