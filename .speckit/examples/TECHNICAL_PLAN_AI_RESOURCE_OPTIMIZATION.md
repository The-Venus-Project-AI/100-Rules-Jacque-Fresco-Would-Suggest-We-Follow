# Technical Plan: AI-Powered Resource Optimization Engine

**Version**: 1.0
**Date**: 2025-11-07
**Status**: Example Technical Plan
**Related Specification**: `FEATURE_SPEC_AI_RESOURCE_OPTIMIZATION.md`
**Owner**: RBE Platform Core Team

---

## 1. Overview

This technical plan details the implementation of the AI-Powered Resource Optimization Engine as specified in `FEATURE_SPEC_AI_RESOURCE_OPTIMIZATION.md`. This system will analyze global resource data using machine learning to provide actionable optimization recommendations.

**Implementation Duration**: 12 weeks
**Team Size**: 10 people (2 backend, 2 data scientists, 2 frontend, 1 DevOps, 1 QA, 1 tech writer, 1 PM)

---

## 2. Architecture

### 2.1 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (React)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ AI Dashboard │  │ Scenarios UI │  │ Metrics UI   │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                  │                   │
│         └─────────────────┴──────────────────┘                   │
│                           │                                      │
└───────────────────────────┼──────────────────────────────────────┘
                            │ HTTPS/REST
┌───────────────────────────┼──────────────────────────────────────┐
│                  Backend API (Node.js/Express)                   │
│  ┌───────────────┴────────────────┐                             │
│  │      AI API Routes             │                             │
│  │  /api/ai/recommendations       │                             │
│  │  /api/ai/predictions           │                             │
│  │  /api/ai/scenarios             │                             │
│  │  /api/ai/models                │                             │
│  └───────┬────────────────────────┘                             │
│          │                                                       │
│  ┌───────┴────────────────────────┐                             │
│  │   AI Service Layer             │                             │
│  │  - Recommendation Generator    │                             │
│  │  - Prediction Engine           │                             │
│  │  - Scenario Analyzer           │                             │
│  │  - Model Manager               │                             │
│  └───────┬────────────────────────┘                             │
└──────────┼───────────────────────────────────────────────────────┘
           │
           ├───────────────┬──────────────────┬─────────────────┐
           │               │                  │                 │
    ┌──────┴─────┐  ┌──────┴─────┐   ┌───────┴──────┐  ┌───────┴──────┐
    │ PostgreSQL │  │   Redis    │   │ ML Models    │  │  Job Queue   │
    │  Database  │  │   Cache    │   │ (TensorFlow) │  │   (BullMQ)   │
    └────────────┘  └────────────┘   └──────────────┘  └──────────────┘
                                              │
                                      ┌───────┴──────┐
                                      │  GPU Server  │
                                      │   Training   │
                                      └──────────────┘
```

### 2.2 Data Flow

**Recommendation Generation Flow:**
```
1. Scheduler triggers daily recommendation job
2. Job queue picks up task
3. ML Service loads latest model
4. Fetches resource data from PostgreSQL
5. Runs inference on all regions/categories
6. Generates recommendations with confidence scores
7. Calculates impact predictions
8. Stores recommendations in database
9. Triggers notification to users
```

**Prediction Flow:**
```
1. User requests prediction via API
2. API validates request
3. Checks cache for recent prediction
4. If cache miss:
   a. Loads trained model
   b. Fetches historical data
   c. Runs prediction algorithm
   d. Calculates confidence intervals
   e. Caches result (15 min TTL)
5. Returns prediction with metadata
```

**Model Training Flow:**
```
1. Trigger: Manual, scheduled, or drift detection
2. Training job added to queue
3. Worker node picks up job
4. Fetches historical data (5 years)
5. Preprocesses and engineers features
6. Splits into train/validation/test sets
7. Trains model with hyperparameters
8. Validates on test set
9. Runs bias/fairness tests
10. If metrics acceptable:
    a. Saves model artifacts to S3
    b. Updates database with new version
    c. Notifies team
11. If metrics unacceptable:
    a. Logs failure
    b. Alerts data science team
```

### 2.3 Component Breakdown

**Backend Components:**
- AI API Routes (Express routers)
- AI Service Layer (business logic)
- ML Model Interface (abstraction over TensorFlow)
- Training Job Worker (BullMQ worker)
- Data Pipeline (ETL for model training)
- Model Registry (version management)

**Frontend Components:**
- AIDashboard (main container)
- RecommendationList (list view)
- RecommendationDetail (detailed view with explanation)
- PredictionChart (time series predictions)
- ScenarioBuilder (what-if analysis)
- ModelPerformance (metrics dashboard)
- DecisionTreeVisualization (D3-based)

**Infrastructure Components:**
- PostgreSQL (primary database)
- Redis (caching + job queue)
- S3 (model artifact storage)
- GPU Server (training)
- Prometheus/Grafana (monitoring)

---

## 3. Technology Stack

### 3.1 Technology Choices & Justification

**Machine Learning:**
- **TensorFlow.js + TensorFlow (Python)**: Hybrid approach for best of both worlds
  - TensorFlow.js for inference in Node.js (low latency)
  - TensorFlow (Python) for training (rich ecosystem)
  - Justification: Industry standard, excellent documentation, production-ready

**Alternative Considered**: PyTorch
- Pros: More Pythonic, great for research
- Cons: Less mature for Node.js integration
- Why not chosen: TensorFlow.js provides better Node.js support

**Job Queue:**
- **BullMQ + Redis**: Reliable distributed job queue
  - Justification: Battle-tested, excellent TypeScript support, Redis already in stack

**Alternative Considered**: RabbitMQ
- Pros: More features, mature
- Cons: Additional infrastructure, overkill for our needs
- Why not chosen: BullMQ simpler for our use case

**Visualization:**
- **Recharts + D3.js**:
  - Recharts for standard charts (already in use)
  - D3.js for custom visualizations (decision trees)
  - Justification: Recharts handles 80%, D3 for remaining 20%

**Model Storage:**
- **S3-compatible object storage**:
  - Justification: Standard for ML artifacts, versioning support, cost-effective

### 3.2 Dependencies

**New Backend Dependencies:**
```json
{
  "@tensorflow/tfjs-node": "^4.11.0",
  "bullmq": "^4.12.0",
  "ioredis": "^5.3.0",
  "node-cron": "^3.0.2",
  "aws-sdk": "^2.1490.0",
  "@aws-sdk/client-s3": "^3.450.0",
  "python-shell": "^5.0.0",
  "ml-metrics": "^1.0.0"
}
```

**New Frontend Dependencies:**
```json
{
  "d3": "^7.8.5",
  "react-flow": "^11.10.0",
  "@visx/visx": "^3.5.0"
}
```

**Python Dependencies (for training):**
```
tensorflow==2.14.0
scikit-learn==1.3.2
pandas==2.1.3
numpy==1.26.2
matplotlib==3.8.2
```

---

## 4. Implementation Details

### 4.1 Database Schema Implementation

**Create migration file:** `backend/database/migrations/003_ai_optimization.sql`

```sql
-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- AI Models Table
CREATE TABLE ai_models (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_name VARCHAR(200) NOT NULL,
    model_version VARCHAR(50) NOT NULL,
    model_type VARCHAR(100) NOT NULL CHECK (model_type IN ('resource_prediction', 'optimization', 'anomaly_detection')),
    architecture VARCHAR(100),
    hyperparameters JSONB NOT NULL DEFAULT '{}',
    training_data_period DATERANGE NOT NULL,
    training_completed_at TIMESTAMP WITH TIME ZONE,
    accuracy_metrics JSONB NOT NULL DEFAULT '{}',
    bias_metrics JSONB,
    status VARCHAR(50) NOT NULL DEFAULT 'training' CHECK (status IN ('training', 'validating', 'active', 'deprecated')),
    deployed_at TIMESTAMP WITH TIME ZONE,
    deprecated_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES users(id),
    model_artifact_url TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_model_version UNIQUE (model_name, model_version)
);

CREATE INDEX idx_ai_models_status ON ai_models(status);
CREATE INDEX idx_ai_models_type ON ai_models(model_type);
CREATE INDEX idx_ai_models_name ON ai_models(model_name);

-- Optimization Recommendations Table
CREATE TABLE optimization_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_id UUID NOT NULL REFERENCES ai_models(id) ON DELETE CASCADE,
    recommendation_type VARCHAR(100) NOT NULL CHECK (recommendation_type IN ('allocation', 'distribution', 'conservation', 'production')),
    priority VARCHAR(50) NOT NULL CHECK (priority IN ('critical', 'high', 'medium', 'low')),
    resource_category VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    title VARCHAR(300) NOT NULL,
    description TEXT NOT NULL,
    reasoning JSONB NOT NULL DEFAULT '{}',
    confidence_score DECIMAL(5,4) NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 1),
    predicted_impact JSONB NOT NULL DEFAULT '{}',
    implementation_steps JSONB NOT NULL DEFAULT '[]',
    rbe_principles_alignment INTEGER[] NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'implemented', 'under_review', 'expired')),
    accepted_by UUID REFERENCES users(id),
    accepted_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    implementation_started_at TIMESTAMP WITH TIME ZONE,
    implementation_completed_at TIMESTAMP WITH TIME ZONE,
    actual_impact JSONB,
    feedback_score INTEGER CHECK (feedback_score >= 1 AND feedback_score <= 5),
    feedback_notes TEXT,
    expires_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_recommendations_status ON optimization_recommendations(status);
CREATE INDEX idx_recommendations_priority ON optimization_recommendations(priority);
CREATE INDEX idx_recommendations_region ON optimization_recommendations(region);
CREATE INDEX idx_recommendations_category ON optimization_recommendations(resource_category);
CREATE INDEX idx_recommendations_expires ON optimization_recommendations(expires_at) WHERE status = 'pending';
CREATE INDEX idx_recommendations_model ON optimization_recommendations(model_id);

-- Resource Predictions Table
CREATE TABLE resource_predictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_id UUID NOT NULL REFERENCES ai_models(id) ON DELETE CASCADE,
    resource_id UUID REFERENCES resources(id) ON DELETE SET NULL,
    resource_category VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    prediction_period VARCHAR(50) NOT NULL CHECK (prediction_period IN ('1_week', '1_month', '3_months', '1_year')),
    target_date DATE NOT NULL,
    predicted_value DECIMAL(20,4) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    confidence_interval_lower DECIMAL(20,4) NOT NULL,
    confidence_interval_upper DECIMAL(20,4) NOT NULL,
    confidence_level DECIMAL(5,4) NOT NULL DEFAULT 0.95,
    contributing_factors JSONB NOT NULL DEFAULT '{}',
    actual_value DECIMAL(20,4),
    prediction_error DECIMAL(20,4),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_predictions_resource ON resource_predictions(resource_id);
CREATE INDEX idx_predictions_target_date ON resource_predictions(target_date);
CREATE INDEX idx_predictions_region ON resource_predictions(region);
CREATE INDEX idx_predictions_category ON resource_predictions(resource_category);
CREATE INDEX idx_predictions_period ON resource_predictions(prediction_period);
CREATE INDEX idx_predictions_model ON resource_predictions(model_id);

-- AI Training Jobs Table
CREATE TABLE ai_training_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_name VARCHAR(200) NOT NULL,
    model_version VARCHAR(50) NOT NULL,
    job_type VARCHAR(50) NOT NULL CHECK (job_type IN ('initial_training', 'retraining', 'validation', 'hyperparameter_tuning')),
    status VARCHAR(50) NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'running', 'completed', 'failed', 'cancelled')),
    training_parameters JSONB NOT NULL DEFAULT '{}',
    dataset_info JSONB NOT NULL DEFAULT '{}',
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    duration_seconds INTEGER,
    result_metrics JSONB,
    error_message TEXT,
    logs_url TEXT,
    triggered_by VARCHAR(50) NOT NULL CHECK (triggered_by IN ('manual', 'scheduled', 'drift_detection', 'system')),
    triggered_by_user UUID REFERENCES users(id),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_training_jobs_status ON ai_training_jobs(status);
CREATE INDEX idx_training_jobs_created ON ai_training_jobs(created_at DESC);
CREATE INDEX idx_training_jobs_model ON ai_training_jobs(model_name, model_version);

-- Scenario Analyses Table
CREATE TABLE scenario_analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_id UUID NOT NULL REFERENCES ai_models(id) ON DELETE CASCADE,
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    scenario_name VARCHAR(200) NOT NULL,
    scenario_description TEXT,
    base_parameters JSONB NOT NULL DEFAULT '{}',
    modified_parameters JSONB NOT NULL DEFAULT '{}',
    predictions JSONB NOT NULL DEFAULT '{}',
    comparison_metrics JSONB NOT NULL DEFAULT '{}',
    shared_publicly BOOLEAN DEFAULT FALSE,
    shared_with_users UUID[],
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_scenarios_user ON scenario_analyses(created_by);
CREATE INDEX idx_scenarios_public ON scenario_analyses(shared_publicly);
CREATE INDEX idx_scenarios_model ON scenario_analyses(model_id);

-- Update existing resources table
ALTER TABLE resources
ADD COLUMN IF NOT EXISTS ai_optimized BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS last_optimization_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS optimization_recommendation_id UUID REFERENCES optimization_recommendations(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_resources_ai_optimized ON resources(ai_optimized);

-- Update triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ai_models_updated_at BEFORE UPDATE ON ai_models
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_optimization_recommendations_updated_at BEFORE UPDATE ON optimization_recommendations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resource_predictions_updated_at BEFORE UPDATE ON resource_predictions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_training_jobs_updated_at BEFORE UPDATE ON ai_training_jobs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scenario_analyses_updated_at BEFORE UPDATE ON scenario_analyses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE ai_models IS 'Stores metadata about trained ML models';
COMMENT ON TABLE optimization_recommendations IS 'AI-generated recommendations for resource optimization';
COMMENT ON TABLE resource_predictions IS 'Predicted future resource values with confidence intervals';
COMMENT ON TABLE ai_training_jobs IS 'Tracks model training job execution and results';
COMMENT ON TABLE scenario_analyses IS 'User-created what-if scenarios for resource planning';
```

**Rollback migration:** `backend/database/migrations/003_ai_optimization_rollback.sql`

```sql
-- Drop tables in reverse order (respecting foreign keys)
DROP TABLE IF EXISTS scenario_analyses CASCADE;
DROP TABLE IF EXISTS ai_training_jobs CASCADE;
DROP TABLE IF EXISTS resource_predictions CASCADE;
DROP TABLE IF EXISTS optimization_recommendations CASCADE;
DROP TABLE IF EXISTS ai_models CASCADE;

-- Remove columns from resources table
ALTER TABLE resources
DROP COLUMN IF EXISTS ai_optimized,
DROP COLUMN IF EXISTS last_optimization_date,
DROP COLUMN IF EXISTS optimization_recommendation_id;

-- Note: Keep update_updated_at_column function as other tables use it
```

### 4.2 Backend Implementation

#### 4.2.1 Type Definitions

**File:** `backend/src/types/ai.ts`

```typescript
import { Decimal } from 'decimal.js';

export interface AIModel {
  id: string;
  modelName: string;
  modelVersion: string;
  modelType: 'resource_prediction' | 'optimization' | 'anomaly_detection';
  architecture?: string;
  hyperparameters: Record<string, any>;
  trainingDataPeriod: {
    start: Date;
    end: Date;
  };
  trainingCompletedAt?: Date;
  accuracyMetrics: {
    mae?: number;
    r2?: number;
    rmse?: number;
    [key: string]: number | undefined;
  };
  biasMetrics?: {
    demographicParity?: number;
    equalizedOdds?: number;
    fairnessScore?: number;
    [key: string]: number | undefined;
  };
  status: 'training' | 'validating' | 'active' | 'deprecated';
  deployedAt?: Date;
  deprecatedAt?: Date;
  createdBy?: string;
  modelArtifactUrl?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface OptimizationRecommendation {
  id: string;
  modelId: string;
  recommendationType: 'allocation' | 'distribution' | 'conservation' | 'production';
  priority: 'critical' | 'high' | 'medium' | 'low';
  resourceCategory: string;
  region: string;
  title: string;
  description: string;
  reasoning: {
    summary: string;
    dataPoints: Array<{
      factor: string;
      weight: number;
      confidence?: number;
      source: string;
    }>;
    alternatives?: Array<{
      option: string;
      pros: string;
      cons: string;
      whyNotChosen: string;
    }>;
  };
  confidenceScore: number;
  predictedImpact: {
    efficiencyGain?: number;
    environmentalBenefit?: number;
    socialBenefit?: number;
    peopleAffected?: number;
    [key: string]: number | undefined;
  };
  implementationSteps: Array<{
    step: number;
    action: string;
    duration: string;
    stakeholders?: string[];
    resources?: string[];
  }>;
  rbePrinciplesAlignment: number[];
  status: 'pending' | 'accepted' | 'rejected' | 'implemented' | 'under_review' | 'expired';
  acceptedBy?: string;
  acceptedAt?: Date;
  rejectionReason?: string;
  implementationStartedAt?: Date;
  implementationCompletedAt?: Date;
  actualImpact?: Record<string, number>;
  feedbackScore?: number;
  feedbackNotes?: string;
  expiresAt?: Date;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResourcePrediction {
  id: string;
  modelId: string;
  resourceId?: string;
  resourceCategory: string;
  region: string;
  predictionPeriod: '1_week' | '1_month' | '3_months' | '1_year';
  targetDate: Date;
  predictedValue: number;
  unit: string;
  confidenceIntervalLower: number;
  confidenceIntervalUpper: number;
  confidenceLevel: number;
  contributingFactors: {
    seasonality?: number;
    trend?: number;
    events?: number;
    [key: string]: number | undefined;
  };
  actualValue?: number;
  predictionError?: number;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface AITrainingJob {
  id: string;
  modelName: string;
  modelVersion: string;
  jobType: 'initial_training' | 'retraining' | 'validation' | 'hyperparameter_tuning';
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  trainingParameters: Record<string, any>;
  datasetInfo: {
    rows: number;
    period: string;
    sources: string[];
    [key: string]: any;
  };
  startedAt?: Date;
  completedAt?: Date;
  durationSeconds?: number;
  resultMetrics?: Record<string, any>;
  errorMessage?: string;
  logsUrl?: string;
  triggeredBy: 'manual' | 'scheduled' | 'drift_detection' | 'system';
  triggeredByUser?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScenarioAnalysis {
  id: string;
  modelId: string;
  createdBy: string;
  scenarioName: string;
  scenarioDescription?: string;
  baseParameters: Record<string, any>;
  modifiedParameters: Record<string, any>;
  predictions: Record<string, any>;
  comparisonMetrics: Record<string, any>;
  sharedPublicly: boolean;
  sharedWithUsers?: string[];
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// Request/Response types
export interface GetRecommendationsQuery {
  region?: string;
  priority?: 'critical' | 'high' | 'medium' | 'low';
  status?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export interface CreateRecommendationDecisionBody {
  decision: 'accepted' | 'rejected';
  notes?: string;
  assignedTo?: string;
}

export interface GetPredictionsQuery {
  region?: string;
  category?: string;
  period?: '1_week' | '1_month' | '3_months' | '1_year';
  targetDateFrom?: string;
  targetDateTo?: string;
}

export interface CreateScenarioBody {
  scenarioName: string;
  scenarioDescription?: string;
  baseParameters: Record<string, any>;
  modifiedParameters: Record<string, any>;
  predictionPeriod: '1_week' | '1_month' | '3_months' | '1_year';
}
```

#### 4.2.2 Validation Schemas

**File:** `backend/src/middleware/validation.ts` (add to existing file)

```typescript
import { z } from 'zod';

// AI Recommendations
export const getRecommendationsQuerySchema = z.object({
  region: z.string().optional(),
  priority: z.enum(['critical', 'high', 'medium', 'low']).optional(),
  status: z.enum(['pending', 'accepted', 'rejected', 'implemented', 'under_review', 'expired']).optional(),
  category: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export const recommendationDecisionSchema = z.object({
  decision: z.enum(['accepted', 'rejected']),
  notes: z.string().optional(),
  assignedTo: z.string().uuid().optional(),
});

// Predictions
export const getPredictionsQuerySchema = z.object({
  region: z.string().optional(),
  category: z.string().optional(),
  period: z.enum(['1_week', '1_month', '3_months', '1_year']).optional(),
  targetDateFrom: z.string().datetime().optional(),
  targetDateTo: z.string().datetime().optional(),
});

// Scenarios
export const createScenarioSchema = z.object({
  scenarioName: z.string().min(1).max(200),
  scenarioDescription: z.string().optional(),
  baseParameters: z.record(z.any()),
  modifiedParameters: z.record(z.any()),
  predictionPeriod: z.enum(['1_week', '1_month', '3_months', '1_year']),
});

// Model Training
export const triggerTrainingSchema = z.object({
  modelName: z.string().min(1).max(200),
  modelVersion: z.string().min(1).max(50),
  trainingParameters: z.record(z.any()).optional(),
});
```

#### 4.2.3 API Routes

**File:** `backend/src/routes/ai/recommendations.ts`

```typescript
import { Router } from 'express';
import { query } from '../../database/connection';
import { asyncHandler } from '../../middleware/errorHandler';
import { authenticate, authorize } from '../../middleware/auth';
import { validateQuery, validateBody, getRecommendationsQuerySchema, recommendationDecisionSchema } from '../../middleware/validation';
import type { AuthRequest } from '../../types';
import type { GetRecommendationsQuery, CreateRecommendationDecisionBody } from '../../types/ai';

const router = Router();

// GET /api/ai/recommendations - List recommendations
router.get(
  '/',
  validateQuery(getRecommendationsQuerySchema),
  asyncHandler(async (req: any, res: any) => {
    const { region, priority, status, category, page = 1, limit = 10 } = req.query as GetRecommendationsQuery;

    const offset = (page - 1) * limit;
    let queryText = `
      SELECT
        r.*,
        m.model_name,
        m.model_version,
        m.accuracy_metrics
      FROM optimization_recommendations r
      JOIN ai_models m ON r.model_id = m.id
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramCount = 1;

    if (region) {
      queryText += ` AND r.region = $${paramCount}`;
      params.push(region);
      paramCount++;
    }

    if (priority) {
      queryText += ` AND r.priority = $${paramCount}`;
      params.push(priority);
      paramCount++;
    }

    if (status) {
      queryText += ` AND r.status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    if (category) {
      queryText += ` AND r.resource_category = $${paramCount}`;
      params.push(category);
      paramCount++;
    }

    // Get total count
    const countQuery = queryText.replace('SELECT r.*, m.model_name, m.model_version, m.accuracy_metrics', 'SELECT COUNT(*)');
    const countResult = await query(countQuery, params);
    const total = parseInt(countResult.rows[0].count);

    // Get paginated results
    queryText += ` ORDER BY
      CASE r.priority
        WHEN 'critical' THEN 1
        WHEN 'high' THEN 2
        WHEN 'medium' THEN 3
        WHEN 'low' THEN 4
      END,
      r.created_at DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;
    params.push(limit, offset);

    const result = await query(queryText, params);

    res.json({
      success: true,
      data: result.rows.map(row => ({
        id: row.id,
        title: row.title,
        description: row.description,
        priority: row.priority,
        resourceCategory: row.resource_category,
        region: row.region,
        confidence: parseFloat(row.confidence_score),
        predictedImpact: row.predicted_impact,
        rbeAlignment: row.rbe_principles_alignment,
        status: row.status,
        expiresAt: row.expires_at,
        createdAt: row.created_at,
        modelInfo: {
          modelName: row.model_name,
          modelVersion: row.model_version,
          accuracy: row.accuracy_metrics,
        },
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  })
);

// GET /api/ai/recommendations/:id - Get recommendation details
router.get(
  '/:id',
  asyncHandler(async (req: any, res: any) => {
    const { id } = req.params;

    const result = await query(
      `
      SELECT
        r.*,
        m.model_name,
        m.model_version,
        m.accuracy_metrics,
        u.username as accepted_by_username
      FROM optimization_recommendations r
      JOIN ai_models m ON r.model_id = m.id
      LEFT JOIN users u ON r.accepted_by = u.id
      WHERE r.id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Recommendation not found',
      });
    }

    const row = result.rows[0];

    res.json({
      success: true,
      data: {
        id: row.id,
        title: row.title,
        description: row.description,
        priority: row.priority,
        confidence: parseFloat(row.confidence_score),
        reasoning: row.reasoning,
        implementationSteps: row.implementation_steps,
        rbeAlignment: row.rbe_principles_alignment,
        predictedImpact: row.predicted_impact,
        status: row.status,
        acceptedBy: row.accepted_by_username,
        acceptedAt: row.accepted_at,
        rejectionReason: row.rejection_reason,
        actualImpact: row.actual_impact,
        feedbackScore: row.feedback_score,
        feedbackNotes: row.feedback_notes,
        expiresAt: row.expires_at,
        modelInfo: {
          modelName: row.model_name,
          modelVersion: row.model_version,
          accuracy: row.accuracy_metrics,
        },
        createdAt: row.created_at,
      },
    });
  })
);

// POST /api/ai/recommendations/:id/decision - Accept/Reject recommendation
router.post(
  '/:id/decision',
  authenticate,
  authorize('manager', 'admin'),
  validateBody(recommendationDecisionSchema),
  asyncHandler(async (req: AuthRequest, res: any) => {
    const { id } = req.params;
    const { decision, notes, assignedTo } = req.body as CreateRecommendationDecisionBody;
    const userId = req.user!.userId;

    // Check if recommendation exists and is pending
    const checkResult = await query(
      'SELECT status FROM optimization_recommendations WHERE id = $1',
      [id]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Recommendation not found',
      });
    }

    if (checkResult.rows[0].status !== 'pending') {
      return res.status(400).json({
        success: false,
        error: 'Recommendation has already been processed',
      });
    }

    // Update recommendation
    const updateQuery = decision === 'accepted'
      ? `
        UPDATE optimization_recommendations
        SET
          status = 'accepted',
          accepted_by = $1,
          accepted_at = CURRENT_TIMESTAMP,
          feedback_notes = $2
        WHERE id = $3
        RETURNING *
      `
      : `
        UPDATE optimization_recommendations
        SET
          status = 'rejected',
          rejection_reason = $2
        WHERE id = $3
        RETURNING *
      `;

    const params = decision === 'accepted'
      ? [userId, notes || null, id]
      : [userId, notes || 'No reason provided', id];

    const result = await query(updateQuery, params);

    res.json({
      success: true,
      message: `Recommendation ${decision} successfully`,
      data: {
        id: result.rows[0].id,
        status: result.rows[0].status,
        acceptedBy: result.rows[0].accepted_by,
        acceptedAt: result.rows[0].accepted_at,
        rejectionReason: result.rows[0].rejection_reason,
      },
    });
  })
);

// GET /api/ai/recommendations/stats/summary - Get recommendation statistics
router.get(
  '/stats/summary',
  asyncHandler(async (req: any, res: any) => {
    const result = await query(`
      SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'pending') as pending,
        COUNT(*) FILTER (WHERE status = 'accepted') as accepted,
        COUNT(*) FILTER (WHERE status = 'rejected') as rejected,
        COUNT(*) FILTER (WHERE status = 'implemented') as implemented,
        COUNT(*) FILTER (WHERE priority = 'critical') as critical_priority,
        COUNT(*) FILTER (WHERE priority = 'high') as high_priority,
        AVG(confidence_score) FILTER (WHERE status = 'implemented') as avg_confidence_implemented,
        AVG(feedback_score) FILTER (WHERE feedback_score IS NOT NULL) as avg_feedback_score
      FROM optimization_recommendations
    `);

    res.json({
      success: true,
      data: {
        total: parseInt(result.rows[0].total),
        pending: parseInt(result.rows[0].pending),
        accepted: parseInt(result.rows[0].accepted),
        rejected: parseInt(result.rows[0].rejected),
        implemented: parseInt(result.rows[0].implemented),
        criticalPriority: parseInt(result.rows[0].critical_priority),
        highPriority: parseInt(result.rows[0].high_priority),
        avgConfidenceImplemented: parseFloat(result.rows[0].avg_confidence_implemented || 0),
        avgFeedbackScore: parseFloat(result.rows[0].avg_feedback_score || 0),
      },
    });
  })
);

export default router;
```

**File:** `backend/src/routes/ai/predictions.ts`

```typescript
import { Router } from 'express';
import { query } from '../../database/connection';
import { asyncHandler } from '../../middleware/errorHandler';
import { validateQuery, getPredictionsQuerySchema } from '../../middleware/validation';
import type { GetPredictionsQuery } from '../../types/ai';

const router = Router();

// GET /api/ai/predictions - List predictions
router.get(
  '/',
  validateQuery(getPredictionsQuerySchema),
  asyncHandler(async (req: any, res: any) => {
    const { region, category, period, targetDateFrom, targetDateTo } = req.query as GetPredictionsQuery;

    let queryText = `
      SELECT
        p.*,
        m.model_name,
        m.model_version
      FROM resource_predictions p
      JOIN ai_models m ON p.model_id = m.id
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramCount = 1;

    if (region) {
      queryText += ` AND p.region = $${paramCount}`;
      params.push(region);
      paramCount++;
    }

    if (category) {
      queryText += ` AND p.resource_category = $${paramCount}`;
      params.push(category);
      paramCount++;
    }

    if (period) {
      queryText += ` AND p.prediction_period = $${paramCount}`;
      params.push(period);
      paramCount++;
    }

    if (targetDateFrom) {
      queryText += ` AND p.target_date >= $${paramCount}`;
      params.push(targetDateFrom);
      paramCount++;
    }

    if (targetDateTo) {
      queryText += ` AND p.target_date <= $${paramCount}`;
      params.push(targetDateTo);
      paramCount++;
    }

    queryText += ' ORDER BY p.target_date ASC LIMIT 1000';

    const result = await query(queryText, params);

    res.json({
      success: true,
      data: result.rows.map(row => ({
        id: row.id,
        resourceCategory: row.resource_category,
        region: row.region,
        predictionPeriod: row.prediction_period,
        targetDate: row.target_date,
        predictedValue: parseFloat(row.predicted_value),
        unit: row.unit,
        confidenceInterval: {
          lower: parseFloat(row.confidence_interval_lower),
          upper: parseFloat(row.confidence_interval_upper),
          level: parseFloat(row.confidence_level),
        },
        contributingFactors: row.contributing_factors,
        actualValue: row.actual_value ? parseFloat(row.actual_value) : null,
        predictionError: row.prediction_error ? parseFloat(row.prediction_error) : null,
        createdAt: row.created_at,
      })),
    });
  })
);

export default router;
```

**File:** `backend/src/routes/ai/scenarios.ts`

```typescript
import { Router } from 'express';
import { query } from '../../database/connection';
import { asyncHandler } from '../../middleware/errorHandler';
import { authenticate } from '../../middleware/auth';
import { validateBody, createScenarioSchema } from '../../middleware/validation';
import { runScenarioAnalysis } from '../../services/ai/scenarioService';
import type { AuthRequest } from '../../types';
import type { CreateScenarioBody } from '../../types/ai';

const router = Router();

// POST /api/ai/scenarios - Create scenario analysis
router.post(
  '/',
  authenticate,
  validateBody(createScenarioSchema),
  asyncHandler(async (req: AuthRequest, res: any) => {
    const body = req.body as CreateScenarioBody;
    const userId = req.user!.userId;

    // Get active model
    const modelResult = await query(
      `SELECT id FROM ai_models
       WHERE model_type = 'resource_prediction'
       AND status = 'active'
       ORDER BY created_at DESC
       LIMIT 1`
    );

    if (modelResult.rows.length === 0) {
      return res.status(503).json({
        success: false,
        error: 'No active prediction model available',
      });
    }

    const modelId = modelResult.rows[0].id;

    // Run scenario analysis (calls ML service)
    const predictions = await runScenarioAnalysis({
      modelId,
      baseParameters: body.baseParameters,
      modifiedParameters: body.modifiedParameters,
      predictionPeriod: body.predictionPeriod,
    });

    // Calculate comparison metrics
    const comparisonMetrics = calculateComparison(predictions.baseline, predictions.scenario);

    // Save scenario
    const result = await query(
      `INSERT INTO scenario_analyses
       (model_id, created_by, scenario_name, scenario_description,
        base_parameters, modified_parameters, predictions, comparison_metrics)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        modelId,
        userId,
        body.scenarioName,
        body.scenarioDescription,
        JSON.stringify(body.baseParameters),
        JSON.stringify(body.modifiedParameters),
        JSON.stringify(predictions),
        JSON.stringify(comparisonMetrics),
      ]
    );

    res.status(201).json({
      success: true,
      data: {
        id: result.rows[0].id,
        scenarioName: result.rows[0].scenario_name,
        predictions: result.rows[0].predictions,
        comparisonToBaseline: comparisonMetrics,
        createdAt: result.rows[0].created_at,
      },
    });
  })
);

// Helper function
function calculateComparison(baseline: any, scenario: any) {
  const comparison: Record<string, string> = {};

  for (const key in scenario) {
    if (baseline[key] !== undefined) {
      const diff = scenario[key] - baseline[key];
      const percentChange = ((diff / baseline[key]) * 100).toFixed(1);
      comparison[key] = diff >= 0 ? `+${percentChange}%` : `${percentChange}%`;
    }
  }

  return comparison;
}

export default router;
```

**File:** `backend/src/routes/ai/index.ts` (Main router)

```typescript
import { Router } from 'express';
import recommendationsRouter from './recommendations';
import predictionsRouter from './predictions';
import scenariosRouter from './scenarios';
import modelsRouter from './models';

const router = Router();

router.use('/recommendations', recommendationsRouter);
router.use('/predictions', predictionsRouter);
router.use('/scenarios', scenariosRouter);
router.use('/models', modelsRouter);

export default router;
```

**Update:** `backend/src/index.ts`

```typescript
// Add to existing imports
import aiRoutes from './routes/ai';

// Add to routes
app.use('/api/ai', aiRoutes);
```

---

## 5. Frontend Implementation

### 5.1 Components

**File:** `frontend/src/components/Tabs/AIOptimizationTab.tsx`

```typescript
import React, { useState } from 'react';
import { useRecommendations } from '../../hooks/useRecommendations';
import { RecommendationList } from '../AI/RecommendationList';
import { PredictionDashboard } from '../AI/PredictionDashboard';
import { ScenarioBuilder } from '../AI/ScenarioBuilder';
import { ModelPerformance } from '../AI/ModelPerformance';

export const AIOptimizationTab = () => {
  const [activeSubTab, setActiveSubTab] = useState<'recommendations' | 'predictions' | 'scenarios' | 'model'>('recommendations');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          AI Resource Optimization
        </h2>
        <p className="text-gray-600 mb-6">
          AI-powered insights for optimal resource allocation, predictive forecasting, and scenario planning
        </p>

        {/* Sub-navigation */}
        <div className="flex space-x-4 border-b border-gray-200">
          {(['recommendations', 'predictions', 'scenarios', 'model'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-4 py-2 font-medium transition-colors ${
                activeSubTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeSubTab === 'recommendations' && <RecommendationList />}
      {activeSubTab === 'predictions' && <PredictionDashboard />}
      {activeSubTab === 'scenarios' && <ScenarioBuilder />}
      {activeSubTab === 'model' && <ModelPerformance />}
    </div>
  );
};
```

**File:** `frontend/src/components/AI/RecommendationList.tsx`

```typescript
import React, { useState } from 'react';
import { useRecommendations } from '../../hooks/useRecommendations';
import { RecommendationCard } from './RecommendationCard';

export const RecommendationList = () => {
  const [filters, setFilters] = useState({
    priority: undefined as string | undefined,
    region: undefined as string | undefined,
  });

  const { data, loading, error, pagination, refetch } = useRecommendations({
    page: 1,
    limit: 10,
    ...filters,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Error loading recommendations: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 flex space-x-4">
        <select
          value={filters.priority || ''}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value || undefined })}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Priorities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select
          value={filters.region || ''}
          onChange={(e) => setFilters({ ...filters, region: e.target.value || undefined })}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Regions</option>
          <option value="global">Global</option>
          <option value="africa">Africa</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="americas">Americas</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        {data.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600">No recommendations found</p>
          </div>
        ) : (
          data.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
              onUpdate={refetch}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => {/* implement pagination */}}
              className={`px-4 py-2 rounded-lg ${
                page === pagination.page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
```

### 5.2 Custom Hooks

**File:** `frontend/src/hooks/useRecommendations.ts`

```typescript
import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

interface UseRecommendationsOptions {
  page?: number;
  limit?: number;
  priority?: string;
  region?: string;
  status?: string;
  category?: string;
  autoFetch?: boolean;
}

export const useRecommendations = (options: UseRecommendationsOptions = {}) => {
  const { page = 1, limit = 10, priority, region, status, category, autoFetch = true } = options;

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<any>(null);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiService.get('/ai/recommendations', {
        params: { page, limit, priority, region, status, category },
      });

      if (response.success && response.data) {
        setData(response.data);
        setPagination(response.pagination);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchRecommendations();
    }
  }, [page, limit, priority, region, status, category, autoFetch]);

  return {
    data,
    loading,
    error,
    pagination,
    refetch: fetchRecommendations,
  };
};
```

---

## 6. Testing Plan

### 6.1 Unit Tests

**Backend:** `backend/src/routes/ai/__tests__/recommendations.test.ts`

```typescript
import request from 'supertest';
import { app } from '../../index';
import { query } from '../../database/connection';

describe('AI Recommendations API', () => {
  let authToken: string;

  beforeAll(async () => {
    // Get auth token
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password' });
    authToken = response.body.data.token;
  });

  describe('GET /api/ai/recommendations', () => {
    it('should return recommendations with pagination', async () => {
      const response = await request(app)
        .get('/api/ai/recommendations?page=1&limit=10')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.pagination).toBeDefined();
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(10);
    });

    it('should filter by priority', async () => {
      const response = await request(app)
        .get('/api/ai/recommendations?priority=high')
        .expect(200);

      response.body.data.forEach((rec: any) => {
        expect(rec.priority).toBe('high');
      });
    });

    it('should filter by region', async () => {
      const response = await request(app)
        .get('/api/ai/recommendations?region=africa')
        .expect(200);

      response.body.data.forEach((rec: any) => {
        expect(rec.region).toBe('africa');
      });
    });
  });

  describe('POST /api/ai/recommendations/:id/decision', () => {
    it('should accept recommendation with valid auth', async () => {
      // Create test recommendation first
      const createResult = await query(
        `INSERT INTO optimization_recommendations
         (model_id, recommendation_type, priority, resource_category, region, title, description, reasoning, confidence_score, predicted_impact, implementation_steps, rbe_principles_alignment)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
         RETURNING id`,
        [
          /* ... test data ... */
        ]
      );

      const recId = createResult.rows[0].id;

      const response = await request(app)
        .post(`/api/ai/recommendations/${recId}/decision`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ decision: 'accepted', notes: 'Approved for testing' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe('accepted');
    });

    it('should reject without auth', async () => {
      await request(app)
        .post('/api/ai/recommendations/some-id/decision')
        .send({ decision: 'accepted' })
        .expect(401);
    });
  });
});
```

**Frontend:** `frontend/src/components/AI/__tests__/RecommendationCard.test.tsx`

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RecommendationCard } from '../RecommendationCard';

describe('RecommendationCard', () => {
  const mockRecommendation = {
    id: '123',
    title: 'Test Recommendation',
    description: 'Test description',
    priority: 'high',
    confidence: 0.95,
    predictedImpact: {
      efficiencyGain: 15,
      environmentalBenefit: 12,
    },
    rbeAlignment: [1, 3, 9],
    status: 'pending',
  };

  it('renders recommendation details', () => {
    render(<RecommendationCard recommendation={mockRecommendation} onUpdate={() => {}} />);

    expect(screen.getByText('Test Recommendation')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('95%')).toBeInTheDocument(); // confidence
  });

  it('shows priority badge with correct color', () => {
    render(<RecommendationCard recommendation={mockRecommendation} onUpdate={() => {}} />);

    const badge = screen.getByText('HIGH');
    expect(badge).toHaveClass('bg-orange-100'); // high priority color
  });

  it('handles view details click', () => {
    const onUpdate = vi.fn();
    render(<RecommendationCard recommendation={mockRecommendation} onUpdate={onUpdate} />);

    const viewButton = screen.getByText('View Details');
    fireEvent.click(viewButton);

    // Should navigate or expand
    // Test based on actual implementation
  });
});
```

---

**Note:** This technical plan continues with sections 7-11 covering deployment, monitoring, performance optimization, documentation, and timeline. The complete plan would be approximately 3000+ lines covering every implementation detail. This excerpt demonstrates the comprehensive approach required for spec-driven development.

---

## Document Status

**Version**: 1.0
**Status**: Example Technical Plan
**Related Files**:
- Feature Spec: `FEATURE_SPEC_AI_RESOURCE_OPTIMIZATION.md`
- Constitution: `.speckit/constitution/RBE_PLATFORM_CONSTITUTION.md`

**Next Steps**:
1. Review and approve technical plan
2. Create task breakdown from this plan
3. Begin implementation following 12-week timeline
