import { Router } from 'express';
import { query } from '../database/connection';
import { asyncHandler } from '../middleware/errorHandler';
import { validateBody, registerUserSchema, loginUserSchema } from '../middleware/validation';
import { generateToken, hashPassword, comparePassword, authenticate, AuthRequest } from '../middleware/auth';
import { authLimiter } from '../middleware/security';
import { ApiResponse } from '../types';

const router = Router();

// POST /api/auth/register - Register new user
router.post(
  '/register',
  authLimiter,
  validateBody(registerUserSchema),
  asyncHandler(async (req, res) => {
    const { email, username, password, region } = req.body;

    // Check if user already exists
    const existingUser = await query('SELECT id FROM users WHERE email = $1 OR username = $2', [
      email,
      username,
    ]);

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        error: 'User with this email or username already exists',
      });
    }

    // Hash password
    const password_hash = await hashPassword(password);

    // Create user
    const result = await query(
      `INSERT INTO users (email, username, password_hash, region, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, email, username, role, region, created_at`,
      [email, username, password_hash, region, 'contributor']
    );

    const user = result.rows[0];

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response: ApiResponse<any> = {
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          region: user.region,
          created_at: user.created_at,
        },
        token,
      },
      message: 'User registered successfully',
    };

    res.status(201).json(response);
  })
);

// POST /api/auth/login - Login user
router.post(
  '/login',
  authLimiter,
  validateBody(loginUserSchema),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user
    const result = await query('SELECT * FROM users WHERE email = $1 AND is_active = true', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    const user = result.rows[0];

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    // Update last login
    await query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [user.id]);

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response: ApiResponse<any> = {
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          region: user.region,
          last_login: new Date(),
        },
        token,
      },
      message: 'Login successful',
    };

    res.json(response);
  })
);

// GET /api/auth/me - Get current user
router.get(
  '/me',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const result = await query('SELECT id, email, username, role, region, created_at, last_login FROM users WHERE id = $1', [
      req.user!.userId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    const response: ApiResponse<any> = {
      success: true,
      data: result.rows[0],
    };

    res.json(response);
  })
);

// POST /api/auth/refresh - Refresh token
router.post(
  '/refresh',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    // Generate new token with same payload
    const token = generateToken({
      userId: req.user!.userId,
      email: req.user!.email,
      role: req.user!.role,
    });

    const response: ApiResponse<any> = {
      success: true,
      data: { token },
      message: 'Token refreshed successfully',
    };

    res.json(response);
  })
);

// PUT /api/auth/change-password - Change password
router.put(
  '/change-password',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Current password and new password are required',
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        error: 'New password must be at least 8 characters',
      });
    }

    // Get user
    const result = await query('SELECT password_hash FROM users WHERE id = $1', [req.user!.userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    // Verify current password
    const isPasswordValid = await comparePassword(currentPassword, result.rows[0].password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Current password is incorrect',
      });
    }

    // Hash new password
    const password_hash = await hashPassword(newPassword);

    // Update password
    await query('UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [
      password_hash,
      req.user!.userId,
    ]);

    const response: ApiResponse<any> = {
      success: true,
      message: 'Password changed successfully',
    };

    res.json(response);
  })
);

export default router;
