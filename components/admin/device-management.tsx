"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  MoreVertical,
  PlusCircle,
  Filter,
  Download,
  Edit,
  Trash,
  Eye,
  Laptop,
  Monitor,
  Server,
  Printer,
} from "lucide-react"

// Mock device data
const devices = [
  {
    id: 1,
    name: "Dell XPS 15",
    type: "laptop",
    brand: "Dell",
    specs: "i7, 16GB RAM, 512GB SSD",
    baseValue: 850,
    status: "active",
  },
  {
    id: 2,
    name: "HP EliteDesk 800",
    type: "desktop",
    brand: "HP",
    specs: "i5, 8GB RAM, 256GB SSD",
    baseValue: 450,
    status: "active",
  },
  {
    id: 3,
    name: "Dell PowerEdge R740",
    type: "server",
    brand: "Dell",
    specs: "Xeon, 64GB RAM, 2TB SSD",
    baseValue: 2200,
    status: "active",
  },
  {
    id: 4,
    name: "Cisco Catalyst 9300",
    type: "network",
    brand: "Cisco",
    specs: "48-port, PoE+",
    baseValue: 3500,
    status: "inactive",
  },
  {
    id: 5,
    name: "HP LaserJet Pro",
    type: "printer",
    brand: "HP",
    specs: "Color, Wireless",
    baseValue: 320,
    status: "active",
  },
  {
    id: 6,
    name: "Dell UltraSharp U2720Q",
    type: "monitor",
    brand: "Dell",
    specs: "27-inch, 4K",
    baseValue: 380,
    status: "active",
  },
  {
    id: 7,
    name: "Lenovo ThinkPad X1",
    type: "laptop",
    brand: "Lenovo",
    specs: "i7, 16GB RAM, 1TB SSD",
    baseValue: 950,
    status: "active",
  },
  {
    id: 8,
    name: "Apple MacBook Pro",
    type: "laptop",
    brand: "Apple",
    specs: "M1, 16GB RAM, 512GB SSD",
    baseValue: 1200,
    status: "active",
  },
]

export default function DeviceManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "laptop":
        return <Laptop className="h-4 w-4 text-indigo-600" />
      case "desktop":
        return <Monitor className="h-4 w-4 text-violet-600" />
      case "server":
        return <Server className="h-4 w-4 text-blue-600" />
      case "printer":
        return <Printer className="h-4 w-4 text-orange-600" />
      case "monitor":
        return <Monitor className="h-4 w-4 text-cyan-600" />
      default:
        return <Laptop className="h-4 w-4 text-slate-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Device Management</h2>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Device
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Devices</CardTitle>
          <CardDescription>Manage device catalog and valuation data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search devices..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="grid grid-cols-7 bg-slate-50 p-3 text-xs font-medium">
                <div>Device</div>
                <div>Type</div>
                <div>Brand</div>
                <div>Specifications</div>
                <div>Base Value</div>
                <div>Status</div>
                <div className="text-right">Actions</div>
              </div>
              {filteredDevices.map((device) => (
                <div key={device.id} className="grid grid-cols-7 border-t p-3 text-sm">
                  <div className="flex items-center gap-3">
                    {getDeviceIcon(device.type)}
                    <span className="font-medium">{device.name}</span>
                  </div>
                  <div className="flex items-center capitalize">{device.type}</div>
                  <div className="flex items-center">{device.brand}</div>
                  <div className="flex items-center">{device.specs}</div>
                  <div className="flex items-center font-medium">${device.baseValue}</div>
                  <div className="flex items-center">
                    <Badge
                      className={
                        device.status === "active"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-slate-500 hover:bg-slate-600"
                      }
                    >
                      {device.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Device
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Device Statistics</CardTitle>
            <CardDescription>Overview of device catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Laptop className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm">Total Devices</span>
                </div>
                <span className="font-medium">{devices.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Laptop className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm">Laptops</span>
                </div>
                <span className="font-medium">{devices.filter((device) => device.type === "laptop").length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-violet-600" />
                  <span className="text-sm">Desktops</span>
                </div>
                <span className="font-medium">{devices.filter((device) => device.type === "desktop").length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Servers</span>
                </div>
                <span className="font-medium">{devices.filter((device) => device.type === "server").length}</span>
              </div>
              <div className="h-[100px] w-full bg-slate-100 rounded-md flex items-center justify-center mt-4">
                <span className="text-xs text-slate-500">Device Distribution Chart</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Value Distribution</CardTitle>
            <CardDescription>Device value ranges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">$0 - $500</span>
                <span className="font-medium">{devices.filter((device) => device.baseValue <= 500).length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">$501 - $1000</span>
                <span className="font-medium">
                  {devices.filter((device) => device.baseValue > 500 && device.baseValue <= 1000).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">$1001 - $2000</span>
                <span className="font-medium">
                  {devices.filter((device) => device.baseValue > 1000 && device.baseValue <= 2000).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">$2001+</span>
                <span className="font-medium">{devices.filter((device) => device.baseValue > 2000).length}</span>
              </div>
              <div className="h-[100px] w-full bg-slate-100 rounded-md flex items-center justify-center mt-4">
                <span className="text-xs text-slate-500">Value Distribution Chart</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
