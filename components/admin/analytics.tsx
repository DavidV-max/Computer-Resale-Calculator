"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { BarChart, PieChart, LineChart, TrendingUp, DollarSign, TrendingDown } from "lucide-react"
import { useState } from "react"

export default function AdminAnalytics() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [period, setPeriod] = useState("30days")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="30days">
            <TabsList>
              <TabsTrigger value="7days">7 days</TabsTrigger>
              <TabsTrigger value="30days">30 days</TabsTrigger>
              <TabsTrigger value="90days">90 days</TabsTrigger>
              <TabsTrigger value="12months">12 months</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Valuations</CardTitle>
            <BarChart className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,845</div>
            <div className="flex items-center pt-1 text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+18% from last period</span>
            </div>
            <div className="mt-4 h-[60px] w-full bg-slate-100 rounded-md flex items-center justify-center">
              <span className="text-xs text-slate-500">Valuation Trend Chart</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Value</CardTitle>
            <DollarSign className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$428</div>
            <div className="flex items-center pt-1 text-xs text-red-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              <span>-3% from last period</span>
            </div>
            <div className="mt-4 h-[60px] w-full bg-slate-100 rounded-md flex items-center justify-center">
              <span className="text-xs text-slate-500">Value Trend Chart</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
            <LineChart className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <div className="flex items-center pt-1 text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+12% from last period</span>
            </div>
            <div className="mt-4 h-[60px] w-full bg-slate-100 rounded-md flex items-center justify-center">
              <span className="text-xs text-slate-500">User Trend Chart</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <PieChart className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.8%</div>
            <div className="flex items-center pt-1 text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+2.4% from last period</span>
            </div>
            <div className="mt-4 h-[60px] w-full bg-slate-100 rounded-md flex items-center justify-center">
              <span className="text-xs text-slate-500">Conversion Chart</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Valuation Trends</CardTitle>
            <CardDescription>Daily valuations over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-slate-100 rounded-md flex items-center justify-center">
              <span className="text-slate-500">Valuation Trend Chart</span>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Device Value Distribution</CardTitle>
            <CardDescription>Value ranges of devices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-slate-100 rounded-md flex items-center justify-center">
              <span className="text-slate-500">Value Distribution Chart</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Device Types</CardTitle>
            <CardDescription>Most valued device categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full bg-slate-100 rounded-md flex items-center justify-center">
              <span className="text-slate-500">Device Types Chart</span>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Brands</CardTitle>
            <CardDescription>Most valued device brands</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full bg-slate-100 rounded-md flex items-center justify-center">
              <span className="text-slate-500">Brands Chart</span>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>User Demographics</CardTitle>
            <CardDescription>User location and device usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full bg-slate-100 rounded-md flex items-center justify-center">
              <span className="text-slate-500">Demographics Chart</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Valuation History</CardTitle>
          <CardDescription>Recent device valuations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 bg-slate-50 p-3 text-xs font-medium">
              <div>Date</div>
              <div>Device Type</div>
              <div>Brand/Model</div>
              <div>Specifications</div>
              <div>Estimated Value</div>
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="grid grid-cols-5 border-t p-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-slate-500" />
                  <span>{new Date(Date.now() - i * 86400000).toLocaleDateString()}</span>
                </div>
                <div>Laptop</div>
                <div>Dell XPS 15</div>
                <div>i7, 16GB RAM, 512GB SSD</div>
                <div className="font-medium">${Math.floor(400 + Math.random() * 600)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
