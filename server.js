import { Agent } from 'alith';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

// Initialize Alith agent
const agent = new Agent({
  model: "llama3-70b-8192",
  apiKey: process.env.GROQ_API_KEY,
  baseUrl: "https://api.groq.com/openai/v1",
});

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Received message:', message);
    
    // Use Alith agent to get response
    const response = await agent.prompt(message);
    
    console.log('AI response:', response);
    
    res.json({ response });
  } catch (error) {
    console.error('Error getting AI response:', error);
    res.status(500).json({ 
      error: 'Failed to get AI response',
      details: error.message 
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Alith AI server is running' });
});

app.listen(port, () => {
  console.log(`Alith AI server running at http://localhost:${port}`);
});
