"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  CalendarIcon,
  Download,
  BarChart,
  PieChart,
  LineChart,
  TrendingUp,
  Map,
  Activity,
  DollarSign,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Laptop,
  Monitor,
  Server,
  Workflow,
  Network,
  Printer,
  ScreenShare,
} from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

export default function AdminAnalytics() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [period, setPeriod] = useState("30days")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Analytics Dashboard</CardTitle>
            <CardDescription>View detailed analytics and reports</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Select defaultValue={period} onValueChange={setPeriod}>
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
            <TabsTrigger value="geography" className="flex items-center gap-2">
              <Map className="h-4 w-4" /> Geography
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Valuations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">2,845</div>
                    <div className="flex items-center text-green-500 text-sm font-medium">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      18%
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">+18% from last month</p>
                  <div className="mt-4 h-[80px] w-full bg-slate-100 rounded-md"></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">1,257</div>
                    <div className="flex items-center text-green-500 text-sm font-medium">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      12%
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                  <div className="mt-4 h-[80px] w-full bg-slate-100 rounded-md"></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">3m 42s</div>
                    <div className="flex items-center text-red-500 text-sm font-medium">
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                      8%
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">-8% from last month</p>
                  <div className="mt-4 h-[80px] w-full bg-slate-100 rounded-md"></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">24.8%</div>
                    <div className="flex items-center text-green-500 text-sm font-medium">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      5%
                    </div>
                  </div>
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

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Top Brands</CardTitle>
                  <CardDescription>Most valued brands</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge className="bg-indigo-600 mr-2">1</Badge>
                        <span>Dell</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">28%</span>
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 w-[28%]" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge className="bg-indigo-600 mr-2">2</Badge>
                        <span>HP</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">22%</span>
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 w-[22%]" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge className="bg-indigo-600 mr-2">3</Badge>
                        <span>Lenovo</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">18%</span>
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 w-[18%]" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge className="bg-indigo-600 mr-2">4</Badge>
                        <span>Apple</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">15%</span>
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 w-[15%]" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge className="bg-indigo-600 mr-2">5</Badge>
                        <span>Cisco</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">8%</span>
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 w-[8%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Where users are coming from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge className="bg-indigo-600 mr-2">1</Badge>
                        <span>Direct</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">42%</span>
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 w-[42%]" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge className="bg-indigo-600 mr-2">2</Badge>
                        <span>Google</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">28%</span>
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 w-[28%]" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge className="bg-indigo-600 mr-2">3</Badge>
                        <span>Social Media</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">15%</span>
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 w-[15%]" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge className="bg-indigo-600 mr-2">4</Badge>
                        <span>Referrals</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">10%</span>
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 w-[10%]" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge className="bg-indigo-600 mr-2">5</Badge>
                        <span>Other</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">5%</span>
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 w-[5%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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

            <div className="grid gap-4 md:grid-cols-7">
              <Card className="md:col-span-1">
                <CardHeader className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <Laptop className="h-8 w-8 text-indigo-600 mb-2" />
                    <CardTitle className="text-lg">Laptops</CardTitle>
                    <p className="text-3xl font-bold mt-2">45%</p>
                  </div>
                </CardHeader>
              </Card>
              <Card className="md:col-span-1">
                <CardHeader className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <Monitor className="h-8 w-8 text-violet-600 mb-2" />
                    <CardTitle className="text-lg">Desktops</CardTitle>
                    <p className="text-3xl font-bold mt-2">25%</p>
                  </div>
                </CardHeader>
              </Card>
              <Card className="md:col-span-1">
                <CardHeader className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <Server className="h-8 w-8 text-blue-600 mb-2" />
                    <CardTitle className="text-lg">Servers</CardTitle>
                    <p className="text-3xl font-bold mt-2">15%</p>
                  </div>
                </CardHeader>
              </Card>
              <Card className="md:col-span-1">
                <CardHeader className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <Workflow className="h-8 w-8 text-green-600 mb-2" />
                    <CardTitle className="text-lg">Workstations</CardTitle>
                    <p className="text-3xl font-bold mt-2">5%</p>
                  </div>
                </CardHeader>
              </Card>
              <Card className="md:col-span-1">
                <CardHeader className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <Network className="h-8 w-8 text-amber-600 mb-2" />
                    <CardTitle className="text-lg">Network</CardTitle>
                    <p className="text-3xl font-bold mt-2">8%</p>
                  </div>
                </CardHeader>
              </Card>
              <Card className="md:col-span-1">
                <CardHeader className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <Printer className="h-8 w-8 text-orange-600 mb-2" />
                    <CardTitle className="text-lg">Printers</CardTitle>
                    <p className="text-3xl font-bold mt-2">5%</p>
                  </div>
                </CardHeader>
              </Card>
              <Card className="md:col-span-1">
                <CardHeader className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <ScreenShare className="h-8 w-8 text-cyan-600 mb-2" />
                    <CardTitle className="text-lg">Monitors</CardTitle>
                    <p className="text-3xl font-bold mt-2">2%</p>
                  </div>
                </CardHeader>
              </Card>
            </div>
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

            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Highest Value Device</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">MacBook Pro 16"</div>
                  <div className="flex items-center mt-1">
                    <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">$1,845</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Apple, 2023 model</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Lowest Depreciation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">Apple Products</div>
                  <div className="flex items-center mt-1">
                    <Percent className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">18% per year</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Best value retention</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Fastest Depreciation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">Budget Laptops</div>
                  <div className="flex items-center mt-1">
                    <Percent className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-red-500 font-medium">42% per year</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Sub-$500 models</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Market Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">Increasing</div>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">+8% overall</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Last 3 months</p>
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

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>User Demographics</CardTitle>
                  <CardDescription>Age and gender distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Age Groups</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">18-24</span>
                          <div className="w-[70%] h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 w-[15%]" />
                          </div>
                          <span className="text-sm font-medium">15%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">25-34</span>
                          <div className="w-[70%] h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 w-[32%]" />
                          </div>
                          <span className="text-sm font-medium">32%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">35-44</span>
                          <div className="w-[70%] h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 w-[28%]" />
                          </div>
                          <span className="text-sm font-medium">28%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">45-54</span>
                          <div className="w-[70%] h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 w-[18%]" />
                          </div>
                          <span className="text-sm font-medium">18%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">55+</span>
                          <div className="w-[70%] h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 w-[7%]" />
                          </div>
                          <span className="text-sm font-medium">7%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Device Usage</CardTitle>
                  <CardDescription>What devices users access from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Desktop</span>
                      <div className="w-[60%] h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 w-[58%]" />
                      </div>
                      <span className="text-sm font-medium">58%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Mobile</span>
                      <div className="w-[60%] h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 w-[32%]" />
                      </div>
                      <span className="text-sm font-medium">32%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tablet</span>
                      <div className="w-[60%] h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 w-[10%]" />
                      </div>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                  <CardDescription>How users interact with the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Activity className="h-4 w-4 mr-2 text-indigo-600" />
                        <span className="text-sm">Avg. Pages/Session</span>
                      </div>
                      <span className="text-sm font-medium">3.2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Activity className="h-4 w-4 mr-2 text-indigo-600" />
                        <span className="text-sm">Bounce Rate</span>
                      </div>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Activity className="h-4 w-4 mr-2 text-indigo-600" />
                        <span className="text-sm">Return Rate</span>
                      </div>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Activity className="h-4 w-4 mr-2 text-indigo-600" />
                        <span className="text-sm">Completion Rate</span>
                      </div>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="geography" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Global User Distribution</CardTitle>
                <CardDescription>Users by country</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full bg-slate-100 rounded-md flex items-center justify-center">
                  <p className="text-slate-500">World Map Placeholder</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Top Countries</CardTitle>
                  <CardDescription>User distribution by country</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge className="bg-indigo-600 mr-2">1</Badge>
                        <span>United States</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">42%</span>
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 w-[42%]" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge className="bg-indigo-600 mr-2">2</Badge>
                        <span>United Kingdom</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">18%</span>
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 w-[18%]" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge className="bg-indigo-600 mr-2">3</Badge>
                        <span>Canada</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">12%</span>
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 w-[12%]" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge className="bg-indigo-600 mr-2">4</Badge>
                        <span>Australia</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">8%</span>
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 w-[8%]" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge className="bg-indigo-600 mr-2">5</Badge>
                        <span>Germany</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">6%</span>
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 w-[6%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Regional Analysis</CardTitle>
                  <CardDescription>User distribution by region</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-slate-100 rounded-md flex items-center justify-center">
                    <p className="text-slate-500">Regional Chart Placeholder</p>
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
