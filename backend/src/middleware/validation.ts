import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

// Resource validation schemas
export const createResourceSchema = z.object({
  category: z.string().min(1).max(100),
  subcategory: z.string().max(100).optional(),
  name: z.string().min(1).max(200),
  current_amount: z.number().positive(),
  unit: z.string().min(1).max(50),
  region: z.string().max(100).default('global'),
  source_api: z.string().max(200).optional(),
  confidence_level: z.number().min(0).max(1).optional(),
  metadata: z.any().optional(),
});

export const updateResourceSchema = createResourceSchema.partial();

// Principle validation schemas
export const updatePrincipleSchema = z.object({
  status: z.enum(['planned', 'in_progress', 'implemented']).optional(),
  progress_percentage: z.number().min(0).max(100).optional(),
  evidence_links: z.array(z.string().url()).optional(),
  notes: z.string().optional(),
});

// Cooperation metric validation schemas
export const createCooperationMetricSchema = z.object({
  region_from: z.string().min(1).max(100),
  region_to: z.string().max(100).optional(),
  cooperation_type: z.string().min(1).max(100),
  metric_name: z.string().min(1).max(200),
  metric_value: z.number(),
  source: z.string().max(200).optional(),
  metadata: z.any().optional(),
});

// Automation progress validation schemas
export const createAutomationProgressSchema = z.object({
  sector: z.string().min(1).max(100),
  subsector: z.string().max(100).optional(),
  automation_percentage: z.number().min(0).max(100),
  jobs_automated: z.number().int().min(0).default(0),
  jobs_created: z.number().int().min(0).default(0),
  region: z.string().max(100).default('global'),
  notes: z.string().optional(),
});

// Environmental metric validation schemas
export const createEnvironmentalMetricSchema = z.object({
  metric_name: z.string().min(1).max(200),
  metric_type: z.string().min(1).max(100),
  value: z.number(),
  unit: z.string().min(1).max(50),
  region: z.string().max(100).default('global'),
  source: z.string().max(200).optional(),
  metadata: z.any().optional(),
});

// Social metric validation schemas
export const createSocialMetricSchema = z.object({
  metric_name: z.string().min(1).max(200),
  category: z.string().min(1).max(100),
  value: z.number(),
  region: z.string().max(100).default('global'),
  source: z.string().max(200).optional(),
});

// User validation schemas
export const registerUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(100),
  password: z.string().min(8).max(100),
  region: z.string().max(100).optional(),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Circular city validation schemas
export const createCircularCitySchema = z.object({
  name: z.string().min(1).max(200),
  region: z.string().min(1).max(100),
  country: z.string().min(1).max(100),
  status: z.enum(['proposed', 'planning', 'construction', 'operational']),
  population_target: z.number().int().positive().optional(),
  current_population: z.number().int().min(0).default(0),
  renewable_energy_percentage: z.number().min(0).max(100).optional(),
  waste_recycling_percentage: z.number().min(0).max(100).optional(),
  metadata: z.any().optional(),
});

// Query parameter validation schemas
export const paginationSchema = z.object({
  page: z.string().optional().transform((val) => (val ? parseInt(val) : 1)),
  limit: z.string().optional().transform((val) => (val ? parseInt(val) : 10)),
  sort_by: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const filterSchema = z.object({
  region: z.string().optional(),
  category: z.string().optional(),
  status: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
});

// Middleware to validate request body
export const validateBody = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};

// Middleware to validate query parameters
export const validateQuery = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = await schema.parseAsync(req.query);
      next();
    } catch (error) {
      next(error);
    }
  };
};
