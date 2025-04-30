"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Users,
  PieChart,
  Package,
  Laptop,
  Server,
  Monitor,
  Printer,
  Network,
  TrendingUp,
  Clock,
  Calendar,
  Globe,
  AlertTriangle,
  CheckCircle,
  Activity,
} from "lucide-react"
import { logoutAdmin } from "@/lib/auth"
import AdminHeader from "./header"
import AdminSidebar from "./sidebar"
import DeviceManagement from "./device-management"
import UserManagement from "./user-management"
import SystemSettings from "./system-settings"
import AdminAnalytics from "./analytics"
import SystemLogs from "./system-logs"
import ProfileSettings from "./profile-settings"

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
                    <div className="mt-2 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 w-[65%]" />
                    </div>
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
                    <div className="mt-2 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 w-[42%]" />
                    </div>
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
                    <div className="mt-2 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 w-[78%]" />
                    </div>
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
                    <div className="mt-2 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 w-[35%]" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-2">
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
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest system activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-indigo-100 p-1.5 rounded-full">
                          <Users className="h-3.5 w-3.5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">New user registered</p>
                          <p className="text-xs text-slate-500">10 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 p-1.5 rounded-full">
                          <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Database backup completed</p>
                          <p className="text-xs text-slate-500">25 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-amber-100 p-1.5 rounded-full">
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">System update available</p>
                          <p className="text-xs text-slate-500">1 hour ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-1.5 rounded-full">
                          <Activity className="h-3.5 w-3.5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">High traffic detected</p>
                          <p className="text-xs text-slate-500">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Top Device Brand</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Dell</div>
                    <p className="text-xs text-muted-foreground">28% of all valuations</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Most Valued Device</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">MacBook Pro</div>
                    <p className="text-xs text-muted-foreground">Avg. value: $1,245</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">User Retention</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">68%</div>
                    <p className="text-xs text-muted-foreground">+5% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">System Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">Excellent</div>
                    <p className="text-xs text-muted-foreground">All systems operational</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
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
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>System Metrics</CardTitle>
                    <CardDescription>Performance and usage statistics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-indigo-600" />
                          <span className="text-sm">Response Time</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">245ms</span>
                          <TrendingUp className="h-4 w-4 ml-1 text-green-500" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-indigo-600" />
                          <span className="text-sm">Active Sessions</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">48</span>
                          <TrendingUp className="h-4 w-4 ml-1 text-green-500" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
                          <span className="text-sm">Daily Valuations</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">124</span>
                          <TrendingUp className="h-4 w-4 ml-1 text-green-500" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-2 text-indigo-600" />
                          <span className="text-sm">Traffic Sources</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">12 countries</span>
                        </div>
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

            <TabsContent value="logs">
              <SystemLogs />
            </TabsContent>

            <TabsContent value="profile">
              <ProfileSettings />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
