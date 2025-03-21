const { logger } = require('./logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  // Handling specific Prisma errors
  if (err.code) {
    switch (err.code) {
      case 'P2002':
        return res.status(409).json({ 
          message: 'Resource already exists with the same unique constraint' 
        });
      case 'P2025':
        return res.status(404).json({ 
          message: 'Record not found' 
        });
      default:
        break;
    }
  }

  // Default error response
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
};

module.exports = { errorHandler };