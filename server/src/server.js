import 'dotenv/config';

import app from './app.js';
import {
  connectDatabase,
  disconnectDatabase,
} from './config/database.js';

import { env } from './config/env.js';

let server;

async function startServer() {
  try {
    await connectDatabase();

    const PORT = env.PORT || process.env.PORT || 5000;

    server = app.listen(PORT, '0.0.0.0', () => {
      console.info(`Portfolio API listening on port ${PORT}`);
    });

  } catch (error) {
    console.error('Portfolio API failed to start:', error.message);
    process.exit(1);
  }
}

async function shutdown(signal) {
  console.info(`${signal} received. Shutting down the API.`);

  if (server) {
    await new Promise((resolve) => {
      server.close(resolve);
    });
  }

  await disconnectDatabase();

  process.exit(0);
}

process.once('SIGINT', () => shutdown('SIGINT'));
process.once('SIGTERM', () => shutdown('SIGTERM'));

startServer();