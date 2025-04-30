import type { DeviceSpecs, DeviceType } from "./types"

export function calculateResaleValue(specs: DeviceSpecs): number {
  // Base value starts at a percentage of original price based on age
  const basePercentage = getBasePercentageByAge(specs.ageYears)
  let baseValue = specs.originalPrice * basePercentage

  // Apply brand factor
  baseValue *= getBrandFactor(specs.type, specs.brand)

  // Apply condition factor
  baseValue *= getConditionFactor(specs.condition)

  // Apply device-specific factors
  switch (specs.type) {
    case "laptop":
    case "desktop":
      baseValue = calculateComputerValue(baseValue, specs as any)
      break
    case "server":
      baseValue = calculateServerValue(baseValue, specs as any)
      break
    case "workstation":
      baseValue = calculateWorkstationValue(baseValue, specs as any)
      break
    case "network":
      baseValue = calculateNetworkValue(baseValue, specs as any)
      break
    case "printer":
      baseValue = calculatePrinterValue(baseValue, specs as any)
      break
    case "monitor":
      baseValue = calculateMonitorValue(baseValue, specs as any)
      break
  }

  // Apply common additional factors
  if (specs.hasOriginalPackaging) {
    baseValue *= 1.05 // 5% increase for original packaging
  }

  if (specs.additionalAccessories) {
    baseValue *= 1.08 // 8% increase for accessories
  }

  // Round to nearest dollar
  return Math.round(baseValue)
}

function getBasePercentageByAge(ageYears: number): number {
  // Devices typically depreciate quickly in the first few years
  if (ageYears <= 0.5) return 0.8 // 0-6 months: 80% of original value
  if (ageYears <= 1) return 0.7 // 6-12 months: 70% of original value
  if (ageYears <= 2) return 0.55 // 1-2 years: 55% of original value
  if (ageYears <= 3) return 0.4 // 2-3 years: 40% of original value
  if (ageYears <= 4) return 0.3 // 3-4 years: 30% of original value
  if (ageYears <= 5) return 0.25 // 4-5 years: 25% of original value
  if (ageYears <= 7) return 0.15 // 5-7 years: 15% of original value
  return 0.1 // 7+ years: 10% of original value
}

function getBrandFactor(deviceType: DeviceType, brand: string): number {
  const lowerBrand = brand.toLowerCase()

  switch (deviceType) {
    case "laptop":
    case "desktop":
      if (lowerBrand === "apple") return 1.3 // Apple products retain value better
      if (lowerBrand === "microsoft") return 1.15 // Surface products also retain value well
      if (lowerBrand === "dell" || lowerBrand === "lenovo") return 1.05 // Business-class brands
      if (lowerBrand === "hp" || lowerBrand === "asus") return 1.0 // Standard brands
      if (lowerBrand === "acer") return 0.95 // Slightly lower retention
      return 0.9 // Other brands

    case "server":
      if (lowerBrand === "dell emc" || lowerBrand === "hpe") return 1.2 // Top server brands
      if (lowerBrand === "cisco" || lowerBrand === "lenovo") return 1.15
      if (lowerBrand === "ibm" || lowerBrand === "oracle") return 1.1
      return 1.0 // Other server brands

    case "workstation":
      if (lowerBrand === "apple") return 1.3 // Apple workstations retain value
      if (lowerBrand === "hp" || lowerBrand === "dell") return 1.15 // Top workstation brands
      if (lowerBrand === "lenovo" || lowerBrand === "boxx") return 1.1
      return 1.0 // Other workstation brands

    case "network":
      if (lowerBrand === "cisco" || lowerBrand === "juniper") return 1.25 // Premium network brands
      if (lowerBrand === "arista" || lowerBrand === "palo alto") return 1.2
      if (lowerBrand === "hpe/aruba" || lowerBrand === "fortinet") return 1.15
      if (lowerBrand === "ubiquiti" || lowerBrand === "meraki") return 1.1
      return 1.0 // Other network brands

    case "printer":
      if (lowerBrand === "hp" || lowerBrand === "canon") return 1.15 // Top printer brands
      if (lowerBrand === "xerox" || lowerBrand === "ricoh") return 1.1
      if (lowerBrand === "brother" || lowerBrand === "epson") return 1.05
      return 1.0 // Other printer brands

    case "monitor":
      if (lowerBrand === "apple") return 1.3 // Apple displays retain value
      if (lowerBrand === "dell" || lowerBrand === "lg") return 1.15 // Premium monitor brands
      if (lowerBrand === "samsung" || lowerBrand === "asus") return 1.1
      return 1.0 // Other monitor brands

    default:
      return 1.0
  }
}

function getConditionFactor(condition: string): number {
  switch (condition) {
    case "like-new":
      return 1.2
    case "excellent":
      return 1.1
    case "good":
      return 1.0
    case "fair":
      return 0.8
    case "poor":
      return 0.6
    default:
      return 1.0
  }
}

// Computer-specific calculations (laptops and desktops)
function calculateComputerValue(baseValue: number, specs: any): number {
  // Apply processor factor
  baseValue *= getProcessorFactor(specs.processor)

  // Apply RAM factor
  baseValue *= getRamFactor(specs.ram)

  // Apply storage factor
  baseValue *= getStorageFactor(specs.storage)

  // Apply type-specific adjustments
  if (specs.type === "laptop") {
    // Laptops generally retain value better than desktops
    baseValue *= 1.1
  }

  return baseValue
}

// Server-specific calculations
function calculateServerValue(baseValue: number, specs: any): number {
  // Apply processor factor
  baseValue *= getProcessorFactor(specs.processor)

  // Apply RAM factor (servers typically have more RAM)
  baseValue *= getServerRamFactor(specs.ram)

  // Apply storage factor
  baseValue *= getStorageFactor(specs.storage)

  // Apply rack units factor
  baseValue *= getRackUnitsFactor(specs.rackUnits)

  // Apply redundant power factor
  if (specs.redundantPower) {
    baseValue *= 1.1 // 10% increase for redundant power
  }

  return baseValue
}

// Workstation-specific calculations
function calculateWorkstationValue(baseValue: number, specs: any): number {
  // Apply processor factor
  baseValue *= getProcessorFactor(specs.processor)

  // Apply RAM factor
  baseValue *= getRamFactor(specs.ram)

  // Apply storage factor
  baseValue *= getStorageFactor(specs.storage)

  // Apply graphics card factor
  baseValue *= getGraphicsCardFactor(specs.graphicsCard)

  return baseValue
}

// Network device-specific calculations
function calculateNetworkValue(baseValue: number, specs: any): number {
  // Apply device type factor
  baseValue *= getNetworkDeviceTypeFactor(specs.deviceType)

  // Apply ports factor
  baseValue *= getPortsFactor(specs.ports)

  // Apply manageable factor
  if (specs.manageable) {
    baseValue *= 1.15 // 15% increase for manageable devices
  }

  // Apply PoE factor
  if (specs.poe) {
    baseValue *= 1.12 // 12% increase for PoE support
  }

  return baseValue
}

// Printer-specific calculations
function calculatePrinterValue(baseValue: number, specs: any): number {
  // Apply printer type factor
  baseValue *= getPrinterTypeFactor(specs.printerType)

  // Apply color factor
  if (specs.color) {
    baseValue *= 1.15 // 15% increase for color printing
  }

  // Apply duplex printing factor
  if (specs.duplexPrinting) {
    baseValue *= 1.08 // 8% increase for duplex printing
  }

  // Apply scan capability factor
  if (specs.scanCapable) {
    baseValue *= 1.12 // 12% increase for scan capability
  }

  return baseValue
}

// Monitor-specific calculations
function calculateMonitorValue(baseValue: number, specs: any): number {
  // Apply size factor
  baseValue *= getMonitorSizeFactor(specs.size)

  // Apply resolution factor
  baseValue *= getResolutionFactor(specs.resolution)

  // Apply panel type factor
  baseValue *= getPanelTypeFactor(specs.panelType)

  // Apply refresh rate factor
  baseValue *= getRefreshRateFactor(specs.refreshRate)

  return baseValue
}

// Helper functions for specific factors

function getProcessorFactor(processor: string): number {
  // Premium for newer/higher-end processors
  if (["i9", "ryzen9", "m3"].includes(processor)) return 1.2
  if (["i7", "ryzen7", "m2"].includes(processor)) return 1.15
  if (["i5", "ryzen5", "m1"].includes(processor)) return 1.1
  if (["i3", "ryzen3"].includes(processor)) return 1.0
  return 0.95 // Other/older processors
}

function getRamFactor(ram: number): number {
  if (ram >= 32) return 1.15
  if (ram >= 16) return 1.1
  if (ram >= 8) return 1.0
  return 0.9 // Less than 8GB
}

function getServerRamFactor(ram: number): number {
  if (ram >= 128) return 1.25
  if (ram >= 64) return 1.2
  if (ram >= 32) return 1.15
  if (ram >= 16) return 1.1
  return 1.0 // Less than 16GB
}

function getStorageFactor(storage: number): number {
  if (storage >= 2048) return 1.15 // 2TB+
  if (storage >= 1024) return 1.1 // 1TB
  if (storage >= 512) return 1.05 // 512GB
  if (storage >= 256) return 1.0 // 256GB
  return 0.95 // Less than 256GB
}

function getRackUnitsFactor(rackUnits: number): number {
  if (rackUnits >= 5) return 1.2 // 5U+
  if (rackUnits >= 3) return 1.15 // 3-4U
  if (rackUnits === 2) return 1.1 // 2U
  return 1.0 // 1U
}

function getGraphicsCardFactor(graphicsCard: string): number {
  if (graphicsCard.includes("rtx_4090") || graphicsCard.includes("rtx_4080")) return 1.25
  if (graphicsCard.includes("rtx_3090") || graphicsCard.includes("rtx_3080")) return 1.2
  if (graphicsCard.includes("quadro")) return 1.15
  if (graphicsCard.includes("radeon_pro")) return 1.1
  return 1.0 // Other or no graphics card
}

function getNetworkDeviceTypeFactor(deviceType: string): number {
  if (deviceType === "firewall") return 1.15
  if (deviceType === "router") return 1.1
  if (deviceType === "switch") return 1.05
  return 1.0 // Other network device types
}

function getPortsFactor(ports: number): number {
  if (ports >= 96) return 1.2
  if (ports >= 48) return 1.15
  if (ports >= 24) return 1.1
  if (ports >= 16) return 1.05
  return 1.0 // 8 ports or less
}

function getPrinterTypeFactor(printerType: string): number {
  if (printerType === "laser") return 1.15
  if (printerType === "led") return 1.1
  if (printerType === "inkjet") return 1.0
  if (printerType === "thermal") return 1.05
  return 0.95 // Other printer types
}

function getMonitorSizeFactor(size: number): number {
  if (size >= 40) return 1.2
  if (size >= 32) return 1.15
  if (size >= 27) return 1.1
  if (size >= 24) return 1.05
  return 1.0 // Less than 24 inches
}

function getResolutionFactor(resolution: string): number {
  if (resolution === "5k") return 1.25
  if (resolution === "4k") return 1.2
  if (resolution === "ultrawide") return 1.15
  if (resolution === "1440p") return 1.1
  if (resolution === "1080p") return 1.0
  return 0.95 // Lower resolutions
}

function getPanelTypeFactor(panelType: string): number {
  if (panelType === "OLED") return 1.25
  if (panelType === "Mini-LED") return 1.2
  if (panelType === "IPS") return 1.1
  if (panelType === "VA") return 1.05
  return 1.0 // TN or other panel types
}

function getRefreshRateFactor(refreshRate: number): number {
  if (refreshRate >= 240) return 1.2
  if (refreshRate >= 165) return 1.15
  if (refreshRate >= 144) return 1.1
  if (refreshRate >= 75) return 1.05
  return 1.0 // 60Hz or lower
}
