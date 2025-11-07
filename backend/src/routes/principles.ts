import { Router } from 'express';
import { query } from '../database/connection';
import { asyncHandler } from '../middleware/errorHandler';
import { validateBody, validateQuery, updatePrincipleSchema, paginationSchema, filterSchema } from '../middleware/validation';
import { ApiResponse, PrincipleImplementation } from '../types';

const router = Router();

// GET /api/principles - Get all principles with filtering
router.get(
  '/',
  validateQuery(paginationSchema.merge(filterSchema)),
  asyncHandler(async (req: any, res: any) => {
    const { page = 1, limit = 100, region, category, status } = req.query;
    const offset = (page - 1) * limit;

    let queryText = 'SELECT * FROM principles_implementation WHERE 1=1';
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

    if (status) {
      queryText += ` AND status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    queryText += ` ORDER BY principle_number ASC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await query(queryText, params);

    const response: ApiResponse<PrincipleImplementation[]> = {
      success: true,
      data: result.rows,
    };

    res.json(response);
  })
);

// GET /api/principles/:number - Get principle by number
router.get(
  '/:number',
  asyncHandler(async (req, res) => {
    const { number } = req.params;
    const result = await query('SELECT * FROM principles_implementation WHERE principle_number = $1', [number]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Principle not found',
      });
    }

    const response: ApiResponse<PrincipleImplementation> = {
      success: true,
      data: result.rows[0],
    };

    res.json(response);
  })
);

// PUT /api/principles/:number - Update principle implementation status
router.put(
  '/:number',
  validateBody(updatePrincipleSchema),
  asyncHandler(async (req, res) => {
    const { number } = req.params;
    const { status, progress_percentage, evidence_links, notes } = req.body;

    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 2;

    if (status) {
      fields.push(`status = $${paramIndex}`);
      values.push(status);
      paramIndex++;
    }
    if (progress_percentage !== undefined) {
      fields.push(`progress_percentage = $${paramIndex}`);
      values.push(progress_percentage);
      paramIndex++;
    }
    if (evidence_links) {
      fields.push(`evidence_links = $${paramIndex}`);
      values.push(evidence_links);
      paramIndex++;
    }
    if (notes) {
      fields.push(`notes = $${paramIndex}`);
      values.push(notes);
      paramIndex++;
    }

    if (fields.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No fields to update',
      });
    }

    const result = await query(
      `UPDATE principles_implementation SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE principle_number = $1 RETURNING *`,
      [number, ...values]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Principle not found',
      });
    }

    const response: ApiResponse<PrincipleImplementation> = {
      success: true,
      data: result.rows[0],
      message: 'Principle updated successfully',
    };

    res.json(response);
  })
);

// GET /api/principles/stats/summary - Get implementation statistics
router.get(
  '/stats/summary',
  asyncHandler(async (req, res) => {
    const result = await query(`
      SELECT
        status,
        COUNT(*) as count,
        AVG(progress_percentage) as avg_progress
      FROM principles_implementation
      GROUP BY status
    `);

    const totalResult = await query('SELECT COUNT(*) as total FROM principles_implementation');

    const response = {
      success: true,
      data: {
        by_status: result.rows,
        total: parseInt(totalResult.rows[0].total),
      },
    };

    res.json(response);
  })
);

// GET /api/principles/stats/by-category - Get statistics by category
router.get(
  '/stats/by-category',
  asyncHandler(async (req, res) => {
    const result = await query(`
      SELECT
        category,
        COUNT(*) as total,
        SUM(CASE WHEN status = 'implemented' THEN 1 ELSE 0 END) as implemented,
        SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as in_progress,
        SUM(CASE WHEN status = 'planned' THEN 1 ELSE 0 END) as planned,
        AVG(progress_percentage) as avg_progress
      FROM principles_implementation
      GROUP BY category
      ORDER BY category
    `);

    const response: ApiResponse<any[]> = {
      success: true,
      data: result.rows,
    };

    res.json(response);
  })
);

export default router;
