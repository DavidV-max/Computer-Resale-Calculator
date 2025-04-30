"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Laptop, Monitor, Server, Network, Printer, ScreenShare, Plus, Pencil, Trash2 } from "lucide-react"
import type { DeviceType } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Processor options - defined outside component to ensure stability
const processors = [
  { value: "i3", label: "Intel Core i3" },
  { value: "i5", label: "Intel Core i5" },
  { value: "i7", label: "Intel Core i7" },
  { value: "i9", label: "Intel Core i9" },
  { value: "ryzen3", label: "AMD Ryzen 3" },
  { value: "ryzen5", label: "AMD Ryzen 5" },
  { value: "ryzen7", label: "AMD Ryzen 7" },
  { value: "ryzen9", label: "AMD Ryzen 9" },
  { value: "m1", label: "Apple M1" },
  { value: "m2", label: "Apple M2" },
  { value: "m3", label: "Apple M3" },
  { value: "xeon", label: "Intel Xeon" },
  { value: "epyc", label: "AMD EPYC" },
]

export default function DeviceManagement() {
  const [activeDeviceTab, setActiveDeviceTab] = useState<DeviceType>("laptop")
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false)
  const [newDevice, setNewDevice] = useState({
    brand: "",
    model: "",
    year: "",
    processor: "",
    ram: "",
    storage: "",
    baseValue: "",
  })
  const [availableBrands, setAvailableBrands] = useState<string[]>([])
  const [availableModels, setAvailableModels] = useState<string[]>([])

  // Brand and model data - defined outside of component render to ensure stability
  const brandsData = {
    laptop: ["Dell", "HP", "Lenovo", "Apple", "ASUS", "Acer", "Microsoft"],
    desktop: ["Dell", "HP", "Lenovo", "Apple", "ASUS", "Acer", "Intel"],
    server: ["Dell EMC", "HPE", "Lenovo", "Cisco", "IBM", "Supermicro"],
    workstation: ["Dell", "HP", "Lenovo", "Apple", "BOXX"],
    network: ["Cisco", "Juniper", "HPE/Aruba", "Ubiquiti", "Netgear"],
    printer: ["HP", "Canon", "Epson", "Brother", "Xerox"],
    monitor: ["Dell", "LG", "Samsung", "ASUS", "HP", "Lenovo", "Apple"],
  }

  // Update available brands when device type changes
  useEffect(() => {
    if (activeDeviceTab) {
      setAvailableBrands(brandsData[activeDeviceTab] || [])
      // Reset brand and model when changing device type
      setNewDevice((prev) => ({
        ...prev,
        brand: "",
        model: "",
      }))
    }
  }, [activeDeviceTab])

  // Models data
  const modelsData = {
    Dell: {
      laptop: [
        "XPS 13 Plus 9320 (2023)",
        "XPS 15 9530 (2023)",
        "XPS 17 9730 (2023)",
        "Latitude 9440 (2023)",
        "Latitude 7440 (2023)",
        "Inspiron 16 Plus 7630 (2023)",
      ],
      desktop: ["OptiPlex 7000 (2023)", "OptiPlex 5000 (2022)", "XPS Desktop (2023)", "Precision 3660 (2023)"],
      server: ["PowerEdge R760 (2023)", "PowerEdge R650 (2022)", "PowerEdge R750 (2021)"],
      workstation: ["Precision 7865 (2023)", "Precision 5820 (2022)", "Precision 7820 (2021)"],
    },
    HP: {
      laptop: [
        "Spectre x360 14 (2023)",
        "Spectre x360 16 (2023)",
        "EliteBook 1040 G10 (2023)",
        "EliteBook 840 G10 (2023)",
        "Envy 16 (2023)",
        "Pavilion Plus 14 (2023)",
      ],
      desktop: ["EliteDesk 800 G9 (2023)", "Z2 Tower G9 (2023)", "OMEN 45L (2023)", "EliteDesk 800 G8 (2022)"],
      server: ["ProLiant DL380 Gen11 (2023)", "ProLiant DL360 Gen11 (2023)", "ProLiant DL380 Gen10 Plus (2022)"],
      workstation: ["Z8 G5 (2023)", "Z6 G5 (2023)", "Z4 G5 (2023)", "Z8 G4 (2021)"],
    },
    Lenovo: {
      laptop: [
        "ThinkPad X1 Carbon Gen 11 (2023)",
        "ThinkPad X1 Yoga Gen 8 (2023)",
        "ThinkPad T14s Gen 4 (2023)",
        "ThinkPad P1 Gen 6 (2023)",
        "Yoga 9i Gen 8 (2023)",
        "Legion Pro 7 (2023)",
      ],
      desktop: [
        "ThinkCentre M70q Gen 4 (2023)",
        "ThinkStation P360 (2023)",
        "Legion Tower 7i (2023)",
        "IdeaCentre AIO 5i (2023)",
      ],
      server: ["ThinkSystem SR650 V3 (2023)", "ThinkSystem SR630 V3 (2023)", "ThinkSystem SR650 V2 (2021)"],
      workstation: ["ThinkStation P620 (2023)", "ThinkStation P520 (2022)", "ThinkStation P920 (2021)"],
    },
    Apple: {
      laptop: ['MacBook Pro 13" (2023)', 'MacBook Pro 14" (2023)', 'MacBook Pro 16" (2023)', "MacBook Air M2 (2022)"],
      desktop: ["Mac Studio (2023)", "Mac Mini M2 (2023)", "Mac Pro (2023)", 'iMac 24" (2021)'],
      workstation: ["Mac Studio (2023)", "Mac Pro (2023)"],
    },
    ASUS: {
      laptop: ["ZenBook Pro", "ROG Zephyrus", "VivoBook", "ExpertBook"],
      desktop: ["ROG Strix", "ProArt", "VivoMini", "ExpertCenter"],
    },
    Acer: {
      laptop: ["Swift", "Aspire", "Predator", "TravelMate"],
      desktop: ["Aspire", "Predator Orion", "Veriton", "Nitro"],
    },
    Microsoft: {
      laptop: ["Surface Laptop 5", "Surface Pro 9", "Surface Book 3", "Surface Laptop Studio"],
    },
    "Dell EMC": {
      server: ["PowerEdge R760", "PowerEdge R650", "PowerEdge R750"],
    },
    HPE: {
      server: ["ProLiant DL380 Gen11", "ProLiant DL360 Gen11", "ProLiant DL380 Gen10 Plus"],
    },
    Cisco: {
      server: ["UCS C240 M7", "UCS C220 M7", "UCS C240 M6"],
      network: ["Catalyst 9300", "Nexus 9000", "ISR 4000"],
    },
    IBM: {
      server: ["Power E1080", "Power S1022", "LinuxONE Emperor 4"],
    },
    Supermicro: {
      server: ["SuperServer", "BigTwin", "SuperBlade"],
    },
    BOXX: {
      workstation: ["APEXX S3", "APEXX T3", "APEXX X3"],
    },
    Juniper: {
      network: ["EX4400", "MX304", "QFX5120"],
    },
    "HPE/Aruba": {
      network: ["Aruba CX 8360", "Aruba 6300F", "Aruba 8320"],
    },
    Ubiquiti: {
      network: ["UniFi Enterprise XG", "EdgeSwitch Pro", "UniFi Switch Pro 48"],
    },
    Netgear: {
      network: ["M4250", "M4300", "M4500"],
    },
    Canon: {
      printer: ["imageCLASS X MF1643i", "MAXIFY GX7050", "imageCLASS MF746Cdw"],
    },
    Epson: {
      printer: ["WorkForce Pro WF-C5890", "EcoTank ET-5850", "SureColor P900"],
    },
    Brother: {
      printer: ["MFC-L9570CDW", "HL-L9310CDW", "MFC-L8900CDW"],
    },
    Xerox: {
      printer: ["VersaLink C7000", "AltaLink C8100", "VersaLink B610"],
    },
    LG: {
      monitor: ["UltraGear 27GR95QE", "UltraFine 32EP950", "UltraGear 27GP950"],
    },
    Samsung: {
      monitor: ["Odyssey Neo G9 G95NC", "ViewFinity S9 S90PC", "Odyssey G7"],
    },
  }

  // Update available models when brand changes
  useEffect(() => {
    if (newDevice.brand && activeDeviceTab) {
      const brandModels = modelsData[newDevice.brand]?.[activeDeviceTab] || []
      setAvailableModels(brandModels)
    } else {
      setAvailableModels([])
    }
  }, [newDevice.brand, activeDeviceTab])

  // Processor options
  // const processors = [
  //   { value: "i3", label: "Intel Core i3" },
  //   { value: "i5", label: "Intel Core i5" },
  //   { value: "i7", label: "Intel Core i7" },
  //   { value: "i9", label: "Intel Core i9" },
  //   { value: "ryzen3", label: "AMD Ryzen 3" },
  //   { value: "ryzen5", label: "AMD Ryzen 5" },
  //   { value: "ryzen7", label: "AMD Ryzen 7" },
  //   { value: "ryzen9", label: "AMD Ryzen 9" },
  //   { value: "m1", label: "Apple M1" },
  //   { value: "m2", label: "Apple M2" },
  //   { value: "m3", label: "Apple M3" },
  //   { value: "xeon", label: "Intel Xeon" },
  //   { value: "epyc", label: "AMD EPYC" },
  // ]

  const handleAddDevice = () => {
    // In a real app, this would save to a database
    console.log("Adding new device:", newDevice)
    setIsAddDeviceOpen(false)
    // Reset form
    setNewDevice({
      brand: "",
      model: "",
      year: "",
      processor: "",
      ram: "",
      storage: "",
      baseValue: "",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Device Management</CardTitle>
            <CardDescription>Manage device brands, models, and specifications</CardDescription>
          </div>
          <Dialog open={isAddDeviceOpen} onOpenChange={setIsAddDeviceOpen}>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-4 w-4 mr-2" /> Add New Device
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Device</DialogTitle>
                <DialogDescription>
                  Enter the details for the new device. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Select
                      value={newDevice.brand}
                      onValueChange={(value) => setNewDevice({ ...newDevice, brand: value, model: "" })}
                    >
                      <SelectTrigger id="brand">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableBrands.map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="model">Model</Label>
                    <Select
                      value={newDevice.model}
                      onValueChange={(value) => setNewDevice({ ...newDevice, model: value })}
                      disabled={!newDevice.brand}
                    >
                      <SelectTrigger id="model">
                        <SelectValue placeholder={newDevice.brand ? "Select model" : "Select brand first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableModels.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      value={newDevice.year}
                      onChange={(e) => setNewDevice({ ...newDevice, year: e.target.value })}
                      placeholder="e.g. 2023"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="processor">Processor</Label>
                    <Select
                      value={newDevice.processor}
                      onValueChange={(value) => setNewDevice({ ...newDevice, processor: value })}
                    >
                      <SelectTrigger id="processor">
                        <SelectValue placeholder="Select processor" />
                      </SelectTrigger>
                      <SelectContent>
                        {processors.map((processor) => (
                          <SelectItem key={processor.value} value={processor.value}>
                            {processor.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="ram">RAM (GB)</Label>
                    <Input
                      id="ram"
                      value={newDevice.ram}
                      onChange={(e) => setNewDevice({ ...newDevice, ram: e.target.value })}
                      placeholder="e.g. 16"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="storage">Storage (GB)</Label>
                    <Input
                      id="storage"
                      value={newDevice.storage}
                      onChange={(e) => setNewDevice({ ...newDevice, storage: e.target.value })}
                      placeholder="e.g. 512"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="baseValue">Base Value ($)</Label>
                  <Input
                    id="baseValue"
                    value={newDevice.baseValue}
                    onChange={(e) => setNewDevice({ ...newDevice, baseValue: e.target.value })}
                    placeholder="e.g. 1200"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDeviceOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleAddDevice}>
                  Save Device
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeDeviceTab}
          onValueChange={(value) => setActiveDeviceTab(value as DeviceType)}
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-7 w-full">
            <TabsTrigger value="laptop" className="flex items-center gap-2">
              <Laptop className="h-4 w-4" /> Laptops
            </TabsTrigger>
            <TabsTrigger value="desktop" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" /> Desktops
            </TabsTrigger>
            <TabsTrigger value="server" className="flex items-center gap-2">
              <Server className="h-4 w-4" /> Servers
            </TabsTrigger>
            <TabsTrigger value="workstation" className="flex items-center gap-2">
              <Laptop className="h-4 w-4" /> Workstations
            </TabsTrigger>
            <TabsTrigger value="network" className="flex items-center gap-2">
              <Network className="h-4 w-4" /> Network
            </TabsTrigger>
            <TabsTrigger value="printer" className="flex items-center gap-2">
              <Printer className="h-4 w-4" /> Printers
            </TabsTrigger>
            <TabsTrigger value="monitor" className="flex items-center gap-2">
              <ScreenShare className="h-4 w-4" /> Monitors
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2 mb-4">
            <Input placeholder="Search devices..." className="max-w-sm" />
            <Button variant="outline">Search</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Specifications</TableHead>
                <TableHead>Base Value</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeDeviceTab === "laptop" && (
                <>
                  <TableRow>
                    <TableCell className="font-medium">Dell</TableCell>
                    <TableCell>XPS 13 Plus 9320</TableCell>
                    <TableCell>2023</TableCell>
                    <TableCell>i5, 16GB RAM, 512GB SSD</TableCell>
                    <TableCell>$1,100</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Dell</TableCell>
                    <TableCell>Latitude 9440</TableCell>
                    <TableCell>2023</TableCell>
                    <TableCell>i7, 16GB RAM, 512GB SSD</TableCell>
                    <TableCell>$1,300</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">HP</TableCell>
                    <TableCell>Spectre x360 14</TableCell>
                    <TableCell>2023</TableCell>
                    <TableCell>i5, 16GB RAM, 512GB SSD</TableCell>
                    <TableCell>$1,200</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">HP</TableCell>
                    <TableCell>EliteBook 840 G10</TableCell>
                    <TableCell>2023</TableCell>
                    <TableCell>i7, 16GB RAM, 512GB SSD</TableCell>
                    <TableCell>$1,350</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Dell</TableCell>
                    <TableCell>Inspiron 16 Plus 7630</TableCell>
                    <TableCell>2023</TableCell>
                    <TableCell>i5, 8GB RAM, 512GB SSD</TableCell>
                    <TableCell>$950</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">HP</TableCell>
                    <TableCell>Pavilion Plus 14</TableCell>
                    <TableCell>2023</TableCell>
                    <TableCell>i5, 16GB RAM, 512GB SSD</TableCell>
                    <TableCell>$900</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Lenovo</TableCell>
                    <TableCell>ThinkPad X1 Carbon Gen 11</TableCell>
                    <TableCell>2023</TableCell>
                    <TableCell>i5, 16GB RAM, 512GB SSD</TableCell>
                    <TableCell>$1,250</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Lenovo</TableCell>
                    <TableCell>ThinkPad T14s Gen 4</TableCell>
                    <TableCell>2023</TableCell>
                    <TableCell>i7, 16GB RAM, 1TB SSD</TableCell>
                    <TableCell>$1,400</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Apple</TableCell>
                    <TableCell>MacBook Pro 14"</TableCell>
                    <TableCell>2023</TableCell>
                    <TableCell>M2 Pro, 16GB RAM, 512GB SSD</TableCell>
                    <TableCell>$1,800</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </>
              )}

              {activeDeviceTab === "desktop" && (
                <>
                  <TableRow>
                    <TableCell className="font-medium">Dell</TableCell>
                    <TableCell>OptiPlex 7000</TableCell>
                    <TableCell>2023</TableCell>
                    <TableCell>i5, 16GB RAM, 512GB SSD</TableCell>
                    <TableCell>$900</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">HP</TableCell>
                    <TableCell>EliteDesk 800 G9</TableCell>
                    <TableCell>2023</TableCell>
                    <TableCell>i7, 32GB RAM, 1TB SSD</TableCell>
                    <TableCell>$1,100</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Lenovo</TableCell>
                    <TableCell>ThinkCentre M70q Gen 4</TableCell>
                    <TableCell>2023</TableCell>
                    <TableCell>i5, 16GB RAM, 512GB SSD</TableCell>
                    <TableCell>$850</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </>
              )}

              {activeDeviceTab === "server" && (
                <>
                  <TableRow>
                    <TableCell className="font-medium">Dell EMC</TableCell>
                    <TableCell>PowerEdge R760</TableCell>
                    <TableCell>2023</TableCell>
                    <TableCell>Xeon, 64GB RAM, 4TB SSD</TableCell>
                    <TableCell>$5,200</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">HPE</TableCell>
                    <TableCell>ProLiant DL380 Gen11</TableCell>
                    <TableCell>2023</TableCell>
                    <TableCell>Xeon, 128GB RAM, 8TB SSD</TableCell>
                    <TableCell>$6,500</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Lenovo</TableCell>
                    <TableCell>ThinkSystem SR650 V3</TableCell>
                    <TableCell>2023</TableCell>
                    <TableCell>Xeon, 96GB RAM, 6TB SSD</TableCell>
                    <TableCell>$5,800</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </>
              )}

              {activeDeviceTab === "workstation" && (
                <>
                  <TableRow>
                    <TableCell className="font-medium">Dell</TableCell>
                    <TableCell>Precision 7865</TableCell>
                    <TableCell>2023</TableCell>
                    <TableCell>Ryzen Threadripper, 64GB RAM, 2TB SSD</TableCell>
                    <TableCell>$3,800</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </>
              )}

              {/* Add similar blocks for other device types */}
            </TableBody>
          </Table>

          <div className="flex items-center justify-end space-x-2 mt-4">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
