import { Router } from 'express';
import { query } from '../database/connection';
import { asyncHandler } from '../middleware/errorHandler';
import { validateBody, validateQuery, createCircularCitySchema, paginationSchema, filterSchema } from '../middleware/validation';
import { ApiResponse, CircularCity } from '../types';

const router = Router();

// GET /api/cities - Get circular cities
router.get(
  '/',
  validateQuery(paginationSchema.merge(filterSchema)),
  asyncHandler(async (req: any, res: any) => {
    const { page = 1, limit = 10, region, status } = req.query;
    const offset = (page - 1) * limit;

    let queryText = 'SELECT * FROM circular_cities WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (region) {
      queryText += ` AND region = $${paramIndex}`;
      params.push(region);
      paramIndex++;
    }

    if (status) {
      queryText += ` AND status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    queryText += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await query(queryText, params);

    const response: ApiResponse<CircularCity[]> = {
      success: true,
      data: result.rows,
    };

    res.json(response);
  })
);

// GET /api/cities/:id - Get single circular city
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await query('SELECT * FROM circular_cities WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Circular city not found',
      });
    }

    const response: ApiResponse<CircularCity> = {
      success: true,
      data: result.rows[0],
    };

    res.json(response);
  })
);

// POST /api/cities - Create circular city
router.post(
  '/',
  validateBody(createCircularCitySchema),
  asyncHandler(async (req, res) => {
    const {
      name,
      region,
      country,
      status,
      population_target,
      current_population,
      renewable_energy_percentage,
      waste_recycling_percentage,
      metadata,
    } = req.body;

    const result = await query(
      `INSERT INTO circular_cities (name, region, country, status, population_target, current_population, renewable_energy_percentage, waste_recycling_percentage, metadata)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        name,
        region,
        country,
        status,
        population_target,
        current_population,
        renewable_energy_percentage,
        waste_recycling_percentage,
        metadata,
      ]
    );

    const response: ApiResponse<CircularCity> = {
      success: true,
      data: result.rows[0],
      message: 'Circular city created successfully',
    };

    res.status(201).json(response);
  })
);

// PUT /api/cities/:id - Update circular city
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const allowedFields = [
      'name',
      'region',
      'country',
      'status',
      'population_target',
      'current_population',
      'renewable_energy_percentage',
      'waste_recycling_percentage',
      'metadata',
    ];

    const fields = Object.keys(updates).filter((key) => allowedFields.includes(key));
    const values = fields.map((field) => updates[field]);

    if (fields.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No valid fields to update',
      });
    }

    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');

    const result = await query(
      `UPDATE circular_cities SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
      [id, ...values]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Circular city not found',
      });
    }

    const response: ApiResponse<CircularCity> = {
      success: true,
      data: result.rows[0],
      message: 'Circular city updated successfully',
    };

    res.json(response);
  })
);

// DELETE /api/cities/:id - Delete circular city
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await query('DELETE FROM circular_cities WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Circular city not found',
      });
    }

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id: result.rows[0].id },
      message: 'Circular city deleted successfully',
    };

    res.json(response);
  })
);

// GET /api/cities/stats/by-status - Get cities stats by status
router.get(
  '/stats/by-status',
  asyncHandler(async (req, res) => {
    const result = await query(`
      SELECT
        status,
        COUNT(*) as total_cities,
        SUM(population_target) as total_population_target,
        SUM(current_population) as total_current_population,
        AVG(renewable_energy_percentage) as avg_renewable_energy,
        AVG(waste_recycling_percentage) as avg_waste_recycling
      FROM circular_cities
      GROUP BY status
      ORDER BY total_cities DESC
    `);

    const response: ApiResponse<any[]> = {
      success: true,
      data: result.rows,
    };

    res.json(response);
  })
);

// GET /api/cities/stats/summary - Get cities summary
router.get(
  '/stats/summary',
  asyncHandler(async (req, res) => {
    const result = await query(`
      SELECT
        COUNT(*) as total_cities,
        SUM(CASE WHEN status = 'operational' THEN 1 ELSE 0 END) as operational_cities,
        SUM(CASE WHEN status = 'construction' THEN 1 ELSE 0 END) as under_construction,
        SUM(CASE WHEN status = 'planning' THEN 1 ELSE 0 END) as in_planning,
        SUM(CASE WHEN status = 'proposed' THEN 1 ELSE 0 END) as proposed,
        SUM(current_population) as total_population,
        AVG(renewable_energy_percentage) as avg_renewable_energy,
        AVG(waste_recycling_percentage) as avg_waste_recycling
      FROM circular_cities
    `);

    const response: ApiResponse<any> = {
      success: true,
      data: result.rows[0],
    };

    res.json(response);
  })
);

export default router;
