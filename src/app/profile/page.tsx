'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UserIcon, Settings, KeyRound, CreditCard, BarChart3, Plus, Zap } from 'lucide-react'

export default function ProfilePage() {
  // User data would typically come from an API or auth provider
  const user = {
    email: 'user@example.com',
    name: 'John Doe',
    points: 90,
    joinDate: new Date('2023-01-15'),
    totalAgentsUsed: 3,
    totalRequests: 42,
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2 text-[#c9d1d9]">Your Profile</h1>
        <p className="text-[#8b949e]">Manage your account and settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="md:col-span-2 bg-[#161b22] border-[#30363d] shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#0d1117] border border-[#30363d] flex items-center justify-center">
                <UserIcon className="h-8 w-8 text-[#58a6ff]" />
              </div>
              <div>
                <CardTitle className="text-2xl text-[#c9d1d9]">{user.name}</CardTitle>
                <CardDescription className="text-[#8b949e]">{user.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#c9d1d9]">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={user.name}
                  readOnly
                  className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] focus-visible:ring-[#1f6feb]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#c9d1d9]">
                  Email
                </Label>
                <Input
                  id="email"
                  value={user.email}
                  readOnly
                  className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] focus-visible:ring-[#1f6feb]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="joined" className="text-[#c9d1d9]">
                  Joined
                </Label>
                <Input
                  id="joined"
                  value={user.joinDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  readOnly
                  className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] focus-visible:ring-[#1f6feb]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="points" className="text-[#c9d1d9]">
                  Points Balance
                </Label>
                <Input
                  id="points"
                  value={user.points}
                  readOnly
                  className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] focus-visible:ring-[#1f6feb]"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-[#30363d] pt-4">
            <div className="flex gap-2">
              <Button variant="outline" className="border-[#30363d] text-[#c9d1d9] hover:bg-[#21262d] hover:text-white">
                <Settings className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="outline" className="border-[#30363d] text-[#c9d1d9] hover:bg-[#21262d] hover:text-white">
                <KeyRound className="mr-2 h-4 w-4" />
                Change Password
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Stats Card */}
        <Card className="bg-[#161b22] border-[#30363d] shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="text-base text-[#c9d1d9]">Usage Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center border-b border-[#30363d] pb-2">
              <div className="text-sm text-[#8b949e]">Total Agents Used</div>
              <div className="font-semibold text-[#c9d1d9]">{user.totalAgentsUsed}</div>
            </div>
            <div className="flex justify-between items-center border-b border-[#30363d] pb-2">
              <div className="text-sm text-[#8b949e]">Total Requests</div>
              <div className="font-semibold text-[#c9d1d9]">{user.totalRequests}</div>
            </div>
            <div className="flex justify-between items-center border-b border-[#30363d] pb-2">
              <div className="text-sm text-[#8b949e]">Available Points</div>
              <div className="font-semibold text-[#c9d1d9]">{user.points}</div>
            </div>
            <div className="pt-2">
              <Button
                variant="outline"
                className="w-full border-[#30363d] text-[#c9d1d9] hover:bg-[#21262d] hover:text-white"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                View Detailed Stats
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Info */}
        <Card className="md:col-span-3 bg-[#161b22] border-[#30363d] shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-[#c9d1d9]">Subscription & Billing</CardTitle>
            <CardDescription className="text-[#8b949e]">Manage your subscription and payment methods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-[#30363d] rounded-lg p-4 bg-[#0d1117]">
                <div className="text-sm font-medium mb-2 text-[#c9d1d9]">Current Plan</div>
                <div className="text-2xl font-bold mb-1 text-[#c9d1d9]">Free Tier</div>
                <div className="text-[#8b949e] text-sm mb-4">100 Points per month</div>
                <Button size="sm" className="w-full bg-[#238636] hover:bg-[#2ea043] text-white">
                  <Plus className="h-3 w-3 mr-1" />
                  Upgrade
                </Button>
              </div>

              <div className="border border-[#30363d] rounded-lg p-4 bg-[#0d1117]">
                <div className="text-sm font-medium mb-2 text-[#c9d1d9]">Points Usage</div>
                <div className="flex items-end gap-2">
                  <div className="text-2xl font-bold text-[#c9d1d9]">{user.points}</div>
                  <div className="text-[#8b949e] text-sm">/ 100 points</div>
                </div>
                <div className="h-2 bg-[#21262d] rounded-full mt-2 mb-4">
                  <div className="h-2 bg-[#1f6feb] rounded-full" style={{ width: `${100 - user.points}%` }}></div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-[#30363d] text-[#c9d1d9] hover:bg-[#21262d] hover:text-white"
                >
                  <CreditCard className="mr-2 h-3 w-3" />
                  Buy Points
                </Button>
              </div>

              <div className="border border-[#30363d] rounded-lg p-4 bg-[#0d1117]">
                <div className="text-sm font-medium mb-2 text-[#c9d1d9]">Renewal Date</div>
                <div className="text-xl font-semibold mb-1 text-[#c9d1d9]">
                  {new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <div className="text-[#8b949e] text-sm mb-4">Your free points will reset</div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-[#30363d] text-[#c9d1d9] hover:bg-[#21262d] hover:text-white"
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Manage Billing
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
