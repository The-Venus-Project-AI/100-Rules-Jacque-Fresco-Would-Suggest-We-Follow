import { Router } from 'express';
import { query } from '../database/connection';
import { asyncHandler } from '../middleware/errorHandler';
import { validateBody, validateQuery, createEnvironmentalMetricSchema, paginationSchema, filterSchema } from '../middleware/validation';
import { ApiResponse, EnvironmentalMetric } from '../types';

const router = Router();

// GET /api/environmental - Get environmental metrics
router.get(
  '/',
  validateQuery(paginationSchema.merge(filterSchema)),
  asyncHandler(async (req: any, res: any) => {
    const { page = 1, limit = 10, region, start_date, end_date } = req.query;
    const offset = (page - 1) * limit;

    let queryText = 'SELECT * FROM environmental_metrics WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (region) {
      queryText += ` AND region = $${paramIndex}`;
      params.push(region);
      paramIndex++;
    }

    if (start_date) {
      queryText += ` AND timestamp >= $${paramIndex}`;
      params.push(start_date);
      paramIndex++;
    }

    if (end_date) {
      queryText += ` AND timestamp <= $${paramIndex}`;
      params.push(end_date);
      paramIndex++;
    }

    queryText += ` ORDER BY timestamp DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await query(queryText, params);

    const response: ApiResponse<EnvironmentalMetric[]> = {
      success: true,
      data: result.rows,
    };

    res.json(response);
  })
);

// GET /api/environmental/:id - Get single environmental metric
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await query('SELECT * FROM environmental_metrics WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Environmental metric not found',
      });
    }

    const response: ApiResponse<EnvironmentalMetric> = {
      success: true,
      data: result.rows[0],
    };

    res.json(response);
  })
);

// POST /api/environmental - Create environmental metric
router.post(
  '/',
  validateBody(createEnvironmentalMetricSchema),
  asyncHandler(async (req, res) => {
    const { metric_name, metric_type, value, unit, region, source, metadata } = req.body;

    const result = await query(
      `INSERT INTO environmental_metrics (metric_name, metric_type, value, unit, region, source, metadata)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [metric_name, metric_type, value, unit, region, source, metadata]
    );

    const response: ApiResponse<EnvironmentalMetric> = {
      success: true,
      data: result.rows[0],
      message: 'Environmental metric created successfully',
    };

    res.status(201).json(response);
  })
);

// DELETE /api/environmental/:id - Delete environmental metric
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await query('DELETE FROM environmental_metrics WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Environmental metric not found',
      });
    }

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id: result.rows[0].id },
      message: 'Environmental metric deleted successfully',
    };

    res.json(response);
  })
);

// GET /api/environmental/stats/by-type - Get environmental stats by type
router.get(
  '/stats/by-type',
  asyncHandler(async (req, res) => {
    const result = await query(`
      SELECT
        metric_type,
        COUNT(*) as total_metrics,
        AVG(value) as avg_value
      FROM environmental_metrics
      GROUP BY metric_type
      ORDER BY total_metrics DESC
    `);

    const response: ApiResponse<any[]> = {
      success: true,
      data: result.rows,
    };

    res.json(response);
  })
);

// GET /api/environmental/stats/latest - Get latest environmental metrics
router.get(
  '/stats/latest',
  asyncHandler(async (req, res) => {
    const result = await query(`
      SELECT DISTINCT ON (metric_name)
        metric_name,
        metric_type,
        value,
        unit,
        region,
        timestamp
      FROM environmental_metrics
      ORDER BY metric_name, timestamp DESC
    `);

    const response: ApiResponse<any[]> = {
      success: true,
      data: result.rows,
    };

    res.json(response);
  })
);

export default router;
