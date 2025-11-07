import { Router } from 'express';
import { query } from '../database/connection';
import { asyncHandler } from '../middleware/errorHandler';
import { validateBody, validateQuery, createAutomationProgressSchema, paginationSchema, filterSchema } from '../middleware/validation';
import { ApiResponse, AutomationProgress } from '../types';

const router = Router();

// GET /api/automation - Get automation progress
router.get(
  '/',
  validateQuery(paginationSchema.merge(filterSchema)),
  asyncHandler(async (req: any, res: any) => {
    const { page = 1, limit = 10, region, category } = req.query;
    const offset = (page - 1) * limit;

    let queryText = 'SELECT * FROM automation_progress WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (region) {
      queryText += ` AND region = $${paramIndex}`;
      params.push(region);
      paramIndex++;
    }

    if (category) {
      queryText += ` AND sector = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    queryText += ` ORDER BY timestamp DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await query(queryText, params);

    const response: ApiResponse<AutomationProgress[]> = {
      success: true,
      data: result.rows,
    };

    res.json(response);
  })
);

// GET /api/automation/:id - Get single automation record
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await query('SELECT * FROM automation_progress WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Automation record not found',
      });
    }

    const response: ApiResponse<AutomationProgress> = {
      success: true,
      data: result.rows[0],
    };

    res.json(response);
  })
);

// POST /api/automation - Create automation record
router.post(
  '/',
  validateBody(createAutomationProgressSchema),
  asyncHandler(async (req, res) => {
    const { sector, subsector, automation_percentage, jobs_automated, jobs_created, region, notes } = req.body;

    const result = await query(
      `INSERT INTO automation_progress (sector, subsector, automation_percentage, jobs_automated, jobs_created, region, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [sector, subsector, automation_percentage, jobs_automated, jobs_created, region, notes]
    );

    const response: ApiResponse<AutomationProgress> = {
      success: true,
      data: result.rows[0],
      message: 'Automation record created successfully',
    };

    res.status(201).json(response);
  })
);

// DELETE /api/automation/:id - Delete automation record
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await query('DELETE FROM automation_progress WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Automation record not found',
      });
    }

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id: result.rows[0].id },
      message: 'Automation record deleted successfully',
    };

    res.json(response);
  })
);

// GET /api/automation/stats/by-sector - Get automation stats by sector
router.get(
  '/stats/by-sector',
  asyncHandler(async (req, res) => {
    const result = await query(`
      SELECT
        sector,
        AVG(automation_percentage) as avg_automation,
        SUM(jobs_automated) as total_jobs_automated,
        SUM(jobs_created) as total_jobs_created
      FROM automation_progress
      GROUP BY sector
      ORDER BY avg_automation DESC
    `);

    const response: ApiResponse<any[]> = {
      success: true,
      data: result.rows,
    };

    res.json(response);
  })
);

// GET /api/automation/stats/summary - Get automation summary
router.get(
  '/stats/summary',
  asyncHandler(async (req, res) => {
    const result = await query(`
      SELECT
        AVG(automation_percentage) as global_avg_automation,
        SUM(jobs_automated) as total_jobs_automated,
        SUM(jobs_created) as total_jobs_created,
        COUNT(DISTINCT sector) as sectors_tracked
      FROM automation_progress
    `);

    const response: ApiResponse<any> = {
      success: true,
      data: result.rows[0],
    };

    res.json(response);
  })
);

export default router;
