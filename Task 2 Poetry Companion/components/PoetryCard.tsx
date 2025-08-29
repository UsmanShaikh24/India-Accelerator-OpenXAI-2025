import React from 'react'
import { Heart, Sparkles, BookOpen, PenTool } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface PoetryCardProps {
  title: string
  content: string
  type: 'rhyme' | 'style' | 'structure' | 'improve'
  icon?: React.ReactNode
  className?: string
}

const PoetryCard: React.FC<PoetryCardProps> = ({ 
  title, 
  content, 
  type, 
  icon,
  className = '' 
}) => {
  const getIcon = () => {
    if (icon) return icon
    
    switch (type) {
      case 'rhyme':
        return <Sparkles className="w-6 h-6 text-poetry-yellow" />
      case 'style':
        return <BookOpen className="w-6 h-6 text-poetry-blue" />
      case 'structure':
        return <PenTool className="w-6 h-6 text-poetry-teal" />
      case 'improve':
        return <Heart className="w-6 h-6 text-poetry-pink" />
      default:
        return <Sparkles className="w-6 h-6 text-poetry-purple" />
    }
  }

  const getTypeColor = () => {
    switch (type) {
      case 'rhyme':
        return 'border-poetry-yellow/30 bg-gradient-to-br from-yellow-50/50 to-orange-50/50'
      case 'style':
        return 'border-poetry-blue/30 bg-gradient-to-br from-blue-50/50 to-indigo-50/50'
      case 'structure':
        return 'border-poetry-teal/30 bg-gradient-to-br from-teal-50/50 to-cyan-50/50'
      case 'improve':
        return 'border-poetry-pink/30 bg-gradient-to-br from-pink-50/50 to-rose-50/50'
      default:
        return 'border-poetry-purple/30 bg-gradient-to-br from-purple-50/50 to-violet-50/50'
    }
  }

  return (
    <div className={`poetry-card p-6 border-2 ${getTypeColor()} ${className} fade-in`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-full bg-white/60 shadow-sm">
          {getIcon()}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 font-poetry">
          {title}
        </h3>
      </div>
      
      <div className="text-gray-700 leading-relaxed font-modern prose prose-sm max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ children }) => <h1 className="text-xl font-bold mb-3 text-gray-800">{children}</h1>,
            h2: ({ children }) => <h2 className="text-lg font-semibold mb-2 text-gray-800">{children}</h2>,
            h3: ({ children }) => <h3 className="text-base font-semibold mb-2 text-gray-800">{children}</h3>,
            p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
            ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
            li: ({ children }) => <li className="ml-2">{children}</li>,
            strong: ({ children }) => <strong className="font-semibold text-gray-800">{children}</strong>,
            em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
            blockquote: ({ children }) => <blockquote className="border-l-4 border-poetry-purple/30 pl-4 italic text-gray-600 bg-gray-50/50 py-2 rounded-r">{children}</blockquote>,
            code: ({ children }) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">{children}</code>,
            pre: ({ children }) => <pre className="bg-gray-100 p-3 rounded text-sm font-mono text-gray-800 overflow-x-auto">{children}</pre>,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default PoetryCard
