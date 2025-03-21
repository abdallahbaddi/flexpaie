require('dotenv').config();
const app = require('./app');
const { logger } = require('./utils/logger');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    // Test database connection
    await prisma.$connect();
    logger.info('Connected to the database successfully');

    // Start the server
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  } finally {
    // Close Prisma when the application is shutting down
    process.on('SIGINT', async () => {
      await prisma.$disconnect();
      logger.info('Disconnected from the database');
      process.exit(0);
    });
  }
}

startServer();