export type DeviceType = "laptop" | "desktop" | "server" | "workstation" | "network" | "printer" | "monitor"

export type ComputerCondition = "like-new" | "excellent" | "good" | "fair" | "poor"

export interface BaseSpecs {
  type: DeviceType
  brand: string
  model: string
  ageYears: number
  originalPrice: number
  condition: ComputerCondition | string
  hasOriginalPackaging: boolean
  additionalAccessories: boolean
}

export interface ComputerSpecs extends BaseSpecs {
  processor: string
  ram: number
  storage: number
}

export interface ServerSpecs extends ComputerSpecs {
  rackUnits: number
  redundantPower: boolean
}

export interface WorkstationSpecs extends ComputerSpecs {
  graphicsCard: string
}

export interface NetworkSpecs extends BaseSpecs {
  deviceType: string
  ports: number
  manageable: boolean
  poe: boolean
}

export interface PrinterSpecs extends BaseSpecs {
  printerType: string
  color: boolean
  duplexPrinting: boolean
  scanCapable: boolean
}

export interface MonitorSpecs extends BaseSpecs {
  size: number
  resolution: string
  panelType: string
  refreshRate: number
}

export type DeviceSpecs = ComputerSpecs | ServerSpecs | WorkstationSpecs | NetworkSpecs | PrinterSpecs | MonitorSpecs
