"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DeviceSpecs } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import {
  ArrowDown,
  ArrowUp,
  Info,
  DollarSign,
  TrendingDown,
  Award,
  Laptop,
  Monitor,
  Server,
  Workflow,
  Network,
  Printer,
  ScreenShare,
} from "lucide-react"
import Confetti from "./confetti"
import { getDeviceTypeLabel } from "@/lib/device-data"

interface ResultDisplayProps {
  result: number | null
  specs: DeviceSpecs
  className?: string
  showConfetti?: boolean
}

export default function ResultDisplay({ result, specs, className, showConfetti = false }: ResultDisplayProps) {
  const [animateValue, setAnimateValue] = useState(0)

  useEffect(() => {
    if (result !== null) {
      const duration = 1500 // ms
      const steps = 30
      const stepTime = duration / steps
      const increment = result / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= result) {
          setAnimateValue(result)
          clearInterval(timer)
        } else {
          setAnimateValue(Math.floor(current))
        }
      }, stepTime)

      return () => clearInterval(timer)
    }
  }, [result])

  const getDeviceIcon = () => {
    switch (specs.type) {
      case "laptop":
        return <Laptop className="h-5 w-5" />
      case "desktop":
        return <Monitor className="h-5 w-5" />
      case "server":
        return <Server className="h-5 w-5" />
      case "workstation":
        return <Workflow className="h-5 w-5" />
      case "network":
        return <Network className="h-5 w-5" />
      case "printer":
        return <Printer className="h-5 w-5" />
      case "monitor":
        return <ScreenShare className="h-5 w-5" />
      default:
        return <DollarSign className="h-5 w-5" />
    }
  }

  if (result === null) {
    return (
      <Card className={`border-0 shadow-lg bg-white/90 backdrop-blur-sm ${className}`}>
        <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Estimated Value
          </CardTitle>
          <CardDescription className="text-indigo-100">
            Fill in your device details and click calculate to see the estimated resale value.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-[300px] text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
          >
            <Info className="h-16 w-16 mb-4 text-indigo-200" />
          </motion.div>
          <p className="text-indigo-600 font-medium">Enter your device details to get started</p>
          <p className="text-slate-500 mt-2 max-w-xs">
            Our smart algorithm will analyze your device specifications and provide an accurate market valuation.
          </p>
        </CardContent>
      </Card>
    )
  }

  // Calculate depreciation percentage
  const depreciation = Math.round(100 - (result / specs.originalPrice) * 100)

  // Determine factors affecting value
  const factors = []

  // Common factors
  if (specs.ageYears <= 1) {
    factors.push({ impact: "positive", text: "Device is relatively new" })
  } else if (specs.ageYears >= 5) {
    factors.push({ impact: "negative", text: "Device is older than 5 years" })
  }

  if (specs.condition === "like-new" || specs.condition === "excellent") {
    factors.push({ impact: "positive", text: "Excellent condition increases value" })
  } else if (specs.condition === "poor") {
    factors.push({ impact: "negative", text: "Poor condition significantly reduces value" })
  }

  if (specs.hasOriginalPackaging) {
    factors.push({ impact: "positive", text: "Original packaging included" })
  }

  if (specs.additionalAccessories) {
    factors.push({ impact: "positive", text: "Additional accessories included" })
  }

  // Device-specific factors
  switch (specs.type) {
    case "laptop":
    case "desktop":
      if (specs.brand === "apple") {
        factors.push({ impact: "positive", text: "Apple products retain value well" })
      }
      if ((specs as any).ram >= 16) {
        factors.push({ impact: "positive", text: "High RAM specification" })
      }
      break

    case "server":
      if ((specs as any).redundantPower) {
        factors.push({ impact: "positive", text: "Redundant power increases value" })
      }
      break

    case "workstation":
      if ((specs as any).graphicsCard && (specs as any).graphicsCard.includes("rtx")) {
        factors.push({ impact: "positive", text: "High-end graphics card" })
      }
      break

    case "network":
      if ((specs as any).manageable) {
        factors.push({ impact: "positive", text: "Manageable device" })
      }
      if ((specs as any).poe) {
        factors.push({ impact: "positive", text: "PoE capability" })
      }
      break

    case "printer":
      if ((specs as any).color) {
        factors.push({ impact: "positive", text: "Color printing capability" })
      }
      if ((specs as any).scanCapable) {
        factors.push({ impact: "positive", text: "Scanning capability" })
      }
      break

    case "monitor":
      if ((specs as any).resolution === "4k" || (specs as any).resolution === "5k") {
        factors.push({ impact: "positive", text: "High resolution display" })
      }
      if ((specs as any).refreshRate >= 144) {
        factors.push({ impact: "positive", text: "High refresh rate" })
      }
      if ((specs as any).panelType === "OLED") {
        factors.push({ impact: "positive", text: "Premium panel technology" })
      }
      break
  }

  return (
    <Card className={`border-0 shadow-lg bg-white/90 backdrop-blur-sm ${className} relative overflow-hidden`}>
      {showConfetti && <Confetti />}

      <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
        <CardTitle className="flex items-center gap-2">
          {getDeviceIcon()}
          Estimated Value
        </CardTitle>
        <CardDescription className="text-indigo-100">
          Based on current market trends and your {getDeviceTypeLabel(specs.type)} specifications
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <div className="text-center">
          <motion.div
            key={result}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mb-2"
          >
            {formatCurrency(animateValue)}
          </motion.div>

          <div className="text-sm text-slate-500">Original price: {formatCurrency(specs.originalPrice)}</div>

          <motion.div
            className="flex items-center justify-center mt-3 text-sm bg-red-50 text-red-700 rounded-full px-3 py-1 w-fit mx-auto"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <TrendingDown className="h-4 w-4 mr-1 text-red-500" />
            <span>{depreciation}% depreciation</span>
          </motion.div>
        </div>

        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-sm font-medium flex items-center gap-1 text-indigo-700">
            <Award className="h-4 w-4" /> Value Factors:
          </h3>
          <ul className="space-y-2">
            <AnimatePresence>
              {factors.map((factor, index) => (
                <motion.li
                  key={index}
                  className={`flex items-start text-sm p-2 rounded-lg ${
                    factor.impact === "positive" ? "bg-green-50" : "bg-red-50"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  {factor.impact === "positive" ? (
                    <ArrowUp className="h-4 w-4 mr-2 text-green-500 mt-0.5 shrink-0" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-2 text-red-500 mt-0.5 shrink-0" />
                  )}
                  <span className={factor.impact === "positive" ? "text-green-700" : "text-red-700"}>
                    {factor.text}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </motion.div>

        <motion.div
          className="text-xs text-slate-500 pt-4 border-t border-slate-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="mb-1 font-medium text-indigo-600">Market Insights:</p>
          <p>
            This is an estimate based on current market trends. Actual resale value may vary based on local market
            conditions, demand, and other factors specific to {getDeviceTypeLabel(specs.type).toLowerCase()} equipment.
          </p>
        </motion.div>
      </CardContent>
    </Card>
  )
}
