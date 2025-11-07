import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { securityHeaders, apiLimiter, corsOptions } from './middleware/security';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { checkConnection } from './database/connection';

// Import routes
import healthRoutes from './routes/health';
import resourcesRoutes from './routes/resources';
import principlesRoutes from './routes/principles';
import authRoutes from './routes/auth';
import cooperationRoutes from './routes/cooperation';
import automationRoutes from './routes/automation';
import environmentalRoutes from './routes/environmental';
import socialRoutes from './routes/social';
import citiesRoutes from './routes/cities';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security and middleware
app.use(securityHeaders);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Apply rate limiting to all API routes
app.use('/api/', apiLimiter);

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'RBE Platform API',
    version: '1.0.0',
    documentation: '/api/health',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      resources: '/api/resources',
      principles: '/api/principles',
      cooperation: '/api/cooperation',
      automation: '/api/automation',
      environmental: '/api/environmental',
      social: '/api/social',
      cities: '/api/cities',
    },
  });
});

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourcesRoutes);
app.use('/api/principles', principlesRoutes);
app.use('/api/cooperation', cooperationRoutes);
app.use('/api/automation', automationRoutes);
app.use('/api/environmental', environmentalRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/cities', citiesRoutes);

// Error handlers (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Check database connection
    const dbConnected = await checkConnection();
    if (!dbConnected) {
      console.warn('Warning: Database connection failed. Some features may not work.');
    }

    app.listen(PORT, () => {
      console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   RBE Platform API Server                                    ║
║   Resource-Based Economy Global Management System            ║
║                                                              ║
║   Status: Running                                            ║
║   Port: ${PORT}                                              ║
║   Environment: ${process.env.NODE_ENV || 'development'}      ║
║   Database: ${dbConnected ? 'Connected' : 'Disconnected'}    ║
║                                                              ║
║   Endpoints:                                                 ║
║   - GET  /                        API Information            ║
║   - GET  /api/health              Health Check               ║
║   - GET  /api/resources           Resources Management       ║
║   - GET  /api/principles          100 Principles Tracking    ║
║                                                              ║
║   "The future is not something that happens to us,          ║
║    but something we create." - Jacque Fresco                ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

startServer();

export default app;
