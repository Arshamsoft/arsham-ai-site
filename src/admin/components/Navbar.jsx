"use client"

import { useState } from "react"

const SearchIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

const BellIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
)

const UserIcon = () => (
  <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const MoonIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const SunIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
)

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="جستجو در پنل مدیریت..."
              className="w-full bg-input border border-border rounded-lg px-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 space-x-reverse">
          {/* Dark Mode Toggle */}
          <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-muted transition-colors">
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <BellIcon />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <UserIcon />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">ارشام</p>
              <p className="text-xs text-muted-foreground">مدیر سایت</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
