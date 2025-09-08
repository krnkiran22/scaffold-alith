# Alith AI Chat Application

A modern React chat interface powered by the Alith AI agent with Groq integration.

## Features

- 🤖 Real-time AI chat using Alith agent
- 📱 Responsive design for all devices
- 🎨 Clean, modern UI with Tailwind CSS
- ⚡ Fast development with Vite
- 🔄 Concurrent frontend and backend development

## Quick Start (Recommended)

Create a new Alith app with a single command:

```bash
npx create-alith-app my-alith-app
cd my-alith-app
npm run dev
```

## Manual Installation

1. **Clone and install dependencies:**

   ```bash
   git clone <repository-url>
   cd alith-app
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Groq API key:

   ```
   GROQ_API_KEY=your_actual_groq_api_key_here
   ```

3. **Start the application:**

   ```bash
   npm run dev
   ```

   This will start both the frontend (React) and backend (Alith AI server) concurrently:

   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## Project Structure

```
alith-app/
├── src/
│   ├── components/
│   │   └── ChatInterface.tsx    # Main chat component
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # App entry point
├── server.js                    # Alith AI backend server
├── .env.example                 # Environment template
└── package.json                 # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start both frontend and backend
- `npm run frontend` - Start only the React frontend
- `npm run server` - Start only the Alith AI backend
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Getting a Groq API Key

1. Go to [Groq Console](https://console.groq.com/keys)
2. Sign up or log in
3. Create a new API key
4. Copy the key to your `.env` file

## Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express, Alith AI Agent
- **AI Model:** Llama 3.3 70B (via Groq)

## License

This project is licensed under the MIT License.
