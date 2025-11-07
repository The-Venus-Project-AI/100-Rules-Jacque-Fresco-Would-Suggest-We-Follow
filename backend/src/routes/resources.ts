import { Router } from 'express';
import { query } from '../database/connection';
import { asyncHandler } from '../middleware/errorHandler';
import { validateBody, validateQuery, createResourceSchema, updateResourceSchema, paginationSchema, filterSchema } from '../middleware/validation';
import { ApiResponse, Resource } from '../types';

const router = Router();

// GET /api/resources - Get all resources with pagination and filtering
router.get(
  '/',
  validateQuery(paginationSchema.merge(filterSchema)),
  asyncHandler(async (req: any, res: any) => {
    const { page = 1, limit = 10, sort_by = 'last_updated', order = 'desc', region, category } = req.query;
    const offset = (page - 1) * limit;

    let queryText = 'SELECT * FROM resources WHERE 1=1';
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

    queryText += ` ORDER BY ${sort_by} ${order} LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await query(queryText, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM resources WHERE 1=1';
    const countParams: any[] = [];
    if (region) countParams.push(region);
    if (category) countParams.push(category);

    const countResult = await query(
      countQuery + (region ? ' AND region = $1' : '') + (category ? ` AND category = $${countParams.length + 1}` : ''),
      countParams
    );

    const response: ApiResponse<Resource[]> = {
      success: true,
      data: result.rows,
      message: `Retrieved ${result.rows.length} resources`,
    };

    res.json({
      ...response,
      pagination: {
        page,
        limit,
        total: parseInt(countResult.rows[0].count),
        pages: Math.ceil(parseInt(countResult.rows[0].count) / limit),
      },
    });
  })
);

// GET /api/resources/:id - Get single resource by ID
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await query('SELECT * FROM resources WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Resource not found',
      });
    }

    const response: ApiResponse<Resource> = {
      success: true,
      data: result.rows[0],
    };

    res.json(response);
  })
);

// POST /api/resources - Create new resource
router.post(
  '/',
  validateBody(createResourceSchema),
  asyncHandler(async (req, res) => {
    const { category, subcategory, name, current_amount, unit, region, source_api, confidence_level, metadata } = req.body;

    const result = await query(
      `INSERT INTO resources (category, subcategory, name, current_amount, unit, region, source_api, confidence_level, metadata)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [category, subcategory, name, current_amount, unit, region, source_api, confidence_level, metadata]
    );

    const response: ApiResponse<Resource> = {
      success: true,
      data: result.rows[0],
      message: 'Resource created successfully',
    };

    res.status(201).json(response);
  })
);

// PUT /api/resources/:id - Update resource
router.put(
  '/:id',
  validateBody(updateResourceSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');

    const result = await query(
      `UPDATE resources SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
      [id, ...values]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Resource not found',
      });
    }

    const response: ApiResponse<Resource> = {
      success: true,
      data: result.rows[0],
      message: 'Resource updated successfully',
    };

    res.json(response);
  })
);

// DELETE /api/resources/:id - Delete resource
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await query('DELETE FROM resources WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Resource not found',
      });
    }

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id: result.rows[0].id },
      message: 'Resource deleted successfully',
    };

    res.json(response);
  })
);

// GET /api/resources/categories - Get all resource categories
router.get(
  '/meta/categories',
  asyncHandler(async (req, res) => {
    const result = await query('SELECT DISTINCT category FROM resources ORDER BY category');

    const response: ApiResponse<string[]> = {
      success: true,
      data: result.rows.map((row) => row.category),
    };

    res.json(response);
  })
);

// GET /api/resources/regions - Get all regions
router.get(
  '/meta/regions',
  asyncHandler(async (req, res) => {
    const result = await query('SELECT DISTINCT region FROM resources ORDER BY region');

    const response: ApiResponse<string[]> = {
      success: true,
      data: result.rows.map((row) => row.region),
    };

    res.json(response);
  })
);

export default router;
