"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, CheckCircle, Info, XCircle, Download, RefreshCw, Search, Filter, Calendar } from "lucide-react"

export default function SystemLogs() {
  const [logType, setLogType] = useState("all")
  const [dateRange, setDateRange] = useState("7days")

  // Mock log data
  const logs = [
    {
      id: 1,
      timestamp: "2023-04-29 14:32:45",
      type: "info",
      message: "User admin logged in successfully",
      source: "Authentication",
      ip: "192.168.1.105",
    },
    {
      id: 2,
      timestamp: "2023-04-29 13:15:22",
      type: "warning",
      message: "High CPU usage detected (85%)",
      source: "System Monitor",
      ip: "Server",
    },
    {
      id: 3,
      timestamp: "2023-04-29 12:45:10",
      type: "error",
      message: "Database connection timeout",
      source: "Database",
      ip: "Server",
    },
    {
      id: 4,
      timestamp: "2023-04-29 11:30:05",
      type: "success",
      message: "Backup completed successfully",
      source: "Backup System",
      ip: "Server",
    },
    {
      id: 5,
      timestamp: "2023-04-29 10:22:18",
      type: "info",
      message: "New device added: Dell XPS 13",
      source: "Device Management",
      ip: "192.168.1.110",
    },
    {
      id: 6,
      timestamp: "2023-04-29 09:15:33",
      type: "warning",
      message: "Failed login attempt",
      source: "Authentication",
      ip: "192.168.1.120",
    },
    {
      id: 7,
      timestamp: "2023-04-28 18:42:11",
      type: "info",
      message: "System settings updated",
      source: "Settings",
      ip: "192.168.1.105",
    },
    {
      id: 8,
      timestamp: "2023-04-28 16:30:27",
      type: "success",
      message: "User john.doe@example.com created",
      source: "User Management",
      ip: "192.168.1.105",
    },
    {
      id: 9,
      timestamp: "2023-04-28 14:15:09",
      type: "error",
      message: "API rate limit exceeded",
      source: "API Gateway",
      ip: "192.168.1.115",
    },
    {
      id: 10,
      timestamp: "2023-04-28 11:05:44",
      type: "info",
      message: "Scheduled maintenance started",
      source: "System",
      ip: "Server",
    },
  ]

  // Filter logs based on selected type
  const filteredLogs = logType === "all" ? logs : logs.filter((log) => log.type === logType)

  const getLogBadge = (type: string) => {
    switch (type) {
      case "info":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <Info className="h-3 w-3 mr-1" /> Info
          </Badge>
        )
      case "warning":
        return (
          <Badge className="bg-amber-500 hover:bg-amber-600">
            <AlertTriangle className="h-3 w-3 mr-1" /> Warning
          </Badge>
        )
      case "error":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <XCircle className="h-3 w-3 mr-1" /> Error
          </Badge>
        )
      case "success":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" /> Success
          </Badge>
        )
      default:
        return <Badge>{type}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>System Logs</CardTitle>
            <CardDescription>View and analyze system activity logs</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="gap-1">
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-3.5 w-3.5" /> Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-slate-400" />
            <Input placeholder="Search logs..." className="w-64" />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <Select value={logType} onValueChange={setLogType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="success">Success</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-slate-400" />
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="w-[40%]">Message</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                  <TableCell>{getLogBadge(log.type)}</TableCell>
                  <TableCell>{log.message}</TableCell>
                  <TableCell>{log.source}</TableCell>
                  <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium">{filteredLogs.length}</span> of{" "}
            <span className="font-medium">{logs.length}</span> logs
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
