import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Poetry Assistant - Your Creative Writing Companion',
  description: 'A beautiful poetry writing tool that helps you create, rhyme, and explore poetic styles with AI assistance.',
  keywords: 'poetry, writing, rhymes, creative writing, AI assistant, ollama',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
