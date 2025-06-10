"use client"

import { useEffect, useState } from "react"
import { Phone, Calculator } from "lucide-react"

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center">
            {/* Completely replaced the calculator with a new implementation */}
            <NewCalculatorIcon className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Alta E-Resale Calculator v2
            </span>
          </a>
        </div>
        <nav className="flex items-center gap-4">
          <a
            href="/admin/login"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-lock"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            Admin Login
          </a>
        </nav>
      </div>
      <ScrollingBanner />
      <FloatingPhoneButton />
    </header>
  )
}

// Completely new calculator icon implementation
function NewCalculatorIcon({ className }: { className?: string }) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    // Animate every 3 seconds
    const interval = setInterval(() => {
      setAnimate(true)
      setTimeout(() => setAnimate(false), 1000)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`${className} relative`}>
      <div className={`transition-all duration-500 ${animate ? "scale-110 rotate-12" : ""}`}>
        <Calculator className="h-full w-full text-purple-600" />
      </div>
      <div
        className={`absolute -inset-1 bg-purple-500 rounded-full blur-md opacity-0 
        ${animate ? "opacity-30" : ""} transition-opacity duration-500`}
      ></div>
    </div>
  )
}

function ScrollingBanner() {
  return (
    <div className="bg-purple-600 text-white py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        <span className="mx-4 text-sm font-medium">
          We buy your old IT Equipment - Call for quote:
          <a href="tel:9055645593" className="ml-2 font-bold hover:underline">
            905-564-5593
          </a>
        </span>
        <span className="mx-4 text-sm font-medium">
          We buy your old IT Equipment - Call for quote:
          <a href="tel:9055645593" className="ml-2 font-bold hover:underline">
            905-564-5593
          </a>
        </span>
        <span className="mx-4 text-sm font-medium">
          We buy your old IT Equipment - Call for quote:
          <a href="tel:9055645593" className="ml-2 font-bold hover:underline">
            905-564-5593
          </a>
        </span>
      </div>
    </div>
  )
}

function FloatingPhoneButton() {
  const [isRinging, setIsRinging] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRinging(true)
      setTimeout(() => setIsRinging(false), 1000)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <a
      href="tel:9055645593"
      className="fixed bottom-6 right-6 z-50 bg-purple-600 text-white rounded-full p-4 shadow-lg hover:bg-purple-700 transition-all duration-300 hover:scale-110"
      onMouseEnter={() => setIsRinging(true)}
      onMouseLeave={() => setIsRinging(false)}
    >
      <Phone className={`h-6 w-6 ${isRinging ? "animate-wiggle" : ""}`} />
      <span className="sr-only">Call 905-564-5593</span>
      <div
        className={`absolute -inset-1 bg-purple-400 rounded-full blur-md opacity-0 ${isRinging ? "opacity-50" : ""} transition-opacity duration-300`}
      ></div>
    </a>
  )
}
