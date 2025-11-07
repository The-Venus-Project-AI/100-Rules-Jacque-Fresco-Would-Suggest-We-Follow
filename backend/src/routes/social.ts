import { Router } from 'express';
import { query } from '../database/connection';
import { asyncHandler } from '../middleware/errorHandler';
import { validateBody, validateQuery, createSocialMetricSchema, paginationSchema, filterSchema } from '../middleware/validation';
import { ApiResponse, SocialMetric } from '../types';

const router = Router();

// GET /api/social - Get social metrics
router.get(
  '/',
  validateQuery(paginationSchema.merge(filterSchema)),
  asyncHandler(async (req: any, res: any) => {
    const { page = 1, limit = 10, region, category } = req.query;
    const offset = (page - 1) * limit;

    let queryText = 'SELECT * FROM social_metrics WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (region) {
      queryText += ` AND region = $${paramIndex}`;
      params.push(region);
      paramIndex++;
    }

    if (category) {
      queryText += ` AND category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    queryText += ` ORDER BY timestamp DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await query(queryText, params);

    const response: ApiResponse<SocialMetric[]> = {
      success: true,
      data: result.rows,
    };

    res.json(response);
  })
);

// GET /api/social/:id - Get single social metric
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await query('SELECT * FROM social_metrics WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Social metric not found',
      });
    }

    const response: ApiResponse<SocialMetric> = {
      success: true,
      data: result.rows[0],
    };

    res.json(response);
  })
);

// POST /api/social - Create social metric
router.post(
  '/',
  validateBody(createSocialMetricSchema),
  asyncHandler(async (req, res) => {
    const { metric_name, category, value, region, source } = req.body;

    const result = await query(
      `INSERT INTO social_metrics (metric_name, category, value, region, source)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [metric_name, category, value, region, source]
    );

    const response: ApiResponse<SocialMetric> = {
      success: true,
      data: result.rows[0],
      message: 'Social metric created successfully',
    };

    res.status(201).json(response);
  })
);

// DELETE /api/social/:id - Delete social metric
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await query('DELETE FROM social_metrics WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Social metric not found',
      });
    }

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id: result.rows[0].id },
      message: 'Social metric deleted successfully',
    };

    res.json(response);
  })
);

// GET /api/social/stats/by-category - Get social stats by category
router.get(
  '/stats/by-category',
  asyncHandler(async (req, res) => {
    const result = await query(`
      SELECT
        category,
        COUNT(*) as total_metrics,
        AVG(value) as avg_value,
        MAX(value) as max_value,
        MIN(value) as min_value
      FROM social_metrics
      GROUP BY category
      ORDER BY avg_value DESC
    `);

    const response: ApiResponse<any[]> = {
      success: true,
      data: result.rows,
    };

    res.json(response);
  })
);

// GET /api/social/stats/by-region - Get social stats by region
router.get(
  '/stats/by-region',
  asyncHandler(async (req, res) => {
    const result = await query(`
      SELECT
        region,
        COUNT(*) as total_metrics,
        AVG(value) as avg_value
      FROM social_metrics
      GROUP BY region
      ORDER BY avg_value DESC
    `);

    const response: ApiResponse<any[]> = {
      success: true,
      data: result.rows,
    };

    res.json(response);
  })
);

// GET /api/social/stats/latest - Get latest social metrics
router.get(
  '/stats/latest',
  asyncHandler(async (req, res) => {
    const result = await query(`
      SELECT DISTINCT ON (metric_name, region)
        metric_name,
        category,
        value,
        region,
        timestamp
      FROM social_metrics
      ORDER BY metric_name, region, timestamp DESC
    `);

    const response: ApiResponse<any[]> = {
      success: true,
      data: result.rows,
    };

    res.json(response);
  })
);

export default router;
