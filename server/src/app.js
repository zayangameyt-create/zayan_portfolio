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
app.use(helmet());
app.use(cors({
  origin: env.FRONTEND_ORIGIN,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json({ limit: '10kb', strict: true }));
app.use('/api', apiLimiter);

app.get('/api/health', (_req, res) => {
  const databaseReady = mongoose.connection.readyState === 1;
  return res.status(databaseReady ? 200 : 503).json({
    status: databaseReady ? 'ok' : 'unavailable',
    database: databaseReady ? 'connected' : 'disconnected',
  });
});

app.use('/api/contact', contactRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
