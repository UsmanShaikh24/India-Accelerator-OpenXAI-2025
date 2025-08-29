import React, { useState } from 'react'
import { Send, Loader2, Sparkles, BookOpen, PenTool, Heart } from 'lucide-react'

interface PoetryInputProps {
  type: 'rhyme' | 'style' | 'structure' | 'improve'
  onSubmit: (input: string) => void
  isLoading?: boolean
  placeholder?: string
}

const PoetryInput: React.FC<PoetryInputProps> = ({ 
  type, 
  onSubmit, 
  isLoading = false,
  placeholder 
}) => {
  const [input, setInput] = useState('')

  const getTypeInfo = () => {
    switch (type) {
      case 'rhyme':
        return {
          title: 'Find Rhyming Words',
          description: 'Enter a word to discover beautiful rhyming options',
          icon: <Sparkles className="w-5 h-5 text-poetry-yellow" />,
          defaultPlaceholder: 'Enter a word (e.g., "love", "dream", "light")'
        }
      case 'style':
        return {
          title: 'Explore Poetic Styles',
          description: 'Learn about different poetry styles and techniques',
          icon: <BookOpen className="w-5 h-5 text-poetry-blue" />,
          defaultPlaceholder: 'Enter a style (e.g., "haiku", "sonnet", "free verse")'
        }
      case 'structure':
        return {
          title: 'Discover Poetic Structures',
          description: 'Get suggestions for poem structure and form',
          icon: <PenTool className="w-5 h-5 text-poetry-teal" />,
          defaultPlaceholder: 'Enter a theme or topic (e.g., "nature", "love", "loss")'
        }
      case 'improve':
        return {
          title: 'Improve Your Poem',
          description: 'Get feedback and suggestions to enhance your writing',
          icon: <Heart className="w-5 h-5 text-poetry-pink" />,
          defaultPlaceholder: 'Paste your poem here for improvement suggestions'
        }
      default:
        return {
          title: 'Poetry Assistant',
          description: 'Ask me anything about poetry',
          icon: <Sparkles className="w-5 h-5 text-poetry-purple" />,
          defaultPlaceholder: 'How can I help you with poetry today?'
        }
    }
  }

  const typeInfo = getTypeInfo()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSubmit(input.trim())
      // Keep the input text so users can see what they searched for
    }
  }

  return (
    <div className="poetry-card p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-full bg-gradient-to-br from-poetry-purple/20 to-poetry-pink/20">
          {typeInfo.icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 font-poetry">
            {typeInfo.title}
          </h3>
          <p className="text-gray-600 text-sm">
            {typeInfo.description}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          {type === 'improve' ? (
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder || typeInfo.defaultPlaceholder}
              className="poetry-input min-h-[120px]"
              disabled={isLoading}
            />
          ) : (
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder || typeInfo.defaultPlaceholder}
              className="poetry-input"
              disabled={isLoading}
            />
          )}
        </div>

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="poetry-button-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Get {type === 'rhyme' ? 'Rhymes' : type === 'style' ? 'Style Guide' : type === 'structure' ? 'Structure' : 'Improvements'}
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default PoetryInput
