"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash,
  Download,
  Filter,
  Laptop,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Sample device data
const devices = [
  {
    id: 1,
    name: "MacBook Pro",
    type: "Laptop",
    brand: "Apple",
    model: "2019",
    baseValue: 850,
    status: "Active",
    lastUpdated: "2023-05-15T10:30:00",
  },
  {
    id: 2,
    name: "Dell XPS 13",
    type: "Laptop",
    brand: "Dell",
    model: "9310",
    baseValue: 650,
    status: "Active",
    lastUpdated: "2023-05-14T14:45:00",
  },
  {
    id: 3,
    name: "iPhone 12",
    type: "Phone",
    brand: "Apple",
    model: "A2172",
    baseValue: 450,
    status: "Active",
    lastUpdated: "2023-05-10T09:15:00",
  },
  {
    id: 4,
    name: "iPad Pro",
    type: "Tablet",
    brand: "Apple",
    model: "2021",
    baseValue: 550,
    status: "Active",
    lastUpdated: "2023-05-15T08:20:00",
  },
  {
    id: 5,
    name: "Surface Pro",
    type: "Tablet",
    brand: "Microsoft",
    model: "7",
    baseValue: 620,
    status: "Active",
    lastUpdated: "2023-05-13T16:10:00",
  },
  {
    id: 6,
    name: "ThinkPad X1",
    type: "Laptop",
    brand: "Lenovo",
    model: "Carbon Gen 9",
    baseValue: 580,
    status: "Active",
    lastUpdated: "2023-05-12T11:30:00",
  },
  {
    id: 7,
    name: "Galaxy S21",
    type: "Phone",
    brand: "Samsung",
    model: "Ultra",
    baseValue: 480,
    status: "Inactive",
    lastUpdated: "2023-05-08T13:45:00",
  },
  {
    id: 8,
    name: "iMac",
    type: "Desktop",
    brand: "Apple",
    model: "27-inch 2020",
    baseValue: 920,
    status: "Active",
    lastUpdated: "2023-05-14T10:20:00",
  },
]

export default function DevicesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [brandFilter, setBrandFilter] = useState("all")
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false)
  const [isEditDeviceOpen, setIsEditDeviceOpen] = useState(false)
  const [isDeleteDeviceOpen, setIsDeleteDeviceOpen] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState<any>(null)

  // Form state for adding/editing devices
  const [formData, setFormData] = useState({
    name: "",
    type: "Laptop",
    brand: "",
    model: "",
    baseValue: 0,
    status: "Active",
    description: "",
  })

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter devices based on search term and filters
  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.model.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || device.type === typeFilter
    const matchesBrand = brandFilter === "all" || device.brand === brandFilter

    return matchesSearch && matchesType && matchesBrand
  })

  // Handle opening edit dialog
  const handleEditDevice = (device: any) => {
    setSelectedDevice(device)
    setFormData({
      name: device.name,
      type: device.type,
      brand: device.brand,
      model: device.model,
      baseValue: device.baseValue,
      status: device.status,
      description: device.description || "",
    })
    setIsEditDeviceOpen(true)
  }

  // Handle opening delete dialog
  const handleDeleteDevice = (device: any) => {
    setSelectedDevice(device)
    setIsDeleteDeviceOpen(true)
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "baseValue" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  // Handle form select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Reset form data
  const resetForm = () => {
    setFormData({
      name: "",
      type: "Laptop",
      brand: "",
      model: "",
      baseValue: 0,
      status: "Active",
      description: "",
    })
  }

  // Handle add device
  const handleAddDevice = () => {
    // In a real app, you would add the device to the database
    console.log("Adding device:", formData)
    setIsAddDeviceOpen(false)
    resetForm()
  }

  // Handle update device
  const handleUpdateDevice = () => {
    // In a real app, you would update the device in the database
    console.log("Updating device:", selectedDevice.id, formData)
    setIsEditDeviceOpen(false)
  }

  // Handle delete device
  const handleConfirmDelete = () => {
    // In a real app, you would delete the device from the database
    console.log("Deleting device:", selectedDevice.id)
    setIsDeleteDeviceOpen(false)
  }

  // Get icon for device type
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "Laptop":
        return <Laptop className="h-4 w-4" />
      case "Desktop":
        return <Monitor className="h-4 w-4" />
      case "Phone":
        return <Smartphone className="h-4 w-4" />
      case "Tablet":
        return <Tablet className="h-4 w-4" />
      default:
        return <Laptop className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Device Management</h2>
          <p className="text-muted-foreground">Manage device catalog and valuations</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button onClick={() => setIsAddDeviceOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Device
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search devices..."
                className="w-full pl-8 sm:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Laptop">Laptop</SelectItem>
                    <SelectItem value="Desktop">Desktop</SelectItem>
                    <SelectItem value="Phone">Phone</SelectItem>
                    <SelectItem value="Tablet">Tablet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Select value={brandFilter} onValueChange={(value) => setBrandFilter(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  <SelectItem value="Apple">Apple</SelectItem>
                  <SelectItem value="Dell">Dell</SelectItem>
                  <SelectItem value="Microsoft">Microsoft</SelectItem>
                  <SelectItem value="Lenovo">Lenovo</SelectItem>
                  <SelectItem value="Samsung">Samsung</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                    <th className="pb-2 text-left font-medium">Name</th>
                    <th className="pb-2 text-left font-medium">Type</th>
                    <th className="pb-2 text-left font-medium">Brand</th>
                    <th className="pb-2 text-left font-medium">Model</th>
                    <th className="pb-2 text-left font-medium">Base Value</th>
                    <th className="pb-2 text-left font-medium">Status</th>
                    <th className="pb-2 text-left font-medium">Last Updated</th>
                    <th className="pb-2 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDevices.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-4 text-center text-muted-foreground">
                        No devices found
                      </td>
                    </tr>
                  ) : (
                    filteredDevices.map((device) => (
                      <tr key={device.id} className="border-b">
                        <td className="py-3">{device.name}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-1">
                            {getDeviceIcon(device.type)}
                            <span>{device.type}</span>
                          </div>
                        </td>
                        <td className="py-3">{device.brand}</td>
                        <td className="py-3">{device.model}</td>
                        <td className="py-3">${device.baseValue}</td>
                        <td className="py-3">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              device.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {device.status}
                          </span>
                        </td>
                        <td className="py-3">{new Date(device.lastUpdated).toLocaleString()}</td>
                        <td className="py-3 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditDevice(device)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteDevice(device)} className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Device Dialog */}
      <Dialog open={isAddDeviceOpen} onOpenChange={setIsAddDeviceOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Device</DialogTitle>
            <DialogDescription>Add a new device to the catalog. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Device Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter device name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laptop">Laptop</SelectItem>
                    <SelectItem value="Desktop">Desktop</SelectItem>
                    <SelectItem value="Phone">Phone</SelectItem>
                    <SelectItem value="Tablet">Tablet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="Enter brand"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="Enter model"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="baseValue">Base Value ($)</Label>
                <Input
                  id="baseValue"
                  name="baseValue"
                  type="number"
                  value={formData.baseValue || ""}
                  onChange={handleInputChange}
                  placeholder="Enter base value"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter device description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDeviceOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddDevice}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Device Dialog */}
      <Dialog open={isEditDeviceOpen} onOpenChange={setIsEditDeviceOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Device</DialogTitle>
            <DialogDescription>Update device information. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Device Name</Label>
              <Input id="edit-name" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger id="edit-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laptop">Laptop</SelectItem>
                    <SelectItem value="Desktop">Desktop</SelectItem>
                    <SelectItem value="Phone">Phone</SelectItem>
                    <SelectItem value="Tablet">Tablet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-brand">Brand</Label>
                <Input id="edit-brand" name="brand" value={formData.brand} onChange={handleInputChange} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-model">Model</Label>
                <Input id="edit-model" name="model" value={formData.model} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-baseValue">Base Value ($)</Label>
                <Input
                  id="edit-baseValue"
                  name="baseValue"
                  type="number"
                  value={formData.baseValue || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger id="edit-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description (Optional)</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDeviceOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateDevice}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Device Dialog */}
      <Dialog open={isDeleteDeviceOpen} onOpenChange={setIsDeleteDeviceOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Device</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this device? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedDevice && (
            <div className="py-4">
              <p className="mb-2">You are about to delete:</p>
              <div className="rounded-md bg-muted p-4">
                <p>
                  <strong>Name:</strong> {selectedDevice.name}
                </p>
                <p>
                  <strong>Brand:</strong> {selectedDevice.brand}
                </p>
                <p>
                  <strong>Model:</strong> {selectedDevice.model}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDeviceOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
