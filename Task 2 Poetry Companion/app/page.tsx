'use client'

import React, { useState } from 'react'
import { Sparkles, BookOpen, PenTool, Heart, Wand2, Quote, Feather } from 'lucide-react'
import PoetryTabs from '../components/PoetryTabs'
import PoetryInput from '../components/PoetryInput'
import PoetryCard from '../components/PoetryCard'

type TabType = 'rhyme' | 'style' | 'structure' | 'improve'

interface PoetryResponse {
  type: TabType
  input: string
  response: string
  timestamp: Date
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('rhyme')
  const [isLoading, setIsLoading] = useState(false)
  const [responses, setResponses] = useState<PoetryResponse[]>([])
  const [ollamaStatus, setOllamaStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking')

  // Check Ollama connection on component mount
  React.useEffect(() => {
    checkOllamaConnection()
  }, [])

  const checkOllamaConnection = async () => {
    try {
      const response = await fetch('/api/ollama', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'test', type: 'rhyme' })
      })
      
      if (response.ok) {
        setOllamaStatus('connected')
      } else {
        setOllamaStatus('disconnected')
      }
    } catch (error) {
      setOllamaStatus('disconnected')
    }
  }

  const handleSubmit = async (input: string) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/ollama', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, type: activeTab })
      })

      const data = await response.json()
      
      if (data.success) {
        const newResponse: PoetryResponse = {
          type: activeTab,
          input,
          response: data.response,
          timestamp: new Date()
        }
        
        setResponses(prev => [newResponse, ...prev])
      } else {
        // Handle error
        const errorResponse: PoetryResponse = {
          type: activeTab,
          input,
          response: `Error: ${data.error}`,
          timestamp: new Date()
        }
        setResponses(prev => [errorResponse, ...prev])
      }
    } catch (error) {
      const errorResponse: PoetryResponse = {
        type: activeTab,
        input,
        response: 'Failed to connect to Ollama. Please make sure it\'s running locally.',
        timestamp: new Date()
      }
      setResponses(prev => [errorResponse, ...prev])
    } finally {
      setIsLoading(false)
    }
  }

  const getTabTitle = (type: TabType) => {
    switch (type) {
      case 'rhyme': return 'Rhyming Words'
      case 'style': return 'Poetic Style Guide'
      case 'structure': return 'Poem Structure'
      case 'improve': return 'Poem Improvements'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="text-center py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-poetry-purple/20 to-poetry-pink/20">
              <Wand2 className="w-8 h-8 text-poetry-purple" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-poetry-purple to-poetry-pink bg-clip-text text-transparent font-poetry">
              Poetry Assistant
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your creative writing companion powered by AI. Discover rhymes, explore styles, 
            find structure, and improve your poetry with intelligent assistance.
          </p>
          
          {/* Ollama Status */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm">
            <div className={`w-3 h-3 rounded-full ${
              ollamaStatus === 'connected' ? 'bg-green-500' : 
              ollamaStatus === 'disconnected' ? 'bg-red-500' : 'bg-yellow-500'
            }`} />
            <span className="text-sm font-medium text-gray-700">
              {ollamaStatus === 'connected' ? 'Ollama Connected' : 
               ollamaStatus === 'disconnected' ? 'Ollama Disconnected' : 'Checking Connection...'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pb-12">
        {/* Tabs */}
        <PoetryTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Input Section */}
        <PoetryInput
          type={activeTab}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        {/* Responses Section */}
        {responses.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 text-center font-poetry">
              Your Poetry Insights
            </h2>
            
            {responses.map((response, index) => (
              <div key={index} className="fade-in">
                <div className="mb-3 text-center">
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-white/80 text-gray-600">
                    {getTabTitle(response.type)} • {response.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                
                <PoetryCard
                  title={`Response for: "${response.input}"`}
                  content={response.response}
                  type={response.type}
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {responses.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Quote className="w-12 h-12 text-poetry-purple/60" />
              <Feather className="w-12 h-12 text-poetry-pink/60" />
              <Sparkles className="w-12 h-12 text-poetry-yellow/60" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Ready to Create Poetry?
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Choose a tool above and start exploring the world of poetry. 
              Get rhyming suggestions, learn about styles, discover structures, 
              or improve your existing work.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-8 px-4 border-t border-white/20">
        <p className="text-gray-500 text-sm">
          Powered by Ollama • Built with Next.js • Designed with ❤️ for poets
        </p>
      </footer>
    </div>
  )
}
