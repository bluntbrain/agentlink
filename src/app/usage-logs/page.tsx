'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SearchIcon, FilterIcon, Download, Bot, User, Clock } from 'lucide-react'

type UsageLog = {
  id: string
  timestamp: Date
  userId: string
  userName: string
  agentIds: string[]
  agentNames: string[]
  request: string
  response: string
  pointsSpent: number
}

// Mock data
const mockLogs: UsageLog[] = [
  {
    id: '1',
    timestamp: new Date('2023-10-15T14:32:00'),
    userId: 'user123',
    userName: 'user@example.com',
    agentIds: ['1'],
    agentNames: ['TradeExecutor'],
    request: 'Execute a trade with 1 BTC',
    response: 'Trade executed: Sold 1 BTC at $65,000, profit margin: 3%.',
    pointsSpent: 10,
  },
  {
    id: '2',
    timestamp: new Date('2023-10-15T10:21:00'),
    userId: 'user123',
    userName: 'user@example.com',
    agentIds: ['2'],
    agentNames: ['MarketAnalyzer'],
    request: 'Analyze BTC market trends for the last 24h',
    response: 'BTC shows 2.3% increase with strong buying pressure and resistance at $65,500.',
    pointsSpent: 5,
  },
  {
    id: '3',
    timestamp: new Date('2023-10-14T16:45:00'),
    userId: 'user456',
    userName: 'anotheruser@example.com',
    agentIds: ['3'],
    agentNames: ['TradeSignal'],
    request: 'Generate trade signals for ETH',
    response: 'ETH shows a buy signal with target of $2,200 and stop loss at $1,950.',
    pointsSpent: 5,
  },
  {
    id: '4',
    timestamp: new Date('2023-10-14T12:15:00'),
    userId: 'user123',
    userName: 'user@example.com',
    agentIds: ['1', '2', '3'],
    agentNames: ['TradeExecutor', 'MarketAnalyzer', 'TradeSignal'],
    request: 'Execute optimal trade for ETH based on current signals',
    response: 'Bought 10 ETH at $2,050. Analysis indicates strong upward momentum.',
    pointsSpent: 15,
  },
  {
    id: '5',
    timestamp: new Date('2023-10-13T09:30:00'),
    userId: 'user789',
    userName: 'newuser@example.com',
    agentIds: ['2'],
    agentNames: ['MarketAnalyzer'],
    request: 'Analyze market sentiment for SOL',
    response: 'SOL shows neutral sentiment with equal buying and selling pressure.',
    pointsSpent: 5,
  },
]

export default function UsageLogsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredLogs, setFilteredLogs] = useState<UsageLog[]>(mockLogs)

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredLogs(mockLogs)
      return
    }

    const term = searchTerm.toLowerCase()
    const filtered = mockLogs.filter(
      (log) =>
        log.userName.toLowerCase().includes(term) ||
        log.agentNames.some((name) => name.toLowerCase().includes(term)) ||
        log.request.toLowerCase().includes(term) ||
        log.response.toLowerCase().includes(term),
    )

    setFilteredLogs(filtered)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-semibold text-[#c9d1d9]">Usage Logs</h1>
          <Button className="bg-[#238636] hover:bg-[#2ea043] text-white border-none px-3 py-1 h-8 text-sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
        <p className="text-[#8b949e]">Monitor agent usage and user activity</p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex flex-1 gap-2">
          <Input
            placeholder="Search by user, agent, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-[#1f6feb]"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button
            onClick={handleSearch}
            className="bg-[#21262d] border border-[#30363d] hover:bg-[#30363d] text-[#c9d1d9]"
          >
            <SearchIcon className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="border-[#30363d] text-[#c9d1d9] hover:bg-[#21262d]">
            <FilterIcon className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-md shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#8b949e] text-sm">Total Requests</p>
              <p className="text-2xl font-semibold text-[#c9d1d9]">54</p>
            </div>
            <div className="w-10 h-10 rounded-md bg-[#0d1117] border border-[#30363d] flex items-center justify-center">
              <Clock className="h-5 w-5 text-[#58a6ff]" />
            </div>
          </div>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-md shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#8b949e] text-sm">Active Users</p>
              <p className="text-2xl font-semibold text-[#c9d1d9]">12</p>
            </div>
            <div className="w-10 h-10 rounded-md bg-[#0d1117] border border-[#30363d] flex items-center justify-center">
              <User className="h-5 w-5 text-[#58a6ff]" />
            </div>
          </div>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-md shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#8b949e] text-sm">Points Used</p>
              <p className="text-2xl font-semibold text-[#c9d1d9]">385</p>
            </div>
            <div className="w-10 h-10 rounded-md bg-[#0d1117] border border-[#30363d] flex items-center justify-center">
              <Bot className="h-5 w-5 text-[#58a6ff]" />
            </div>
          </div>
        </div>
      </div>

      {/* Logs table */}
      <div className="rounded-md border border-[#30363d] overflow-hidden">
        <Table>
          <TableHeader className="bg-[#161b22]">
            <TableRow className="border-b-[#30363d] hover:bg-transparent">
              <TableHead className="w-[180px] text-[#8b949e] font-medium">Timestamp</TableHead>
              <TableHead className="text-[#8b949e] font-medium">User</TableHead>
              <TableHead className="text-[#8b949e] font-medium">Agent(s)</TableHead>
              <TableHead className="max-w-[200px] text-[#8b949e] font-medium">Request</TableHead>
              <TableHead className="max-w-[300px] text-[#8b949e] font-medium">Response</TableHead>
              <TableHead className="text-right text-[#8b949e] font-medium">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <TableRow key={log.id} className="border-b-[#30363d] hover:bg-[#161b22]">
                  <TableCell className="font-mono text-xs text-[#8b949e]">{formatDate(log.timestamp)}</TableCell>
                  <TableCell className="text-[#c9d1d9]">{log.userName}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {log.agentNames.map((name, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 bg-[#0d1117] border border-[#30363d] text-xs rounded-full text-[#58a6ff]"
                        >
                          {name}
                        </span>
                      ))}
                      {log.agentNames.length > 1 && (
                        <span className="px-1.5 py-0.5 bg-[#1f6feb] text-xs rounded-full text-white ml-1">A2A</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-[#c9d1d9]" title={log.request}>
                    {log.request}
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate text-[#c9d1d9]" title={log.response}>
                    {log.response}
                  </TableCell>
                  <TableCell className="text-right font-mono text-[#c9d1d9]">{log.pointsSpent}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-[#8b949e]">
                  No logs found matching your search criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 text-xs text-[#8b949e] flex justify-between items-center">
        <div>Showing 5 of 54 records</div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 border-[#30363d] text-[#c9d1d9] hover:bg-[#21262d] disabled:opacity-50"
            disabled
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" className="h-8 border-[#30363d] text-[#c9d1d9] hover:bg-[#21262d]">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
