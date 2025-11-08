const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const designRoutes = require('./routes/design');
const figmaRoutes = require('./routes/figma');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/design', designRoutes);
app.use('/api/figma', figmaRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'AI Figma Generator API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      'POST /api/design/generate': 'Generate design from prompt',
      'GET /api/design/:id': 'Get design by ID',
      'GET /api/design': 'List all designs',
      'GET /api/design/stats': 'Get statistics',
      'POST /api/figma/create': 'Export to Figma',
      'GET /health': 'Health check',
      'GET /api': 'API information'
    },
    features: {
      aiGeneration: true, // Groq is always available
      groqAI: true,
      openaiBackup: !!process.env.OPENAI_API_KEY,
      fallbackGeneration: true,
      figmaExport: true,
      detailedScreens: true,
      demoMode: false // Now we have real AI generation
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `${req.method} ${req.originalUrl} is not a valid endpoint`,
    availableEndpoints: [
      'GET /api',
      'GET /health',
      'POST /api/design/generate',
      'GET /api/design/:id',
      'POST /api/figma/create'
    ]
  });
});