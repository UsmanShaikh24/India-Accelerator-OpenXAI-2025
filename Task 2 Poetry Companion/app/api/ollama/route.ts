import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { prompt, type, context } = await request.json()
    
    // Ollama API endpoint (default localhost:11434)
    const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434'
    
    let systemPrompt = ''
    let userPrompt = ''
    
    switch (type) {
      case 'rhyme':
        systemPrompt = `You are a poetry assistant that suggests rhyming words. Provide 5-8 rhyming words that would work well in poetry. Be creative and consider different rhyme schemes. Use markdown formatting.`
        userPrompt = `Suggest rhyming words for: "${prompt}". Format your response with a header and list the rhyming words with bullet points.`
        break
        
      case 'style':
        systemPrompt = `You are a poetry expert. Explain the given poetic style in a clear, engaging way using markdown formatting. Structure your response with headers, bullet points, and examples.`
        userPrompt = `Explain the poetic style: "${prompt}". Use markdown formatting with headers (##), bullet points, and clear examples.`
        break
        
      case 'structure':
        systemPrompt = `You are a poetry structure expert. Suggest a poetic structure or form that would work well for the given theme or content. Use markdown formatting with clear sections and examples.`
        userPrompt = `Suggest a poetic structure for: "${prompt}". Use markdown formatting with headers (##), bullet points, and provide a brief example.`
        break
        
      case 'improve':
        systemPrompt = `You are a poetry editor. Help improve the given poem by suggesting enhancements, better word choices, or structural improvements. Be constructive and encouraging. Use markdown formatting with clear sections.`
        userPrompt = `Help improve this poem: "${prompt}". Use markdown formatting with headers (##), bullet points, and specific suggestions.`
        break
        
      default:
        systemPrompt = `You are a creative poetry assistant. Help with poetry writing, provide inspiration, and offer constructive feedback.`
        userPrompt = prompt
    }
    
    const ollamaBody = {
      model: 'llama3:latest',
      prompt: `${systemPrompt}\n\nUser: ${userPrompt}\n\nAssistant:`,
      stream: false,
      options: {
        temperature: 0.7,
        top_p: 0.9,
      }
    }
    
    const response = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ollamaBody)
    })
    
    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    return NextResponse.json({
      success: true,
      response: data.response,
      model: data.model,
    })
    
  } catch (error) {
    console.error('Ollama API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to connect to Ollama. Make sure it\'s running locally on port 11434.' 
      },
      { status: 500 }
    )
  }
}