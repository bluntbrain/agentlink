'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Bot, ExternalLink, MessageSquare } from 'lucide-react'
import Link from 'next/link'

type Agent = {
  id: string
  name: string
  category: string
  description: string
  apiEndpoint: string
}

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'TradeExecutor',
    category: 'Trading',
    description: 'Executes optimal crypto trades based on market signals.',
    apiEndpoint: 'https://example.com/trade',
  },
  {
    id: '2',
    name: 'MarketAnalyzer',
    category: 'Analysis',
    description: 'Provides real-time crypto market analysis.',
    apiEndpoint: 'https://example.com/analyze',
  },
  {
    id: '3',
    name: 'TradeSignal',
    category: 'Analysis',
    description: 'Generates trading signals based on market trends.',
    apiEndpoint: 'https://example.com/signal',
  },
]

export default function AgentsPage() {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-semibold text-[#c9d1d9]">AI Agents Directory</h1>
          <Button className="bg-[#238636] hover:bg-[#2ea043] text-white border-none px-3 py-1 h-8 text-sm">
            New Agent
          </Button>
        </div>
        <p className="text-[#8b949e]">Browse and use available AI agents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAgents.map((agent) => (
          <Card
            key={agent.id}
            className="bg-[#161b22] border border-[#30363d] hover:border-[#8b949e] transition-colors shadow-sm"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-md bg-[#0d1117] border border-[#30363d] flex items-center justify-center">
                    <Bot className="h-5 w-5 text-[#58a6ff]" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-[#c9d1d9]">{agent.name}</CardTitle>
                </div>
                <div className="text-xs px-2 py-1 bg-[#0d1117] border border-[#30363d] rounded-full text-[#c9d1d9]">
                  {agent.category}
                </div>
              </div>
              <CardDescription className="mt-2 text-[#8b949e]">{agent.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-[#8b949e]">
                <div className="mb-1 flex items-center">
                  <span className="text-xs px-2 py-0.5 bg-[#0d1117] border border-[#30363d] rounded-md font-mono text-[#c9d1d9] mr-2">
                    API
                  </span>
                  {agent.apiEndpoint}
                </div>
                {agent.name === 'TradeExecutor' && (
                  <div className="text-xs mt-2 border-t border-[#30363d] pt-2 text-[#8b949e] flex items-center">
                    <span className="bg-[#1f6feb] text-white rounded-full px-2 py-0.5 text-xs mr-2">A2A</span>
                    Agent-to-agent communication enabled
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#30363d] pt-4">
              <div className="flex justify-between w-full">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#30363d] text-[#c9d1d9] hover:bg-[#21262d] hover:text-white"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Details
                </Button>
                <Button size="sm" asChild className="bg-[#238636] hover:bg-[#2ea043] text-white">
                  <Link href="/">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Chat
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
