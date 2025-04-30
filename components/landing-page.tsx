"use client"
import { Laptop, Monitor, Server, Workflow, Network, Printer, ScreenShare } from "lucide-react"
import ResaleCalculator from "./resale-calculator"

export default function LandingPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-violet-50 via-indigo-50 to-cyan-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block animate-bounce-slow mb-4">
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
              Comprehensive IT Equipment Valuation
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-violet-700 via-indigo-600 to-cyan-600 bg-clip-text text-transparent sm:text-5xl mb-3">
            Multi-Device Resale Calculator
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Get accurate market valuations for all your IT equipment - from computers and servers to network gear and
            peripherals.
          </p>
        </div>

        <ResaleCalculator />

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-6 text-center">Supported Device Categories</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-7 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Laptop className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-medium text-sm">Laptops</h3>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
              <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Monitor className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="font-medium text-sm">Desktops</h3>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Server className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-medium text-sm">Servers</h3>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
              <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Workflow className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="font-medium text-sm">Workstations</h3>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Network className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-medium text-sm">Network Gear</h3>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
              <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Printer className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="font-medium text-sm">Printers</h3>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <ScreenShare className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-medium text-sm">Monitors</h3>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Why Use Our Calculator?</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 text-xl font-bold">1</span>
              </div>
              <h3 className="font-medium text-lg mb-2">Comprehensive Coverage</h3>
              <p className="text-slate-500">Valuations for all types of IT equipment in one place</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-violet-600 text-xl font-bold">2</span>
              </div>
              <h3 className="font-medium text-lg mb-2">Up-to-Date Models</h3>
              <p className="text-slate-500">Includes the latest models from the past 6 years</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-cyan-600 text-xl font-bold">3</span>
              </div>
              <h3 className="font-medium text-lg mb-2">Detailed Analysis</h3>
              <p className="text-slate-500">Understand exactly what affects your device's value</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
