"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Filter, AlertTriangle, CheckCircle, Info, AlertCircle, Clock } from "lucide-react"

// Mock log data
const logs = [
  {
    id: 1,
    timestamp: "2023-05-20T14:32:15",
    level: "info",
    message: "User login successful",
    source: "Authentication",
    user: "john.doe@example.com",
  },
  {
    id: 2,
    timestamp: "2023-05-20T14:30:05",
    level: "warning",
    message: "Failed login attempt",
    source: "Authentication",
    user: "unknown",
  },
  {
    id: 3,
    timestamp: "2023-05-20T14:28:30",
    level: "error",
    message: "Database connection failed",
    source: "Database",
    user: "system",
  },
  {
    id: 4,
    timestamp: "2023-05-20T14:25:12",
    level: "info",
    message: "New device valuation completed",
    source: "Valuation",
    user: "jane.smith@example.com",
  },
  {
    id: 5,
    timestamp: "2023-05-20T14:20:45",
    level: "info",
    message: "System backup completed",
    source: "Maintenance",
    user: "system",
  },
  {
    id: 6,
    timestamp: "2023-05-20T14:15:22",
    level: "warning",
    message: "High CPU usage detected",
    source: "Monitoring",
    user: "system",
  },
  {
    id: 7,
    timestamp: "2023-05-20T14:10:18",
    level: "info",
    message: "User profile updated",
    source: "User Management",
    user: "robert.johnson@example.com",
  },
  {
    id: 8,
    timestamp: "2023-05-20T14:05:33",
    level: "error",
    message: "Payment processing failed",
    source: "Billing",
    user: "emily.davis@example.com",
  },
]

export default function SystemLogs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")

  const filteredLogs = logs.filter(
    (log) =>
      (levelFilter === "all" || log.level === levelFilter) &&
      (log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Info className="h-4 w-4 text-slate-500" />
    }
  }

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "info":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Info</Badge>
      case "warning":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Warning</Badge>
      case "error":
        return <Badge className="bg-red-500 hover:bg-red-600">Error</Badge>
      case "success":
        return <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">System Logs</h2>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Logs</CardTitle>
          <CardDescription>System events and user activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search logs..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="grid grid-cols-5 bg-slate-50 p-3 text-xs font-medium">
                <div>Timestamp</div>
                <div>Level</div>
                <div>Message</div>
                <div>Source</div>
                <div>User</div>
              </div>
              {filteredLogs.map((log) => (
                <div key={log.id} className="grid grid-cols-5 border-t p-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-slate-500" />
                    <span>{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getLevelIcon(log.level)}
                    {getLevelBadge(log.level)}
                  </div>
                  <div className="flex items-center">{log.message}</div>
                  <div className="flex items-center">{log.source}</div>
                  <div className="flex items-center">{log.user}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Log Summary</CardTitle>
            <CardDescription>Overview of system log activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Info Logs</span>
                </div>
                <span className="font-medium">{logs.filter((log) => log.level === "info").length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <span className="text-sm">Warning Logs</span>
                </div>
                <span className="font-medium">{logs.filter((log) => log.level === "warning").length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Error Logs</span>
                </div>
                <span className="font-medium">{logs.filter((log) => log.level === "error").length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Success Logs</span>
                </div>
                <span className="font-medium">{logs.filter((log) => log.level === "success").length}</span>
              </div>
              <div className="h-[100px] w-full bg-slate-100 rounded-md flex items-center justify-center mt-4">
                <span className="text-xs text-slate-500">Log Distribution Chart</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Errors</CardTitle>
            <CardDescription>Latest system errors that need attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {logs
                .filter((log) => log.level === "error")
                .slice(0, 3)
                .map((log, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="bg-red-100 p-1.5 rounded-full">
                      <AlertCircle className="h-3.5 w-3.5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{log.message}</p>
                      <p className="text-xs text-slate-500">
                        {log.source} • {new Date(log.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              {logs.filter((log) => log.level === "error").length === 0 && (
                <div className="flex items-center justify-center h-[100px] bg-slate-50 rounded-md">
                  <div className="text-center">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">No errors found</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
