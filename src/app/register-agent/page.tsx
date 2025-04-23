'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Bot, CheckCircle2, AlertCircle, Plus, Trash2 } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { AgentCard as AgentCardType, AgentSkill } from '@/lib/types'

// Define a type that makes all properties and nested properties optional
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

type PartialAgentCard = DeepPartial<AgentCardType>
type PartialAgentSkill = DeepPartial<AgentSkill>

export default function RegisterAgentPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Trading',
    apiEndpoint: '',
    supportsA2A: false,
  })

  const [agentCard, setAgentCard] = useState<PartialAgentCard>({
    name: '',
    description: '',
    url: '',
    provider: {
      organization: '',
      url: '',
    },
    version: '1.0.0',
    documentationUrl: '',
    capabilities: {
      streaming: false,
      pushNotifications: false,
      stateTransitionHistory: false,
    },
    authentication: {
      schemes: ['api_key'],
    },
    defaultInputModes: ['text/plain'],
    defaultOutputModes: ['text/plain'],
    skills: [],
  })

  const [currentSkill, setCurrentSkill] = useState<PartialAgentSkill>({
    id: '',
    name: '',
    description: '',
    tags: [],
    examples: [],
    inputModes: ['text/plain'],
    outputModes: ['text/plain'],
  })

  const [currentTag, setCurrentTag] = useState('')
  const [currentExample, setCurrentExample] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAgentCardChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Simple property update
    if (!name.includes('.')) {
      setAgentCard((prev) => ({ ...prev, [name]: value }))
      return
    }

    // Handle nested properties
    const [parentKey, childKey] = name.split('.') as [keyof PartialAgentCard & string, string]

    if (parentKey === 'provider') {
      // Use type assertion to help TypeScript understand the structure
      setAgentCard((prev) => {
        const providerObj = prev.provider || {}
        return {
          ...prev,
          provider: {
            ...providerObj,
            [childKey]: value,
          },
        } as PartialAgentCard
      })
    } else if (parentKey === 'capabilities') {
      setAgentCard((prev) => {
        const capabilitiesObj = prev.capabilities || {}
        return {
          ...prev,
          capabilities: {
            ...capabilitiesObj,
            [childKey]: value === 'true',
          },
        } as PartialAgentCard
      })
    } else if (parentKey === 'authentication') {
      setAgentCard((prev) => {
        const authObj = prev.authentication || {}
        return {
          ...prev,
          authentication: {
            ...authObj,
            [childKey]:
              childKey === 'schemes'
                ? value
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean)
                : value,
          },
        } as PartialAgentCard
      })
    }
  }

  const handleCapabilityChange = (capability: keyof AgentCardType['capabilities'], checked: boolean) => {
    setAgentCard((prev) => {
      const capabilitiesObj = prev.capabilities || {}
      return {
        ...prev,
        capabilities: {
          ...capabilitiesObj,
          [capability]: checked,
        },
      } as PartialAgentCard
    })
  }

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentSkill((prev) => ({ ...prev, [name]: value }))
  }

  const addTag = () => {
    if (currentTag.trim()) {
      setCurrentSkill((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), currentTag.trim()],
      }))
      setCurrentTag('')
    }
  }

  const removeTag = (index: number) => {
    setCurrentSkill((prev) => ({
      ...prev,
      tags: prev.tags?.filter((_, i) => i !== index),
    }))
  }

  const addExample = () => {
    if (currentExample.trim()) {
      setCurrentSkill((prev) => ({
        ...prev,
        examples: [...(prev.examples || []), currentExample.trim()],
      }))
      setCurrentExample('')
    }
  }

  const removeExample = (index: number) => {
    setCurrentSkill((prev) => ({
      ...prev,
      examples: prev.examples?.filter((_, i) => i !== index),
    }))
  }

  const addSkill = () => {
    if (currentSkill.name && currentSkill.description) {
      const newSkill = {
        ...currentSkill,
        id: currentSkill.id || `skill-${Date.now()}`, // Generate an ID if not provided
      } as AgentSkill

      setAgentCard((prev) => {
        const skillsArray = prev.skills || []
        return {
          ...prev,
          skills: [...skillsArray, newSkill],
        } as PartialAgentCard
      })

      // Reset current skill
      setCurrentSkill({
        id: '',
        name: '',
        description: '',
        tags: [],
        examples: [],
        inputModes: ['text/plain'],
        outputModes: ['text/plain'],
      })
    }
  }

  const removeSkill = (index: number) => {
    setAgentCard((prev) => {
      const skillsArray = prev.skills || []
      return {
        ...prev,
        skills: skillsArray.filter((_, i) => i !== index),
      } as PartialAgentCard
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Prepare the complete agent data
    const agentData = {
      ...formData,
      agentCard: formData.supportsA2A ? agentCard : undefined,
    }

    // In a real app, this would send data to an API
    console.log('Submitting agent:', agentData)
    setIsSubmitted(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        description: '',
        category: 'Trading',
        apiEndpoint: '',
        supportsA2A: false,
      })
      setAgentCard({
        name: '',
        description: '',
        url: '',
        provider: {
          organization: '',
          url: '',
        },
        version: '1.0.0',
        documentationUrl: '',
        capabilities: {
          streaming: false,
          pushNotifications: false,
          stateTransitionHistory: false,
        },
        authentication: {
          schemes: ['api_key'],
        },
        defaultInputModes: ['text/plain'],
        defaultOutputModes: ['text/plain'],
        skills: [],
      })
    }, 3000)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2 text-[#c9d1d9]">Register a New AI Agent</h1>
        <p className="text-[#8b949e]">Add your custom AI agent to the platform</p>
      </div>

      <div className="max-w-3xl">
        <Card className="bg-[#161b22] border-[#30363d] shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-[#c9d1d9]">Agent Information</CardTitle>
            <CardDescription className="text-[#8b949e]">
              Fill out the form below to register your agent on AgentNest
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#238636]/20 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-[#3fb950]" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-[#c9d1d9]">Agent Registered Successfully!</h3>
                <p className="text-[#8b949e]">
                  Your agent has been added to the platform and is now available for users.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-[#c9d1d9]">Basic Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#c9d1d9]">
                      Agent Name*
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g., TradeExecutor"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-[#1f6feb] focus-visible:border-[#1f6feb]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-[#c9d1d9]">
                      Description*
                    </Label>
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Describe what your agent does..."
                      value={formData.description}
                      onChange={handleChange}
                      required
                      className="min-h-[100px] w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm shadow-sm placeholder:text-[#8b949e] text-[#c9d1d9] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1f6feb] focus-visible:border-[#1f6feb] disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-[#c9d1d9]">
                      Category*
                    </Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1f6feb] text-[#c9d1d9]"
                    >
                      <option value="Trading">Trading</option>
                      <option value="Analysis">Analysis</option>
                      <option value="Yield">Yield</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apiEndpoint" className="text-[#c9d1d9]">
                      API Endpoint*
                    </Label>
                    <Input
                      id="apiEndpoint"
                      name="apiEndpoint"
                      placeholder="https://example.com/api"
                      value={formData.apiEndpoint}
                      onChange={handleChange}
                      required
                      className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-[#1f6feb] focus-visible:border-[#1f6feb]"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="supportsA2A"
                      checked={formData.supportsA2A}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, supportsA2A: checked }))}
                    />
                    <Label htmlFor="supportsA2A" className="text-[#c9d1d9]">
                      Support Agent-to-Agent (A2A) Protocol
                    </Label>
                  </div>
                </div>

                {/* A2A Protocol Fields */}
                {formData.supportsA2A && (
                  <>
                    <div className="border-t border-[#30363d] pt-6 space-y-6">
                      <h3 className="text-lg font-medium text-[#c9d1d9]">A2A Protocol Information</h3>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="agentCardName" className="text-[#c9d1d9]">
                              Agent Card Name*
                            </Label>
                            <Input
                              id="agentCardName"
                              name="name"
                              placeholder="e.g., TradeExecutor"
                              value={agentCard.name}
                              onChange={handleAgentCardChange}
                              className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-[#1f6feb]"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="version" className="text-[#c9d1d9]">
                              Version*
                            </Label>
                            <Input
                              id="version"
                              name="version"
                              placeholder="e.g., 1.0.0"
                              value={agentCard.version}
                              onChange={handleAgentCardChange}
                              className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-[#1f6feb]"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="agentCardDescription" className="text-[#c9d1d9]">
                            Agent Card Description*
                          </Label>
                          <textarea
                            id="agentCardDescription"
                            name="description"
                            placeholder="Detailed description of your agent capabilities..."
                            value={agentCard.description}
                            onChange={handleAgentCardChange}
                            className="min-h-[100px] w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm shadow-sm placeholder:text-[#8b949e] text-[#c9d1d9] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1f6feb] disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="url" className="text-[#c9d1d9]">
                              Agent URL*
                            </Label>
                            <Input
                              id="url"
                              name="url"
                              placeholder="https://example.com/agents/trade-executor"
                              value={agentCard.url}
                              onChange={handleAgentCardChange}
                              className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-[#1f6feb]"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="documentationUrl" className="text-[#c9d1d9]">
                              Documentation URL
                            </Label>
                            <Input
                              id="documentationUrl"
                              name="documentationUrl"
                              placeholder="https://example.com/docs/trade-executor"
                              value={agentCard.documentationUrl}
                              onChange={handleAgentCardChange}
                              className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-[#1f6feb]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Provider Information */}
                    <div className="border-t border-[#30363d] pt-6 space-y-4">
                      <h3 className="text-lg font-medium text-[#c9d1d9]">Provider Information</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="providerOrganization" className="text-[#c9d1d9]">
                            Organization Name*
                          </Label>
                          <Input
                            id="providerOrganization"
                            name="provider.organization"
                            placeholder="e.g., Your Company Name"
                            value={agentCard.provider?.organization}
                            onChange={handleAgentCardChange}
                            className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-[#1f6feb]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="providerUrl" className="text-[#c9d1d9]">
                            Organization URL*
                          </Label>
                          <Input
                            id="providerUrl"
                            name="provider.url"
                            placeholder="https://example.com"
                            value={agentCard.provider?.url}
                            onChange={handleAgentCardChange}
                            className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-[#1f6feb]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Capabilities */}
                    <div className="border-t border-[#30363d] pt-6 space-y-4">
                      <h3 className="text-lg font-medium text-[#c9d1d9]">Agent Capabilities</h3>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="streaming"
                            checked={agentCard.capabilities?.streaming || false}
                            onCheckedChange={(checked) => handleCapabilityChange('streaming', checked)}
                          />
                          <Label htmlFor="streaming" className="text-[#c9d1d9]">
                            Streaming
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id="pushNotifications"
                            checked={agentCard.capabilities?.pushNotifications || false}
                            onCheckedChange={(checked) => handleCapabilityChange('pushNotifications', checked)}
                          />
                          <Label htmlFor="pushNotifications" className="text-[#c9d1d9]">
                            Push Notifications
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id="stateTransitionHistory"
                            checked={agentCard.capabilities?.stateTransitionHistory || false}
                            onCheckedChange={(checked) => handleCapabilityChange('stateTransitionHistory', checked)}
                          />
                          <Label htmlFor="stateTransitionHistory" className="text-[#c9d1d9]">
                            State Transition History
                          </Label>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="defaultInputModes" className="text-[#c9d1d9]">
                            Default Input Modes (comma-separated)*
                          </Label>
                          <Input
                            id="defaultInputModes"
                            name="defaultInputModes"
                            placeholder="text/plain, application/json"
                            value={agentCard.defaultInputModes?.join(', ')}
                            onChange={(e) =>
                              setAgentCard(
                                (prev) =>
                                  ({
                                    ...prev,
                                    defaultInputModes: e.target.value
                                      .split(',')
                                      .map((s) => s.trim())
                                      .filter(Boolean),
                                  }) as PartialAgentCard,
                              )
                            }
                            className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-[#1f6feb]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="defaultOutputModes" className="text-[#c9d1d9]">
                            Default Output Modes (comma-separated)*
                          </Label>
                          <Input
                            id="defaultOutputModes"
                            name="defaultOutputModes"
                            placeholder="text/plain, application/json"
                            value={agentCard.defaultOutputModes?.join(', ')}
                            onChange={(e) =>
                              setAgentCard(
                                (prev) =>
                                  ({
                                    ...prev,
                                    defaultOutputModes: e.target.value
                                      .split(',')
                                      .map((s) => s.trim())
                                      .filter(Boolean),
                                  }) as PartialAgentCard,
                              )
                            }
                            className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-[#1f6feb]"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="authSchemes" className="text-[#c9d1d9]">
                          Authentication Schemes (comma-separated)*
                        </Label>
                        <Input
                          id="authSchemes"
                          name="authSchemes"
                          placeholder="api_key, oauth2"
                          value={agentCard.authentication?.schemes?.join(', ')}
                          onChange={(e) =>
                            setAgentCard(
                              (prev) =>
                                ({
                                  ...prev,
                                  authentication: {
                                    ...prev.authentication,
                                    schemes: e.target.value
                                      .split(',')
                                      .map((s) => s.trim())
                                      .filter(Boolean),
                                  },
                                }) as PartialAgentCard,
                            )
                          }
                          className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-[#1f6feb]"
                        />
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="border-t border-[#30363d] pt-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-[#c9d1d9]">Agent Skills</h3>
                        <Button
                          type="button"
                          variant="outline"
                          className="h-8 border-[#30363d] text-[#c9d1d9] hover:bg-[#21262d] hover:text-white"
                          onClick={addSkill}
                          disabled={!currentSkill.name || !currentSkill.description}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Skill
                        </Button>
                      </div>

                      {/* Current skills list */}
                      {agentCard.skills && agentCard.skills.length > 0 && (
                        <div className="space-y-2 mb-4">
                          <Label className="text-[#c9d1d9]">Added Skills</Label>
                          <div className="space-y-2">
                            {agentCard.skills.map(
                              (skill, index) =>
                                skill && (
                                  <div
                                    key={skill.id || index}
                                    className="p-3 rounded-md bg-[#0d1117] border border-[#30363d] flex justify-between items-start"
                                  >
                                    <div>
                                      <h4 className="font-medium text-[#c9d1d9]">{skill.name || 'Unnamed Skill'}</h4>
                                      <p className="text-sm text-[#8b949e]">{skill.description || ''}</p>
                                      {skill.tags && skill.tags.length > 0 && (
                                        <div className="mt-1 flex flex-wrap gap-1">
                                          {skill.tags.map((tag, i) => (
                                            <span
                                              key={i}
                                              className="px-1.5 py-0.5 bg-[#1f6feb]/20 text-xs rounded-full text-[#58a6ff]"
                                            >
                                              {tag}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      className="h-8 text-[#f85149] hover:text-white hover:bg-[#f85149]/20"
                                      onClick={() => removeSkill(index)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ),
                            )}
                          </div>
                        </div>
                      )}

                      {/* Skill form */}
                      <div className="p-4 rounded-md bg-[#161b22] border border-[#30363d]">
                        <h4 className="font-medium text-[#c9d1d9] mb-3">Add a New Skill</h4>

                        <div className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label htmlFor="skillName" className="text-[#c9d1d9]">
                                Skill Name*
                              </Label>
                              <Input
                                id="skillName"
                                name="name"
                                placeholder="e.g., Market Analysis"
                                value={currentSkill.name}
                                onChange={handleSkillChange}
                                className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-[#1f6feb]"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="skillId" className="text-[#c9d1d9]">
                                Skill ID
                              </Label>
                              <Input
                                id="skillId"
                                name="id"
                                placeholder="e.g., market-analysis"
                                value={currentSkill.id}
                                onChange={handleSkillChange}
                                className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-[#1f6feb]"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="skillDescription" className="text-[#c9d1d9]">
                              Skill Description*
                            </Label>
                            <textarea
                              id="skillDescription"
                              name="description"
                              placeholder="Describe what this skill does..."
                              value={currentSkill.description}
                              onChange={handleSkillChange}
                              className="min-h-[80px] w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm shadow-sm placeholder:text-[#8b949e] text-[#c9d1d9] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1f6feb] disabled:cursor-not-allowed disabled:opacity-50"
                            />
                          </div>

                          {/* Tags */}
                          <div className="space-y-2">
                            <Label className="text-[#c9d1d9]">Tags</Label>
                            <div className="flex items-center gap-2">
                              <Input
                                value={currentTag}
                                onChange={(e) => setCurrentTag(e.target.value)}
                                placeholder="Add a tag"
                                className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-[#1f6feb]"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                className="h-9 px-2 border-[#30363d] text-[#c9d1d9] hover:bg-[#21262d] hover:text-white"
                                onClick={addTag}
                                disabled={!currentTag.trim()}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            {currentSkill.tags && currentSkill.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {currentSkill.tags.map((tag, index) => (
                                  <div
                                    key={index}
                                    className="px-2 py-1 bg-[#1f6feb]/20 rounded-full text-[#58a6ff] text-xs flex items-center gap-1"
                                  >
                                    {tag}
                                    <button
                                      type="button"
                                      onClick={() => removeTag(index)}
                                      className="text-[#58a6ff] hover:text-white"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Examples */}
                          <div className="space-y-2">
                            <Label className="text-[#c9d1d9]">Examples</Label>
                            <div className="flex items-center gap-2">
                              <Input
                                value={currentExample}
                                onChange={(e) => setCurrentExample(e.target.value)}
                                placeholder="Add an example"
                                className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-[#1f6feb]"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                className="h-9 px-2 border-[#30363d] text-[#c9d1d9] hover:bg-[#21262d] hover:text-white"
                                onClick={addExample}
                                disabled={!currentExample.trim()}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            {currentSkill.examples && currentSkill.examples.length > 0 && (
                              <div className="space-y-1 mt-2">
                                {currentSkill.examples.map((example, index) => (
                                  <div
                                    key={index}
                                    className="p-2 bg-[#0d1117] rounded-md text-[#c9d1d9] text-sm flex justify-between items-center"
                                  >
                                    <span>{example}</span>
                                    <button
                                      type="button"
                                      onClick={() => removeExample(index)}
                                      className="text-[#f85149] hover:text-white"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="p-3 rounded-md bg-[#0d1117] border border-[#f0883e] border-opacity-30 flex items-start mt-4">
                  <AlertCircle className="h-5 w-5 text-[#f0883e] mr-2 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-[#c9d1d9]">
                    <p className="font-medium mb-1">Note about API Endpoints</p>
                    <p className="text-[#8b949e]">
                      Make sure your API endpoint is secure and accessible. The endpoint should accept POST requests and
                      return JSON responses.{' '}
                      {formData.supportsA2A &&
                        'A2A Protocol information will enhance agent-to-agent communication capabilities.'}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full bg-[#238636] hover:bg-[#2ea043] text-white">
                    <Bot className="mr-2 h-4 w-4" />
                    Register Agent
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
