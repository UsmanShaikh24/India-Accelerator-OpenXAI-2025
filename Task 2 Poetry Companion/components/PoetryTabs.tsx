import React from 'react'
import { Sparkles, BookOpen, PenTool, Heart } from 'lucide-react'

interface PoetryTabsProps {
  activeTab: 'rhyme' | 'style' | 'structure' | 'improve'
  onTabChange: (tab: 'rhyme' | 'style' | 'structure' | 'improve') => void
}

const PoetryTabs: React.FC<PoetryTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'rhyme' as const,
      label: 'Rhymes',
      icon: <Sparkles className="w-5 h-5" />,
      color: 'text-poetry-yellow border-poetry-yellow'
    },
    {
      id: 'style' as const,
      label: 'Styles',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'text-poetry-blue border-poetry-blue'
    },
    {
      id: 'structure' as const,
      label: 'Structure',
      icon: <PenTool className="w-5 h-5" />,
      color: 'text-poetry-teal border-poetry-teal'
    },
    {
      id: 'improve' as const,
      label: 'Improve',
      icon: <Heart className="w-5 h-5" />,
      color: 'text-poetry-pink border-poetry-pink'
    }
  ]

  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300
            ${activeTab === tab.id 
              ? `bg-white/90 shadow-lg border-2 ${tab.color} transform scale-105` 
              : 'bg-white/60 text-gray-600 border-2 border-transparent hover:bg-white/80 hover:scale-105'
            }
          `}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default PoetryTabs
