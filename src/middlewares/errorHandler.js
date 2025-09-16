import logger from '../utils/logger.js';

export default function errorHandler(err, req, res, next) {
  logger.error(err?.message ?? 'internal', { stack: err?.stack });
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
}
