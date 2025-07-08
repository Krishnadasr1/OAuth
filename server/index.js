import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import apiRoutes from './routes/api.js';
import { configurePassport } from './config/passport.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet({
  contentSecurityPolicy: false, 
}));

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan('combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', 
    httpOnly: true, 
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

app.use(passport.initialize());
app.use(passport.session());

configurePassport();

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Node.js Express OAuth Tutorial API',
    version: '1.0.0',
    endpoints: {
      auth: {
        '/auth/google': 'Initiate Google OAuth',
        '/auth/google/callback': 'Google OAuth callback',
        '/auth/logout': 'Logout user',
        '/auth/user': 'Get current user info'
      },
      api: {
        '/api/profile': 'Get user profile (protected)',
        '/api/dashboard': 'Get dashboard data (protected)'
      },
      system: {
        '/health': 'System health check',
        '/': 'API documentation'
      }
    },
    documentation: 'This is a tutorial implementation of OAuth with Node.js and Express'
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}`);
  console.log(`🔐 Google OAuth: http://localhost:${PORT}/auth/google`);
  console.log(`💡 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  if (!process.env.GOOGLE_CLIENT_ID) {
    console.warn('⚠️  GOOGLE_CLIENT_ID not set - OAuth will not work');
  }
});