"use client"

import { useEffect, useState } from "react"
import { Phone } from "lucide-react"

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center">
            <MapleLeafAnimated className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
              Resale Calculator
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

function MapleLeafAnimated({ className }: { className?: string }) {
  const [hover, setHover] = useState(false)

  return (
    <div className={`${className} relative`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <svg
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-all duration-700 ${hover ? "scale-110 rotate-12" : ""}`}
      >
        <path
          d="M256.1 0C255.9 101.9 254.2 122.8 220.7 156.1C215.3 161.5 208.8 162.1 203.4 158.5C198 154.9 196.1 148.8 198.5 142.6C206.9 120.9 210.1 98.7 210.1 76.8C210.1 76.8 185.7 94.1 180.3 133.6C179.5 139.6 175.3 144.4 169.5 145.8C163.7 147.2 157.6 144.9 154.2 139.9C143.5 124.2 138.7 105.7 138.7 87.1C138.7 87.1 120.6 105.9 120.6 145.8C120.6 152.6 115.3 158.3 108.5 159C101.7 159.7 95.3 155.9 93.1 149.4C84.7 125.6 83.1 100.7 88.5 76.8C88.5 76.8 65.7 95.8 65.7 134.9C65.7 141.7 60.4 147.4 53.6 148.1C46.8 148.8 40.4 145 38.2 138.5C29.8 114.7 28.2 89.8 33.6 65.9C33.6 65.9 10.8 84.9 10.8 124C10.8 130.8 5.5 136.5 0 137.2V169.1C0 169.1 33.6 169.1 33.6 196.8C33.6 224.5 0 224.5 0 252.2C0 279.9 33.6 279.9 33.6 307.6C33.6 335.3 0 335.3 0 363C0 390.7 33.6 390.7 33.6 418.4C33.6 446.1 0 446.1 0 473.8V512H512V473.8C512 446.1 478.4 446.1 478.4 418.4C478.4 390.7 512 390.7 512 363C512 335.3 478.4 335.3 478.4 307.6C478.4 279.9 512 279.9 512 252.2C512 224.5 478.4 224.5 478.4 196.8C478.4 169.1 512 169.1 512 169.1V137.2C506.5 136.5 501.2 130.8 501.2 124C501.2 84.9 478.4 65.9 478.4 65.9C483.8 89.8 482.2 114.7 473.8 138.5C471.6 145 465.2 148.8 458.4 148.1C451.6 147.4 446.3 141.7 446.3 134.9C446.3 95.8 423.5 76.8 423.5 76.8C428.9 100.7 427.3 125.6 418.9 149.4C416.7 155.9 410.3 159.7 403.5 159C396.7 158.3 391.4 152.6 391.4 145.8C391.4 105.9 373.3 87.1 373.3 87.1C373.3 105.7 368.5 124.2 357.8 139.9C354.4 144.9 348.3 147.2 342.5 145.8C336.7 144.4 332.5 139.6 331.7 133.6C326.3 94.1 301.9 76.8 301.9 76.8C301.9 98.7 305.1 120.9 313.5 142.6C315.9 148.8 314 154.9 308.6 158.5C303.2 162.1 296.7 161.5 291.3 156.1C257.8 122.8 256.1 101.9 256.1 0H256.1Z"
          fill="#D80621"
          className="animate-pulse"
        />
      </svg>
      <div
        className={`absolute -inset-1 bg-red-500 rounded-full blur-md opacity-0 ${hover ? "opacity-20" : ""} transition-opacity duration-700`}
      ></div>
    </div>
  )
}

function ScrollingBanner() {
  return (
    <div className="bg-blue-600 text-white py-2 overflow-hidden">
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
      className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110"
      onMouseEnter={() => setIsRinging(true)}
      onMouseLeave={() => setIsRinging(false)}
    >
      <Phone className={`h-6 w-6 ${isRinging ? "animate-wiggle" : ""}`} />
      <span className="sr-only">Call 905-564-5593</span>
      <div
        className={`absolute -inset-1 bg-blue-400 rounded-full blur-md opacity-0 ${isRinging ? "opacity-50" : ""} transition-opacity duration-300`}
      ></div>
    </a>
  )
}
