import 'dotenv/config';
import app from './app.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { env } from './config/env.js';

let server;

async function startServer() {
  await connectDatabase();
  server = app.listen(env.PORT, () => {
    console.info(`Portfolio API listening on port ${env.PORT}`);
  });
}

async function shutdown(signal) {
  console.info(`${signal} received. Shutting down the API.`);
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
  await disconnectDatabase();
  process.exit(0);
}

process.once('SIGINT', () => shutdown('SIGINT'));
process.once('SIGTERM', () => shutdown('SIGTERM'));

startServer().catch((error) => {
  console.error('Portfolio API failed to start:', error.message);
  process.exitCode = 1;
});
