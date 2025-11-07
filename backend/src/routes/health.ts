import { Router } from 'express';
import { checkConnection } from '../database/connection';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// GET /api/health - Health check endpoint
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const dbHealthy = await checkConnection();

    const health = {
      status: dbHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbHealthy ? 'connected' : 'disconnected',
      version: process.env.npm_package_version || '0.1.0',
    };

    const statusCode = dbHealthy ? 200 : 503;

    res.status(statusCode).json({
      success: dbHealthy,
      data: health,
    });
  })
);

export default router;
