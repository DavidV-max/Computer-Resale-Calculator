import AdminDashboard from "@/components/admin/dashboard"
import { checkAdminSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminDashboardPage() {
  // Double-check authentication on the server
  const isAuthenticated = await checkAdminSession()

  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  return <AdminDashboard />
}
