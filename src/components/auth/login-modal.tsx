'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'

type LoginModalProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loginType, setLoginType] = useState<'user' | 'business' | 'admin'>('user')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectLoginType = (type: 'user' | 'business' | 'admin') => {
    setLoginType(type)

    // Pre-fill email based on selected type
    if (type === 'user') {
      setFormData((prev) => ({ ...prev, email: 'user@example.com' }))
    } else if (type === 'business') {
      setFormData((prev) => ({ ...prev, email: 'business@example.com' }))
    } else if (type === 'admin') {
      setFormData((prev) => ({ ...prev, email: 'admin@agentnest.com' }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate login
    setTimeout(() => {
      if (formData.password !== 'password123') {
        setError('Invalid credentials')
        setIsLoading(false)
        return
      }

      setIsLoading(false)
      if (onSuccess) {
        onSuccess()
      }
      onClose()

      // Navigate based on user type
      if (loginType === 'admin') {
        router.push('/usage-logs')
      } else if (loginType === 'business') {
        router.push('/register-agent')
      } else {
        router.push('/')
      }
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#161b22] border-[#30363d] text-[#c9d1d9]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#c9d1d9]">Login to AgentNest</DialogTitle>
          <DialogDescription className="text-[#8b949e]">
            Access your account to use AI agents or manage your business
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <Button
            variant={loginType === 'user' ? 'default' : 'outline'}
            onClick={() => handleSelectLoginType('user')}
            className={
              loginType === 'user'
                ? 'bg-[#238636] hover:bg-[#2ea043] text-white border-[#238636]'
                : 'bg-transparent border-[#30363d] text-[#c9d1d9] hover:bg-[#21262d]'
            }
          >
            User
          </Button>
          <Button
            variant={loginType === 'business' ? 'default' : 'outline'}
            onClick={() => handleSelectLoginType('business')}
            className={
              loginType === 'business'
                ? 'bg-[#238636] hover:bg-[#2ea043] text-white border-[#238636]'
                : 'bg-transparent border-[#30363d] text-[#c9d1d9] hover:bg-[#21262d]'
            }
          >
            Business
          </Button>
          <Button
            variant={loginType === 'admin' ? 'default' : 'outline'}
            onClick={() => handleSelectLoginType('admin')}
            className={
              loginType === 'admin'
                ? 'bg-[#238636] hover:bg-[#2ea043] text-white border-[#238636]'
                : 'bg-transparent border-[#30363d] text-[#c9d1d9] hover:bg-[#21262d]'
            }
          >
            Admin
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#c9d1d9]">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-[#1f6feb]"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-[#c9d1d9]">
                Password
              </Label>
              <Button variant="link" size="sm" className="h-auto p-0 text-[#58a6ff]">
                Forgot password?
              </Button>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-[#1f6feb]"
            />
            <div className="text-xs text-[#8b949e]">For demo, use: password123</div>
          </div>

          {error && (
            <div className="text-sm text-[#f85149] bg-[#f851492a] p-2 rounded border border-[#f851493d]">{error}</div>
          )}

          <DialogFooter>
            <Button type="submit" className="w-full bg-[#238636] hover:bg-[#2ea043] text-white" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </DialogFooter>
        </form>

        <div className="text-center text-sm text-[#8b949e]">
          Don&apos;t have an account?{' '}
          <Button variant="link" className="h-auto p-0 text-[#58a6ff]">
            Sign up
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
