import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import app from './app.js';
import config from './config/index.js';
import logger from './utils/logger.js';

const PORT = config.port || 4000;

async function start() {
  try {
    await mongoose.connect(config.mongodbUri, { dbName: config.dbName });
    logger.info('Connected to MongoDB');
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (err) {
    logger.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
