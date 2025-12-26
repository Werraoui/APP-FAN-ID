const express = require('express');
require('dotenv').config();
const connect_db = require('./config/db_connexion');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
// CORS configuration - allow frontend origin
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (for debugging)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  if (req.method === 'POST' || req.method === 'PUT') {
    console.log('   Body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users/', require('./routes/user_routes'));
app.use('/api/fanid/', require('./routes/fan_id_routes'));
app.use('/api/documents/', require('./routes/document_routes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Fan ID API Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      users: '/api/users',
      fanid: '/api/fanid',
      documents: '/api/documents'
    }
  });
});

// Connect to database and start server
connect_db().then(() => {
  app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
    console.log(`   Health check: http://localhost:${port}/api/health`);
    console.log(`   API base URL: http://localhost:${port}/api`);
  });
}).catch((error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});

