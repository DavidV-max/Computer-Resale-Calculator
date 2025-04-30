"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download, BarChart, PieChart, LineChart, TrendingUp } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"

export default function AdminAnalytics() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Analytics Dashboard</CardTitle>
            <CardDescription>View detailed analytics and reports</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Select defaultValue="30days">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" /> Overview
            </TabsTrigger>
            <TabsTrigger value="devices" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" /> Device Types
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" /> Value Trends
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" /> User Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Valuations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,845</div>
                  <p className="text-xs text-muted-foreground">+18% from last month</p>
                  <div className="mt-4 h-[80px] w-full bg-slate-100 rounded-md"></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,257</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                  <div className="mt-4 h-[80px] w-full bg-slate-100 rounded-md"></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3m 42s</div>
                  <p className="text-xs text-muted-foreground">-8% from last month</p>
                  <div className="mt-4 h-[80px] w-full bg-slate-100 rounded-md"></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24.8%</div>
                  <p className="text-xs text-muted-foreground">+5% from last month</p>
                  <div className="mt-4 h-[80px] w-full bg-slate-100 rounded-md"></div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Daily Valuations</CardTitle>
                <CardDescription>Number of valuations per day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-slate-100 rounded-md flex items-center justify-center">
                  <p className="text-slate-500">Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devices" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Device Type Distribution</CardTitle>
                  <CardDescription>Breakdown by device category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-slate-100 rounded-md flex items-center justify-center">
                    <p className="text-slate-500">Pie Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Brand Distribution</CardTitle>
                  <CardDescription>Most popular brands</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-slate-100 rounded-md flex items-center justify-center">
                    <p className="text-slate-500">Bar Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Device Age Analysis</CardTitle>
                <CardDescription>Distribution of device ages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-slate-100 rounded-md flex items-center justify-center">
                  <p className="text-slate-500">Histogram Placeholder</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Value Trends Over Time</CardTitle>
                <CardDescription>Average resale value by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full bg-slate-100 rounded-md flex items-center justify-center">
                  <p className="text-slate-500">Line Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Depreciation Analysis</CardTitle>
                  <CardDescription>Value retention by device type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-slate-100 rounded-md flex items-center justify-center">
                    <p className="text-slate-500">Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Price Range Distribution</CardTitle>
                  <CardDescription>Valuation price ranges</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-slate-100 rounded-md flex items-center justify-center">
                    <p className="text-slate-500">Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Daily active users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-slate-100 rounded-md flex items-center justify-center">
                  <p className="text-slate-500">Line Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>Users by location</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-slate-100 rounded-md flex items-center justify-center">
                    <p className="text-slate-500">Map Placeholder</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>User Retention</CardTitle>
                  <CardDescription>Return visitor analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-slate-100 rounded-md flex items-center justify-center">
                    <p className="text-slate-500">Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
