"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Users, PieChart, Package, Laptop, Server, Monitor, Printer, Network } from "lucide-react"
import { logoutAdmin } from "@/lib/auth"
import AdminHeader from "./header"
import AdminSidebar from "./sidebar"
import DeviceManagement from "./device-management"
import UserManagement from "./user-management"
import SystemSettings from "./system-settings"
import AdminAnalytics from "./analytics"

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  const handleLogout = async () => {
    await logoutAdmin()
    router.push("/admin/login")
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-100">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader onLogout={handleLogout} />

        <main className="flex-1 overflow-y-auto p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
                    <Package className="h-4 w-4 text-indigo-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,284</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <Users className="h-4 w-4 text-indigo-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">342</div>
                    <p className="text-xs text-muted-foreground">+7% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Valuations</CardTitle>
                    <BarChart className="h-4 w-4 text-indigo-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,845</div>
                    <p className="text-xs text-muted-foreground">+18% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Value</CardTitle>
                    <PieChart className="h-4 w-4 text-indigo-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$428</div>
                    <p className="text-xs text-muted-foreground">-3% from last month</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Valuations Overview</CardTitle>
                    <CardDescription>Number of device valuations per day for the last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <div className="h-full w-full bg-slate-100 rounded-md flex items-center justify-center">
                      <p className="text-slate-500">Valuation Chart Placeholder</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Device Distribution</CardTitle>
                    <CardDescription>Breakdown of device types valued</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Laptop className="h-4 w-4 mr-2 text-indigo-600" />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">Laptops</p>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 w-[45%]" />
                          </div>
                        </div>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <div className="flex items-center">
                        <Monitor className="h-4 w-4 mr-2 text-violet-600" />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">Desktops</p>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-violet-600 w-[25%]" />
                          </div>
                        </div>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                      <div className="flex items-center">
                        <Server className="h-4 w-4 mr-2 text-blue-600" />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">Servers</p>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 w-[15%]" />
                          </div>
                        </div>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                      <div className="flex items-center">
                        <Network className="h-4 w-4 mr-2 text-green-600" />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">Network</p>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-600 w-[8%]" />
                          </div>
                        </div>
                        <span className="text-sm font-medium">8%</span>
                      </div>
                      <div className="flex items-center">
                        <Printer className="h-4 w-4 mr-2 text-orange-600" />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">Printers</p>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-600 w-[5%]" />
                          </div>
                        </div>
                        <span className="text-sm font-medium">5%</span>
                      </div>
                      <div className="flex items-center">
                        <Monitor className="h-4 w-4 mr-2 text-cyan-600" />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">Monitors</p>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-600 w-[2%]" />
                          </div>
                        </div>
                        <span className="text-sm font-medium">2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <AdminAnalytics />
            </TabsContent>

            <TabsContent value="devices">
              <DeviceManagement />
            </TabsContent>

            <TabsContent value="users">
              <UserManagement />
            </TabsContent>

            <TabsContent value="settings">
              <SystemSettings />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
