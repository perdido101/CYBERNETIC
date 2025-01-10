const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { remixText } = require('../src/api/remix');
import { Request, Response } from 'express';

// Load environment variables
dotenv.config();

// Verify API key is present
if (!process.env.VITE_ANTHROPIC_API_KEY) {
  console.error('VITE_ANTHROPIC_API_KEY is not set in environment variables');
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/remix', async (req: Request, res: Response) => {
  try {
    const { text, style } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const remixedText = await remixText(text, style);
    res.json({ remixedText });
  } catch (error) {
    console.error('Error in /api/remix:', error);
    res.status(500).json({ 
      error: 'Failed to remix text',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Start server with retry logic
const startServer = (retryCount = 0) => {
  const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  }).on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying alternative port...`);
      if (retryCount < 3) {
        // Try next port
        const nextPort = Number(port) + 1;
        process.env.PORT = String(nextPort);
        startServer(retryCount + 1);
      } else {
        console.error('Could not find an available port after 3 attempts');
        process.exit(1);
      }
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });

  return server;
};

// Start the server
startServer();

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);
});