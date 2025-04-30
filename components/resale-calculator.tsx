"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { calculateResaleValue } from "@/lib/calculator"
import type { DeviceType, DeviceSpecs } from "@/lib/types"
import ResultDisplay from "./result-display"
import {
  Laptop,
  Monitor,
  Cpu,
  MemoryStickIcon as Memory,
  HardDrive,
  Package,
  Gift,
  Server,
  Workflow,
  Printer,
  Network,
  LayoutGrid,
  Layers,
  Wifi,
  Gauge,
  Palette,
  ScanLine,
  Maximize,
  ScreenShare,
  Zap,
} from "lucide-react"
import { getBrands, getModels } from "@/lib/device-data"

export default function ResaleCalculator() {
  const [activeTab, setActiveTab] = useState<DeviceType>("laptop")
  const [specs, setSpecs] = useState<DeviceSpecs>({
    type: "laptop",
    brand: "",
    model: "",
    ageYears: 1,
    originalPrice: 1000,
    processor: "",
    ram: 8,
    storage: 256,
    condition: "good",
    hasOriginalPackaging: false,
    additionalAccessories: false,
  })
  const [result, setResult] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [availableBrands, setAvailableBrands] = useState<string[]>([])
  const [availableModels, setAvailableModels] = useState<string[]>([])

  // Update available brands when device type changes
  useEffect(() => {
    setAvailableBrands(getBrands(activeTab))
    // Reset brand and model when changing device type
    setSpecs((prev) => ({
      ...prev,
      type: activeTab,
      brand: "",
      model: "",
    }))
  }, [activeTab])

  // Update available models when brand changes
  useEffect(() => {
    if (specs.brand) {
      setAvailableModels(getModels(activeTab, specs.brand))
    } else {
      setAvailableModels([])
    }
  }, [activeTab, specs.brand])

  const handleTypeChange = (value: DeviceType) => {
    setActiveTab(value)

    // Create default specs based on device type
    let newSpecs: DeviceSpecs

    switch (value) {
      case "server":
        newSpecs = {
          type: value,
          brand: "",
          model: "",
          ageYears: 1,
          originalPrice: 5000,
          processor: "",
          ram: 32,
          storage: 1024,
          condition: "good",
          hasOriginalPackaging: false,
          additionalAccessories: false,
          rackUnits: 1,
          redundantPower: false,
        }
        break
      case "workstation":
        newSpecs = {
          type: value,
          brand: "",
          model: "",
          ageYears: 1,
          originalPrice: 3000,
          processor: "",
          ram: 32,
          storage: 1024,
          condition: "good",
          hasOriginalPackaging: false,
          additionalAccessories: false,
          graphicsCard: "",
        }
        break
      case "network":
        newSpecs = {
          type: value,
          brand: "",
          model: "",
          ageYears: 1,
          originalPrice: 1000,
          condition: "good",
          hasOriginalPackaging: false,
          additionalAccessories: false,
          deviceType: "switch",
          ports: 24,
          manageable: true,
          poe: false,
        }
        break
      case "printer":
        newSpecs = {
          type: value,
          brand: "",
          model: "",
          ageYears: 1,
          originalPrice: 500,
          condition: "good",
          hasOriginalPackaging: false,
          additionalAccessories: false,
          printerType: "laser",
          color: true,
          duplexPrinting: true,
          scanCapable: false,
        }
        break
      case "monitor":
        newSpecs = {
          type: value,
          brand: "",
          model: "",
          ageYears: 1,
          originalPrice: 300,
          condition: "good",
          hasOriginalPackaging: false,
          additionalAccessories: false,
          size: 27,
          resolution: "1080p",
          panelType: "IPS",
          refreshRate: 60,
        }
        break
      default: // laptop or desktop
        newSpecs = {
          type: value,
          brand: "",
          model: "",
          ageYears: 1,
          originalPrice: value === "desktop" ? 800 : 1000,
          processor: "",
          ram: 8,
          storage: 256,
          condition: "good",
          hasOriginalPackaging: false,
          additionalAccessories: false,
        }
    }

    setSpecs(newSpecs)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setSpecs((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }))
  }

  const handleSelectChange = (name: string, value: string | number) => {
    setSpecs((prev) => ({ ...prev, [name]: value }))
  }

  const handleSliderChange = (name: string, value: number[]) => {
    setSpecs((prev) => ({ ...prev, [name]: value[0] }))
  }

  const handleCalculate = () => {
    setIsCalculating(true)

    // Simulate API call or complex calculation
    setTimeout(() => {
      const calculatedValue = calculateResaleValue(specs)
      setResult(calculatedValue)
      setIsCalculating(false)
      setShowConfetti(true)

      // Hide confetti after 3 seconds
      setTimeout(() => setShowConfetti(false), 3000)
    }, 800)
  }

  const getDeviceIcon = (type: DeviceType) => {
    switch (type) {
      case "laptop":
        return <Laptop className="h-4 w-4 mr-2" />
      case "desktop":
        return <Monitor className="h-4 w-4 mr-2" />
      case "server":
        return <Server className="h-4 w-4 mr-2" />
      case "workstation":
        return <Workflow className="h-4 w-4 mr-2" />
      case "network":
        return <Network className="h-4 w-4 mr-2" />
      case "printer":
        return <Printer className="h-4 w-4 mr-2" />
      case "monitor":
        return <ScreenShare className="h-4 w-4 mr-2" />
      default:
        return <Laptop className="h-4 w-4 mr-2" />
    }
  }

  const renderDeviceSpecificFields = () => {
    switch (activeTab) {
      case "server":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="rackUnits" className="text-indigo-700 flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5" /> Rack Units
                </Label>
                <Select
                  value={String((specs as any).rackUnits)}
                  onValueChange={(value) => handleSelectChange("rackUnits", Number.parseInt(value))}
                >
                  <SelectTrigger id="rackUnits" className="border-indigo-200 focus:ring-indigo-500">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1U</SelectItem>
                    <SelectItem value="2">2U</SelectItem>
                    <SelectItem value="3">3U</SelectItem>
                    <SelectItem value="4">4U</SelectItem>
                    <SelectItem value="5">5U+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="redundantPower"
                  name="redundantPower"
                  className="h-4 w-4 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500"
                  checked={(specs as any).redundantPower}
                  onChange={handleInputChange}
                />
                <Label htmlFor="redundantPower" className="flex items-center gap-1 text-indigo-700">
                  <Zap className="h-3.5 w-3.5" /> Redundant Power
                </Label>
              </div>
            </div>
          </>
        )

      case "workstation":
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="graphicsCard" className="text-indigo-700 flex items-center gap-1">
                <LayoutGrid className="h-3.5 w-3.5" /> Graphics Card
              </Label>
              <Select
                value={(specs as any).graphicsCard}
                onValueChange={(value) => handleSelectChange("graphicsCard", value)}
              >
                <SelectTrigger id="graphicsCard" className="border-indigo-200 focus:ring-indigo-500">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nvidia_rtx_4090">NVIDIA RTX 4090</SelectItem>
                  <SelectItem value="nvidia_rtx_4080">NVIDIA RTX 4080</SelectItem>
                  <SelectItem value="nvidia_rtx_3090">NVIDIA RTX 3090</SelectItem>
                  <SelectItem value="nvidia_rtx_3080">NVIDIA RTX 3080</SelectItem>
                  <SelectItem value="nvidia_quadro_rtx_6000">NVIDIA Quadro RTX 6000</SelectItem>
                  <SelectItem value="nvidia_quadro_rtx_5000">NVIDIA Quadro RTX 5000</SelectItem>
                  <SelectItem value="amd_radeon_pro_w7900">AMD Radeon Pro W7900</SelectItem>
                  <SelectItem value="amd_radeon_pro_w6800">AMD Radeon Pro W6800</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )

      case "network":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="deviceType" className="text-indigo-700 flex items-center gap-1">
                  <Network className="h-3.5 w-3.5" /> Device Type
                </Label>
                <Select
                  value={(specs as any).deviceType}
                  onValueChange={(value) => handleSelectChange("deviceType", value)}
                >
                  <SelectTrigger id="deviceType" className="border-indigo-200 focus:ring-indigo-500">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="switch">Switch</SelectItem>
                    <SelectItem value="router">Router</SelectItem>
                    <SelectItem value="firewall">Firewall</SelectItem>
                    <SelectItem value="access_point">Access Point</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ports" className="text-indigo-700 flex items-center gap-1">
                  <LayoutGrid className="h-3.5 w-3.5" /> Ports
                </Label>
                <Select
                  value={String((specs as any).ports)}
                  onValueChange={(value) => handleSelectChange("ports", Number.parseInt(value))}
                >
                  <SelectTrigger id="ports" className="border-indigo-200 focus:ring-indigo-500">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8">8 ports</SelectItem>
                    <SelectItem value="16">16 ports</SelectItem>
                    <SelectItem value="24">24 ports</SelectItem>
                    <SelectItem value="48">48 ports</SelectItem>
                    <SelectItem value="96">96+ ports</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="manageable"
                  name="manageable"
                  className="h-4 w-4 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500"
                  checked={(specs as any).manageable}
                  onChange={handleInputChange}
                />
                <Label htmlFor="manageable" className="flex items-center gap-1 text-indigo-700">
                  <Wifi className="h-3.5 w-3.5" /> Manageable
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="poe"
                  name="poe"
                  className="h-4 w-4 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500"
                  checked={(specs as any).poe}
                  onChange={handleInputChange}
                />
                <Label htmlFor="poe" className="flex items-center gap-1 text-indigo-700">
                  <Zap className="h-3.5 w-3.5" /> PoE Support
                </Label>
              </div>
            </div>
          </>
        )

      case "printer":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="printerType" className="text-indigo-700 flex items-center gap-1">
                  <Printer className="h-3.5 w-3.5" /> Printer Type
                </Label>
                <Select
                  value={(specs as any).printerType}
                  onValueChange={(value) => handleSelectChange("printerType", value)}
                >
                  <SelectTrigger id="printerType" className="border-indigo-200 focus:ring-indigo-500">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="laser">Laser</SelectItem>
                    <SelectItem value="inkjet">Inkjet</SelectItem>
                    <SelectItem value="led">LED</SelectItem>
                    <SelectItem value="thermal">Thermal</SelectItem>
                    <SelectItem value="dot_matrix">Dot Matrix</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="color"
                  name="color"
                  className="h-4 w-4 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500"
                  checked={(specs as any).color}
                  onChange={handleInputChange}
                />
                <Label htmlFor="color" className="flex items-center gap-1 text-indigo-700">
                  <Palette className="h-3.5 w-3.5" /> Color Printing
                </Label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="duplexPrinting"
                  name="duplexPrinting"
                  className="h-4 w-4 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500"
                  checked={(specs as any).duplexPrinting}
                  onChange={handleInputChange}
                />
                <Label htmlFor="duplexPrinting" className="flex items-center gap-1 text-indigo-700">
                  <Layers className="h-3.5 w-3.5" /> Duplex Printing
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="scanCapable"
                  name="scanCapable"
                  className="h-4 w-4 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500"
                  checked={(specs as any).scanCapable}
                  onChange={handleInputChange}
                />
                <Label htmlFor="scanCapable" className="flex items-center gap-1 text-indigo-700">
                  <ScanLine className="h-3.5 w-3.5" /> Scan Capable
                </Label>
              </div>
            </div>
          </>
        )

      case "monitor":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label className="text-indigo-700 flex justify-between">
                  <span className="flex items-center gap-1">
                    <Maximize className="h-3.5 w-3.5" /> Size (inches)
                  </span>
                  <span className="text-indigo-500 font-medium">{(specs as any).size}"</span>
                </Label>
                <Slider
                  id="size"
                  min={19}
                  max={49}
                  step={1}
                  value={[(specs as any).size]}
                  onValueChange={(value) => handleSliderChange("size", value)}
                  className="py-4"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="resolution" className="text-indigo-700 flex items-center gap-1">
                  <ScreenShare className="h-3.5 w-3.5" /> Resolution
                </Label>
                <Select
                  value={(specs as any).resolution}
                  onValueChange={(value) => handleSelectChange("resolution", value)}
                >
                  <SelectTrigger id="resolution" className="border-indigo-200 focus:ring-indigo-500">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="720p">HD (1280x720)</SelectItem>
                    <SelectItem value="1080p">Full HD (1920x1080)</SelectItem>
                    <SelectItem value="1440p">QHD (2560x1440)</SelectItem>
                    <SelectItem value="4k">4K (3840x2160)</SelectItem>
                    <SelectItem value="5k">5K (5120x2880)</SelectItem>
                    <SelectItem value="ultrawide">Ultrawide</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="panelType" className="text-indigo-700 flex items-center gap-1">
                  <Palette className="h-3.5 w-3.5" /> Panel Type
                </Label>
                <Select
                  value={(specs as any).panelType}
                  onValueChange={(value) => handleSelectChange("panelType", value)}
                >
                  <SelectTrigger id="panelType" className="border-indigo-200 focus:ring-indigo-500">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TN">TN</SelectItem>
                    <SelectItem value="IPS">IPS</SelectItem>
                    <SelectItem value="VA">VA</SelectItem>
                    <SelectItem value="OLED">OLED</SelectItem>
                    <SelectItem value="Mini-LED">Mini-LED</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="refreshRate" className="text-indigo-700 flex items-center gap-1">
                  <Gauge className="h-3.5 w-3.5" /> Refresh Rate (Hz)
                </Label>
                <Select
                  value={String((specs as any).refreshRate)}
                  onValueChange={(value) => handleSelectChange("refreshRate", Number.parseInt(value))}
                >
                  <SelectTrigger id="refreshRate" className="border-indigo-200 focus:ring-indigo-500">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60">60 Hz</SelectItem>
                    <SelectItem value="75">75 Hz</SelectItem>
                    <SelectItem value="120">120 Hz</SelectItem>
                    <SelectItem value="144">144 Hz</SelectItem>
                    <SelectItem value="165">165 Hz</SelectItem>
                    <SelectItem value="240">240 Hz</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )

      case "laptop":
      case "desktop":
      default:
        return (
          <>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="processor" className="text-indigo-700 flex items-center gap-1">
                  <Cpu className="h-3.5 w-3.5" /> Processor
                </Label>
                <Select value={specs.processor} onValueChange={(value) => handleSelectChange("processor", value)}>
                  <SelectTrigger id="processor" className="border-indigo-200 focus:ring-indigo-500">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="i3">Intel Core i3</SelectItem>
                    <SelectItem value="i5">Intel Core i5</SelectItem>
                    <SelectItem value="i7">Intel Core i7</SelectItem>
                    <SelectItem value="i9">Intel Core i9</SelectItem>
                    <SelectItem value="ryzen3">AMD Ryzen 3</SelectItem>
                    <SelectItem value="ryzen5">AMD Ryzen 5</SelectItem>
                    <SelectItem value="ryzen7">AMD Ryzen 7</SelectItem>
                    <SelectItem value="ryzen9">AMD Ryzen 9</SelectItem>
                    <SelectItem value="m1">Apple M1</SelectItem>
                    <SelectItem value="m2">Apple M2</SelectItem>
                    <SelectItem value="m3">Apple M3</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ram" className="text-indigo-700 flex items-center gap-1">
                  <Memory className="h-3.5 w-3.5" /> RAM (GB)
                </Label>
                <Select value={specs.ram.toString()} onValueChange={(value) => handleSelectChange("ram", value)}>
                  <SelectTrigger id="ram" className="border-indigo-200 focus:ring-indigo-500">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4 GB</SelectItem>
                    <SelectItem value="8">8 GB</SelectItem>
                    <SelectItem value="16">16 GB</SelectItem>
                    <SelectItem value="32">32 GB</SelectItem>
                    <SelectItem value="64">64 GB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="storage" className="text-indigo-700 flex items-center gap-1">
                  <HardDrive className="h-3.5 w-3.5" /> Storage (GB)
                </Label>
                <Select
                  value={specs.storage.toString()}
                  onValueChange={(value) => handleSelectChange("storage", value)}
                >
                  <SelectTrigger id="storage" className="border-indigo-200 focus:ring-indigo-500">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="128">128 GB</SelectItem>
                    <SelectItem value="256">256 GB</SelectItem>
                    <SelectItem value="512">512 GB</SelectItem>
                    <SelectItem value="1024">1 TB</SelectItem>
                    <SelectItem value="2048">2 TB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-5">
      <motion.div
        className="md:col-span-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
            <CardTitle className="flex items-center gap-2">
              {activeTab === "laptop" ? <Laptop className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
              Device Information
            </CardTitle>
            <CardDescription className="text-indigo-100">
              Enter the details of your device to get an estimated resale value.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={handleTypeChange as any} className="mb-6">
              <TabsList className="grid w-full grid-cols-7 bg-indigo-100">
                <TabsTrigger
                  value="laptop"
                  className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                >
                  <Laptop className="h-4 w-4 mr-2" /> Laptop
                </TabsTrigger>
                <TabsTrigger
                  value="desktop"
                  className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                >
                  <Monitor className="h-4 w-4 mr-2" /> Desktop
                </TabsTrigger>
                <TabsTrigger
                  value="server"
                  className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                >
                  <Server className="h-4 w-4 mr-2" /> Server
                </TabsTrigger>
                <TabsTrigger
                  value="workstation"
                  className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                >
                  <Workflow className="h-4 w-4 mr-2" /> Workstation
                </TabsTrigger>
                <TabsTrigger
                  value="network"
                  className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                >
                  <Network className="h-4 w-4 mr-2" /> Network
                </TabsTrigger>
                <TabsTrigger
                  value="printer"
                  className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                >
                  <Printer className="h-4 w-4 mr-2" /> Printer
                </TabsTrigger>
                <TabsTrigger
                  value="monitor"
                  className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                >
                  <ScreenShare className="h-4 w-4 mr-2" /> Monitor
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="brand" className="text-indigo-700">
                    Brand
                  </Label>
                  <Select value={specs.brand} onValueChange={(value) => handleSelectChange("brand", value)}>
                    <SelectTrigger id="brand" className="border-indigo-200 focus:ring-indigo-500">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableBrands.map((brand) => (
                        <SelectItem key={brand} value={brand.toLowerCase()}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="model" className="text-indigo-700">
                    Model
                  </Label>
                  <Select
                    value={specs.model}
                    onValueChange={(value) => handleSelectChange("model", value)}
                    disabled={!specs.brand}
                  >
                    <SelectTrigger id="model" className="border-indigo-200 focus:ring-indigo-500">
                      <SelectValue placeholder={specs.brand ? "Select model" : "Select brand first"} />
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
                  <Label htmlFor="originalPrice" className="text-indigo-700">
                    Original Price ($)
                  </Label>
                  <Input
                    id="originalPrice"
                    name="originalPrice"
                    type="number"
                    min="0"
                    value={specs.originalPrice}
                    onChange={handleInputChange}
                    className="border-indigo-200 focus:ring-indigo-500"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-indigo-700 flex justify-between">
                    <span>Age (Years)</span>
                    <span className="text-indigo-500 font-medium">{specs.ageYears}</span>
                  </Label>
                  <Slider
                    id="ageYears"
                    min={0}
                    max={10}
                    step={0.5}
                    value={[specs.ageYears]}
                    onValueChange={(value) => handleSliderChange("ageYears", value)}
                    className="py-4"
                  />
                </div>
              </div>

              {renderDeviceSpecificFields()}

              <div className="grid gap-2">
                <Label htmlFor="condition" className="text-indigo-700">
                  Condition
                </Label>
                <Select value={specs.condition} onValueChange={(value) => handleSelectChange("condition", value)}>
                  <SelectTrigger id="condition" className="border-indigo-200 focus:ring-indigo-500">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="like-new">Like New</SelectItem>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasOriginalPackaging"
                    name="hasOriginalPackaging"
                    className="h-4 w-4 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500"
                    checked={specs.hasOriginalPackaging}
                    onChange={handleInputChange}
                  />
                  <Label htmlFor="hasOriginalPackaging" className="flex items-center gap-1 text-indigo-700">
                    <Package className="h-3.5 w-3.5" /> Has Original Packaging
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="additionalAccessories"
                    name="additionalAccessories"
                    className="h-4 w-4 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500"
                    checked={specs.additionalAccessories}
                    onChange={handleInputChange}
                  />
                  <Label htmlFor="additionalAccessories" className="flex items-center gap-1 text-indigo-700">
                    <Gift className="h-3.5 w-3.5" /> Additional Accessories
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gradient-to-r from-indigo-50 to-violet-50 p-6">
            <Button
              onClick={handleCalculate}
              className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 transition-all duration-300 shadow-md hover:shadow-lg"
              disabled={isCalculating || !specs.brand || !specs.model}
            >
              {isCalculating ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Calculating...
                </span>
              ) : (
                "Calculate Resale Value"
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div
        className="md:col-span-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ResultDisplay result={result} specs={specs} showConfetti={showConfetti} />
      </motion.div>
    </div>
  )
}
