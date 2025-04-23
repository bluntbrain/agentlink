'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Bot, UserRound, RefreshCw } from 'lucide-react'

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: 'user' | 'agent'; content: string; timestamp: Date }[]>([
    {
      role: 'agent',
      content: "Hi there! I'm TradeExecutor. How can I help you with trading today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const newUserMessage = {
      role: 'user' as const,
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Simulate multi-agent responses for trade execution
      const newAgentMessage = {
        role: 'agent' as const,
        content: `Trade executed: Sold 1 BTC at $65,000, profit margin: 3%. 
        
Market analysis shows favorable conditions with low volatility. 
        
Signal strength: Strong sell recommendation based on current trends.`,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, newAgentMessage])
      setIsLoading(false)
    }, 1500)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Chat header */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#161b22] border-b border-[#30363d]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-[#0d1117] border border-[#30363d] flex items-center justify-center">
            <Bot className="h-4 w-4 text-[#58a6ff]" />
          </div>
          <h2 className="text-lg font-bold text-[#c9d1d9]">TradeExecutor</h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 bg-[#0d1117] border border-[#30363d] rounded-full text-[#c9d1d9]">
            Trading
          </span>
          <span className="bg-[#1f6feb] text-white rounded-full px-2 py-0.5 text-xs">A2A Enabled</span>
        </div>
      </div>

      {/* Chat messages container */}
      <div className="flex-1 overflow-y-auto px-6 py-6 bg-[#0d1117]">
        <div className="max-w-3xl mx-auto">
          {messages.map((message, index) => (
            <div key={index} className="mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#21262d] flex items-center justify-center flex-shrink-0 mt-1">
                  {message.role === 'agent' ? (
                    <Bot className="h-4 w-4 text-[#58a6ff]" />
                  ) : (
                    <UserRound className="h-4 w-4 text-[#c9d1d9]" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-[#c9d1d9]">
                      {message.role === 'agent' ? 'TradeExecutor' : 'You'}
                    </span>
                    <span className="text-xs text-[#8b949e]">{formatTime(message.timestamp)}</span>
                  </div>
                  <div className="text-[#c9d1d9] bg-[#161b22] rounded-md px-4 py-3 border border-[#30363d]">
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    {message.role === 'agent' && message.content.includes('Market analysis') && (
                      <div className="mt-2 pt-2 border-t border-[#30363d] text-xs text-[#8b949e] flex items-center">
                        <span className="bg-[#1f6feb] text-white rounded-full px-2 py-0.5 text-xs mr-2">
                          Powered by A2A
                        </span>
                        Using MarketAnalyzer and TradeSignal
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center justify-center py-4">
              <RefreshCw className="h-4 w-4 text-[#8b949e] animate-spin" />
              <span className="ml-2 text-sm text-[#8b949e]">TradeExecutor is thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat input */}
      <div className="border-t border-[#30363d] bg-[#161b22] p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Execute a trade with 1 BTC..."
              className="flex-1 bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-[#1f6feb]"
              maxLength={100}
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-[#238636] hover:bg-[#2ea043] text-white"
            >
              <Send className="h-4 w-4" />
              <span className="ml-2">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
