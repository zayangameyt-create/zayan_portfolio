import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';

import { env } from './config/env.js';
import { apiLimiter } from './middleware/rateLimiters.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import contactRouter from './routes/contactRoutes.js';

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = new Set([
  ...env.FRONTEND_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean),
  'https://zayanithub.site',
  'https://www.zayanithub.site',
]);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('Origin is not allowed by CORS'));
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Body parser
app.use(express.json({ limit: '10kb', strict: true }));

// API rate limiter
app.use('/api', apiLimiter);

// Root route
app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Zayan Portfolio API is running 🚀',
    health: '/api/health',
  });
});

// Health check
app.get('/api/health', (_req, res) => {
  const databaseReady = mongoose.connection.readyState === 1;

  return res.status(databaseReady ? 200 : 503).json({
    status: databaseReady ? 'ok' : 'unavailable',
    database: databaseReady ? 'connected' : 'disconnected',
  });
});

// Contact API
app.use('/api/contact', contactRouter);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

export default app;