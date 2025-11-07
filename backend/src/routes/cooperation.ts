import { Router } from 'express';
import { query } from '../database/connection';
import { asyncHandler } from '../middleware/errorHandler';
import { validateBody, validateQuery, createCooperationMetricSchema, paginationSchema, filterSchema } from '../middleware/validation';
import { ApiResponse, CooperationMetric } from '../types';

const router = Router();

// GET /api/cooperation - Get cooperation metrics
router.get(
  '/',
  validateQuery(paginationSchema.merge(filterSchema)),
  asyncHandler(async (req: any, res: any) => {
    const { page = 1, limit = 10, region, start_date, end_date } = req.query;
    const offset = (page - 1) * limit;

    let queryText = 'SELECT * FROM cooperation_metrics WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (region) {
      queryText += ` AND (region_from = $${paramIndex} OR region_to = $${paramIndex})`;
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

    const response: ApiResponse<CooperationMetric[]> = {
      success: true,
      data: result.rows,
    };

    res.json(response);
  })
);

// GET /api/cooperation/:id - Get single cooperation metric
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await query('SELECT * FROM cooperation_metrics WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Cooperation metric not found',
      });
    }

    const response: ApiResponse<CooperationMetric> = {
      success: true,
      data: result.rows[0],
    };

    res.json(response);
  })
);

// POST /api/cooperation - Create cooperation metric
router.post(
  '/',
  validateBody(createCooperationMetricSchema),
  asyncHandler(async (req, res) => {
    const { region_from, region_to, cooperation_type, metric_name, metric_value, source, metadata } = req.body;

    const result = await query(
      `INSERT INTO cooperation_metrics (region_from, region_to, cooperation_type, metric_name, metric_value, source, metadata)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [region_from, region_to, cooperation_type, metric_name, metric_value, source, metadata]
    );

    const response: ApiResponse<CooperationMetric> = {
      success: true,
      data: result.rows[0],
      message: 'Cooperation metric created successfully',
    };

    res.status(201).json(response);
  })
);

// DELETE /api/cooperation/:id - Delete cooperation metric
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await query('DELETE FROM cooperation_metrics WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Cooperation metric not found',
      });
    }

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id: result.rows[0].id },
      message: 'Cooperation metric deleted successfully',
    };

    res.json(response);
  })
);

// GET /api/cooperation/stats/by-region - Get cooperation stats by region
router.get(
  '/stats/by-region',
  asyncHandler(async (req, res) => {
    const result = await query(`
      SELECT
        region_from,
        COUNT(*) as total_cooperations,
        AVG(metric_value) as avg_cooperation_value,
        MAX(metric_value) as max_cooperation_value
      FROM cooperation_metrics
      GROUP BY region_from
      ORDER BY avg_cooperation_value DESC
    `);

    const response: ApiResponse<any[]> = {
      success: true,
      data: result.rows,
    };

    res.json(response);
  })
);

// GET /api/cooperation/stats/by-type - Get cooperation stats by type
router.get(
  '/stats/by-type',
  asyncHandler(async (req, res) => {
    const result = await query(`
      SELECT
        cooperation_type,
        COUNT(*) as total,
        AVG(metric_value) as avg_value
      FROM cooperation_metrics
      GROUP BY cooperation_type
      ORDER BY avg_value DESC
    `);

    const response: ApiResponse<any[]> = {
      success: true,
      data: result.rows,
    };

    res.json(response);
  })
);

export default router;
