# Poetry Assistant 🎭✨

A beautiful, modern poetry writing tool powered by Next.js and Ollama. Get rhyming suggestions, explore poetic styles, discover structures, and improve your poetry with AI assistance.

## ✨ Features

- **🎯 Rhyme Finder**: Discover beautiful rhyming words for your poetry
- **📚 Style Explorer**: Learn about different poetic styles and techniques
- **🏗️ Structure Guide**: Get suggestions for poem structure and form
- **💝 Poem Improver**: Receive feedback and suggestions to enhance your writing
- **🎨 Beautiful UI**: Modern, responsive design with smooth animations
- **🤖 AI Powered**: Integrated with Ollama for intelligent poetry assistance
- **📱 Responsive**: Works perfectly on desktop, tablet, and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Ollama installed and running locally

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd poetry-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start Ollama** (in a separate terminal)
   ```bash
   ollama serve
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Ollama Setup

1. **Install Ollama** from [ollama.ai](https://ollama.ai)
2. **Pull a model** (recommended: llama3)
   ```bash
   ollama pull llama3
   ```
3. **Start Ollama service**
   ```bash
   ollama serve
   ```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Optional: Custom Ollama URL (default: http://localhost:11434)
OLLAMA_URL=http://localhost:11434
```

## 🎨 Usage

### Finding Rhymes
1. Select the "Rhymes" tab
2. Enter a word (e.g., "love", "dream", "light")
3. Get instant rhyming suggestions

### Exploring Styles
1. Select the "Styles" tab
2. Enter a style name (e.g., "haiku", "sonnet", "free verse")
3. Learn about the style with examples and tips

### Discovering Structure
1. Select the "Structure" tab
2. Enter a theme or topic (e.g., "nature", "love", "loss")
3. Get suggestions for poetic structure and form

### Improving Poems
1. Select the "Improve" tab
2. Paste your poem in the textarea
3. Receive constructive feedback and suggestions

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React
- **AI**: Ollama integration
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
poetry-assistant/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── ollama/        # Ollama integration
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── PoetryCard.tsx     # Response display card
│   ├── PoetryInput.tsx    # Input forms
│   └── PoetryTabs.tsx     # Tab navigation
├── public/                # Static assets
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
└── README.md              # This file
```

## 🎯 Customization

### Changing the AI Model

Edit `app/api/ollama/route.ts` and change the model name:

```typescript
body: JSON.stringify({
  model: 'llama3:latest', // Change to your preferred model
  // ... other options
})
```

### Adding New Poetry Tools

1. Add new tab type to the `TabType` union
2. Update the API route with new prompt types
3. Add corresponding UI components

### Styling Customization

Modify `tailwind.config.js` to add custom colors and animations:

```javascript
theme: {
  extend: {
    colors: {
      'custom-color': '#your-hex-code',
    },
    animation: {
      'custom-animation': 'customKeyframes 2s ease-in-out',
    }
  }
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The app is built with standard Next.js and can be deployed to any platform that supports Node.js applications.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Ollama](https://ollama.ai/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**Happy Poetry Writing! 🎭✨**
