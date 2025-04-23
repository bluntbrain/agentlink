'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Bell, User, LogIn, Plus } from 'lucide-react'
import { ThemeSelect } from '@/components/theme-select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { LoginModal } from './auth/login-modal'

export function AppHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Default to logged in for demo
  // This is just for demo purposes to show unread notifications
  const unreadNotifications = 3
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  // Points balance for demo
  const pointsBalance = 90

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 px-4 py-3 bg-[#0d1117] border-b border-[#30363d] shadow-sm">
      <div className="mx-auto max-w-full flex justify-between items-center h-full">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link className="text-xl font-bold text-white flex items-center gap-2" href="/">
            <svg width="24" height="24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="64" height="64" rx="12" fill="#0d1117" />
              <path
                d="M16 20C16 17.7909 17.7909 16 20 16H44C46.2091 16 48 17.7909 48 20V44C48 46.2091 46.2091 48 44 48H20C17.7909 48 16 46.2091 16 44V20Z"
                fill="#2C2C2C"
              />
              <path
                d="M28 32C28 27.5817 31.5817 24 36 24C40.4183 24 44 27.5817 44 32C44 36.4183 40.4183 40 36 40C31.5817 40 28 36.4183 28 32Z"
                fill="#3498DB"
              />
              <path
                d="M20 32C20 29.7909 21.7909 28 24 28C26.2091 28 28 29.7909 28 32C28 34.2091 26.2091 36 24 36C21.7909 36 20 34.2091 20 32Z"
                fill="#3498DB"
              />
              <path d="M32 20L36 28L32 36L28 28L32 20Z" fill="#3498DB" />
            </svg>
            <span className="hidden md:inline">AgentNest</span>
          </Link>

          {/* Navigation - GitHub style */}
          {isLoggedIn && (
            <nav className="hidden md:flex">
              <ul className="flex gap-1">
                <li>
                  <Link href="/agents" className="px-3 py-2 text-sm text-[#c9d1d9] hover:text-white">
                    Agents
                  </Link>
                </li>
                <li>
                  <Link href="/register-agent" className="px-3 py-2 text-sm text-[#c9d1d9] hover:text-white">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/usage-logs" className="px-3 py-2 text-sm text-[#c9d1d9] hover:text-white">
                    Usage Logs
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              {/* Points balance pill - Always visible */}
              <div className="flex items-center bg-[#161b22] border border-[#30363d] text-[#c9d1d9] rounded-full px-3 py-1">
                <span className="text-sm font-medium">{pointsBalance} points</span>
              </div>

              {/* Create/Plus button - GitHub style */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-[#c9d1d9] hover:text-white">
                    <Plus className="h-4 w-4 mr-1" />
                    <span className="hidden md:inline">Create</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#161b22] border-[#30363d]">
                  <DropdownMenuItem className="text-[#c9d1d9] hover:text-white hover:bg-[#30363d]">
                    New Agent
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-[#c9d1d9] hover:text-white hover:bg-[#30363d]">
                    Import Agent
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative text-[#c9d1d9] hover:text-white">
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#238636] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </Button>

              {/* User dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full bg-[#30363d] h-8 w-8">
                    <User className="h-4 w-4 text-[#c9d1d9]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-[#161b22] border-[#30363d]">
                  <DropdownMenuLabel className="text-[#c9d1d9]">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#30363d]" />
                  <DropdownMenuItem asChild className="text-[#c9d1d9] hover:text-white hover:bg-[#30363d]">
                    <Link href="/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-[#c9d1d9] hover:text-white hover:bg-[#30363d]">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#30363d]" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-[#c9d1d9] hover:text-white hover:bg-[#30363d]"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={() => setIsLoginModalOpen(true)}
              className="gap-1 bg-[#238636] hover:bg-[#2ea043] text-white"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          )}

          {/* Theme toggle */}
          <ThemeSelect />
        </div>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onSuccess={handleLogin} />
    </header>
  )
}
