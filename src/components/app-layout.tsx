'use client'

import { ThemeProvider } from './theme-provider'
import { Toaster } from './ui/sonner'
import { AppHeader } from '@/components/app-header'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut, User, PieChart, MessageSquare, UserPlus, LineChart, List, X } from 'lucide-react'
import { Button } from './ui/button'

// Define the visibility options for sidebar links
type Visibility = 'all' | 'admin' | 'business'

interface SidebarLink {
  label: string
  path: string
  icon: React.ReactNode
  visibleFor: Visibility
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  // In a real app, you'd check the current user role from an auth context
  const userRole: Visibility = 'all' // For demo, show all links

  const sidebarLinks: SidebarLink[] = [
    { label: 'Dashboard', path: '/', icon: <PieChart className="h-5 w-5" />, visibleFor: 'all' },
    { label: 'Agents', path: '/agents', icon: <MessageSquare className="h-5 w-5" />, visibleFor: 'all' },
    {
      label: 'Register Agent',
      path: '/register-agent',
      icon: <UserPlus className="h-5 w-5" />,
      visibleFor: 'business',
    },
    { label: 'Usage Logs', path: '/usage-logs', icon: <LineChart className="h-5 w-5" />, visibleFor: 'admin' },
    { label: 'Profile', path: '/profile', icon: <User className="h-5 w-5" />, visibleFor: 'all' },
  ]

  // Filter links based on user role
  const filteredLinks = sidebarLinks.filter((link) => {
    if (userRole === 'all') return true
    if (link.visibleFor === 'all') return true
    return link.visibleFor === userRole
  })

  const isActive = (path: string) => {
    return path === '/' ? pathname === '/' : pathname.startsWith(path)
  }

  // Check if current page is the chat page
  const isHomePage = pathname === '/'

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <div className="flex flex-col min-h-screen bg-[#0d1117]">
        <AppHeader />

        <div className="flex flex-1">
          {/* Desktop Sidebar - visible on all pages */}
          <aside className="hidden md:flex w-64 flex-col bg-[#161b22] fixed inset-y-0 pt-16 shadow-md z-10 border-r border-[#30363d]">
            <div className="flex flex-col flex-grow p-4 overflow-y-auto">
              <div className="mb-6 px-4">
                <Link href="/" className="text-xl font-bold text-[#c9d1d9]">
                  AgentNest
                </Link>
              </div>
              <nav className="flex-1 space-y-1">
                {filteredLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                      isActive(link.path)
                        ? 'bg-[#238636] text-white font-medium'
                        : 'text-[#c9d1d9] hover:bg-[#21262d] hover:text-white'
                    }`}
                  >
                    <span className="mr-3">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="pt-4 mt-auto border-t border-[#30363d]">
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-start px-4 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] hover:text-white rounded-md"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          </aside>

          {/* Mobile Sidebar Trigger - visible on all pages */}
          <div className="md:hidden fixed bottom-4 right-4 z-40">
            <Button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="rounded-full w-12 h-12 flex items-center justify-center bg-[#238636] shadow-lg"
            >
              {isMobileSidebarOpen ? <X className="h-6 w-6" /> : <List className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Sidebar */}
          {isMobileSidebarOpen && (
            <div className="md:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setIsMobileSidebarOpen(false)}>
              <aside
                className="fixed inset-y-0 left-0 w-64 bg-[#161b22] shadow-xl z-40 border-r border-[#30363d]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col h-full p-4 overflow-y-auto pt-16">
                  <div className="mb-6 px-4">
                    <Link href="/" className="text-xl font-bold text-[#c9d1d9]">
                      AgentNest
                    </Link>
                  </div>
                  <nav className="flex-1 space-y-1">
                    {filteredLinks.map((link) => (
                      <Link
                        key={link.path}
                        href={link.path}
                        className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                          isActive(link.path)
                            ? 'bg-[#238636] text-white font-medium'
                            : 'text-[#c9d1d9] hover:bg-[#21262d] hover:text-white'
                        }`}
                        onClick={() => setIsMobileSidebarOpen(false)}
                      >
                        <span className="mr-3">{link.icon}</span>
                        <span>{link.label}</span>
                      </Link>
                    ))}
                  </nav>

                  <div className="pt-4 mt-auto border-t border-[#30363d]">
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-start px-4 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] hover:text-white rounded-md"
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      <span>Logout</span>
                    </Button>
                  </div>
                </div>
              </aside>
            </div>
          )}

          {/* Main Content - with sidebar margin for all pages */}
          <main className={`flex-grow md:ml-64 ${isHomePage ? 'p-0' : 'p-4'} pt-16`}>
            {isHomePage ? (
              <div className="h-full">{children}</div>
            ) : (
              <div className="max-w-7xl mx-auto">{children}</div>
            )}
          </main>
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  )
}
