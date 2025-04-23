'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Bot, Send } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

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

type Message = {
  id: string
  content: string
  sender: 'user' | 'agent'
  timestamp: Date
  agentName?: string
  badge?: 'A2A' | undefined
}

export function DashboardFeature() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [points, setPoints] = useState(100)

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgent(agent)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim() || !selectedAgent) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')

    // Simulate API response after a delay
    setTimeout(() => {
      let response = ''
      let pointsDeduction = 0
      let badge: 'A2A' | undefined = undefined

      // Simulate different responses based on agent
      if (selectedAgent.name === 'TradeExecutor') {
        response = 'Trade executed: Sold 1 BTC at $65,000, profit margin: 3%.'
        pointsDeduction = 10
        badge = 'A2A' // This agent uses A2A communication

        // Add responses from the other agents that were consulted
        const marketAnalyzerResponse: Message = {
          id: Date.now().toString() + '-1',
          content: 'Market analysis: BTC is in a downtrend with strong resistance at $66,200.',
          sender: 'agent',
          timestamp: new Date(),
          agentName: 'MarketAnalyzer',
        }

        const tradeSignalResponse: Message = {
          id: Date.now().toString() + '-2',
          content: 'Signal generated: SELL BTC at market price. Take profit at $63,500.',
          sender: 'agent',
          timestamp: new Date(),
          agentName: 'TradeSignal',
        }

        setMessages((prev) => [...prev, marketAnalyzerResponse, tradeSignalResponse])
      } else if (selectedAgent.name === 'MarketAnalyzer') {
        response =
          'Market analysis: BTC is currently trading in a range between $64,200 and $65,800 with increased volume.'
        pointsDeduction = 5
      } else if (selectedAgent.name === 'TradeSignal') {
        response = 'Signal: HOLD BTC. Wait for confirmation of breakout above $66,000.'
        pointsDeduction = 5
      }

      // Add agent response
      const agentResponse: Message = {
        id: Date.now().toString() + '-response',
        content: response,
        sender: 'agent',
        timestamp: new Date(),
        agentName: selectedAgent.name,
        badge,
      }

      setMessages((prev) => [...prev, agentResponse])
      setPoints((prev) => prev - pointsDeduction)
    }, 1000)
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
      {/* Left side - Agent Selection and Chat */}
      <Card className="md:col-span-8 bg-card border-border shadow-sm">
        <CardHeader className="border-b border-border p-4">
          <CardTitle className="text-lg font-semibold">Chat with AI Agents</CardTitle>
          <CardDescription>Select an agent and start your conversation</CardDescription>
        </CardHeader>

        <CardContent className="p-4">
          {/* Agent Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Select Agent</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {mockAgents.map((agent) => (
                <Button
                  key={agent.id}
                  variant={selectedAgent?.id === agent.id ? 'default' : 'outline'}
                  className="flex items-center justify-start text-left h-auto py-2"
                  onClick={() => handleAgentSelect(agent)}
                >
                  <Bot className="mr-2 h-4 w-4" />
                  <div>
                    <div className="font-medium">{agent.name}</div>
                    <div className="text-xs opacity-70">{agent.category}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-64 overflow-y-auto border rounded-md p-2 mb-4 bg-background">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <Bot className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p>Select an agent and start a conversation</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-2 rounded-lg max-w-[80%] ${
                      msg.sender === 'user' ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted'
                    }`}
                  >
                    {msg.agentName && (
                      <div className="text-xs font-medium mb-1 flex items-center">
                        {msg.agentName}
                        {msg.badge && (
                          <span className="ml-2 px-1.5 py-0.5 text-[10px] rounded bg-accent text-accent-foreground">
                            Powered by {msg.badge}
                          </span>
                        )}
                      </div>
                    )}
                    <div>{msg.content}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="border-t border-border p-4">
          <div className="flex items-center w-full gap-2">
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={!selectedAgent}
              maxLength={100}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!selectedAgent || !inputValue.trim()} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Right side - Info Cards */}
      <div className="md:col-span-4 space-y-4">
        {/* Points Card */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Points Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{points}</div>
            <p className="text-sm text-muted-foreground">Available Points</p>
          </CardContent>
        </Card>

        {/* Selected Agent Info */}
        {selectedAgent && (
          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{selectedAgent.name}</CardTitle>
              <CardDescription className="text-xs">Category: {selectedAgent.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{selectedAgent.description}</p>

              {selectedAgent.name === 'TradeExecutor' && (
                <div className="mt-3 text-xs text-muted-foreground border-t border-border pt-2">
                  <p>This agent uses A2A communication with:</p>
                  <ul className="list-disc list-inside mt-1">
                    <li>MarketAnalyzer</li>
                    <li>TradeSignal</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
