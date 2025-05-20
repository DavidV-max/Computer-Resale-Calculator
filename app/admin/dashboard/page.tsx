"use client"

import { useState, useEffect } from "react"
import { BarChart3, Users, Laptop, TrendingUp, TrendingDown, DollarSign, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Bar, BarChart } from "recharts"

// Sample data for charts
const salesData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
  { name: "Jul", value: 7000 },
]

const deviceData = [
  { name: "Laptops", value: 45 },
  { name: "Desktops", value: 30 },
  { name: "Tablets", value: 15 },
  { name: "Phones", value: 10 },
]

const recentValuations = [
  { id: 1, device: "MacBook Pro 2019", value: "$850", date: "2023-05-15", status: "Completed" },
  { id: 2, device: "Dell XPS 13", value: "$650", date: "2023-05-14", status: "Completed" },
  { id: 3, device: "HP Spectre x360", value: "$720", date: "2023-05-14", status: "Completed" },
  { id: 4, device: "Lenovo ThinkPad X1", value: "$580", date: "2023-05-13", status: "Completed" },
  { id: 5, device: "Microsoft Surface Pro", value: "$620", date: "2023-05-12", status: "Completed" },
]

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className={`${isLoading ? "animate-pulse" : ""}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Valuations</p>
                {isLoading ? (
                  <div className="h-9 w-24 bg-gray-200 rounded mt-1"></div>
                ) : (
                  <h3 className="text-3xl font-bold">1,248</h3>
                )}
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            {!isLoading && (
              <div className="mt-4 flex items-center text-sm text-green-600">
                <TrendingUp className="mr-1 h-4 w-4" />
                <span>12% from last month</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className={`${isLoading ? "animate-pulse" : ""}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                {isLoading ? (
                  <div className="h-9 w-16 bg-gray-200 rounded mt-1"></div>
                ) : (
                  <h3 className="text-3xl font-bold">324</h3>
                )}
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
            {!isLoading && (
              <div className="mt-4 flex items-center text-sm text-green-600">
                <TrendingUp className="mr-1 h-4 w-4" />
                <span>8% from last month</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className={`${isLoading ? "animate-pulse" : ""}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Devices Tracked</p>
                {isLoading ? (
                  <div className="h-9 w-16 bg-gray-200 rounded mt-1"></div>
                ) : (
                  <h3 className="text-3xl font-bold">156</h3>
                )}
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Laptop className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            {!isLoading && (
              <div className="mt-4 flex items-center text-sm text-green-600">
                <TrendingUp className="mr-1 h-4 w-4" />
                <span>5% from last month</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className={`${isLoading ? "animate-pulse" : ""}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Valuation</p>
                {isLoading ? (
                  <div className="h-9 w-20 bg-gray-200 rounded mt-1"></div>
                ) : (
                  <h3 className="text-3xl font-bold">$685</h3>
                )}
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            {!isLoading && (
              <div className="mt-4 flex items-center text-sm text-red-600">
                <TrendingDown className="mr-1 h-4 w-4" />
                <span>3% from last month</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Valuation Trends</CardTitle>
                <CardDescription>Monthly valuation trends for the past 7 months</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                {isLoading ? (
                  <div className="h-[300px] w-full bg-gray-100 rounded animate-pulse"></div>
                ) : (
                  <ChartContainer
                    config={{
                      value: {
                        label: "Value",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                )}
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Device Distribution</CardTitle>
                <CardDescription>Distribution of device types in valuations</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[300px] w-full bg-gray-100 rounded animate-pulse"></div>
                ) : (
                  <ChartContainer
                    config={{
                      value: {
                        label: "Value",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={deviceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>Detailed analytics will be available here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded">
                <p className="text-muted-foreground">Advanced analytics coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and view reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded">
                <p className="text-muted-foreground">Report generation coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Valuations */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Valuations</CardTitle>
            <CardDescription>Latest device valuations performed</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search valuations..." className="w-[200px] pl-8 md:w-[300px]" />
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 bg-gray-100 rounded animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left font-medium">Device</th>
                    <th className="pb-2 text-left font-medium">Value</th>
                    <th className="pb-2 text-left font-medium">Date</th>
                    <th className="pb-2 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentValuations.map((valuation) => (
                    <tr key={valuation.id} className="border-b">
                      <td className="py-3">{valuation.device}</td>
                      <td className="py-3">{valuation.value}</td>
                      <td className="py-3">{new Date(valuation.date).toLocaleDateString()}</td>
                      <td className="py-3">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          {valuation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
