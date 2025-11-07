# Developer Guide

Welcome to the RBE Platform development guide! This document will help you understand the architecture, set up your development environment, and contribute effectively.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Architecture Overview](#architecture-overview)
3. [Frontend Development](#frontend-development)
4. [Backend Development](#backend-development)
5. [Database](#database)
6. [Testing](#testing)
7. [API Reference](#api-reference)
8. [Contributing](#contributing)
9. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites

- **Node.js** 20+
- **PostgreSQL** 16+
- **Docker** (optional, for containerized development)
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/The-Venus-Project-AI/100-Rules-Jacque-Fresco-Would-Suggest-We-Follow.git
cd 100-Rules-Jacque-Fresco-Would-Suggest-We-Follow

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Environment Setup

```bash
# Frontend
cd frontend
cp .env.example .env
# Edit .env with your configuration

# Backend
cd ../backend
cp .env.example .env
# Edit .env with your database credentials
```

### Database Setup

```bash
# Option 1: Using Docker
docker compose up -d postgres

# Option 2: Local PostgreSQL
createdb rbe_platform

# Run migrations
psql -U postgres -d rbe_platform -f backend/database/migrations/001_initial_schema.sql
psql -U postgres -d rbe_platform -f backend/database/migrations/002_seed_data.sql
```

### Running the Application

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

---

## Architecture Overview

### Frontend Architecture

```
frontend/
├── src/
│   ├── components/        # React components
│   │   ├── Layout/       # Header, Footer, Navigation
│   │   ├── Tabs/         # Tab content components
│   │   ├── Cards/        # Reusable card components
│   │   └── Common/       # Shared components (ErrorBoundary)
│   ├── store/            # Zustand state management
│   ├── services/         # API service layer
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript interfaces
│   ├── i18n/             # Internationalization
│   └── __tests__/        # Test files
└── package.json
```

**Key Technologies:**
- React 18 with TypeScript
- Zustand (state management)
- Recharts (data visualization)
- Tailwind CSS (styling)
- Vitest + React Testing Library (testing)
- react-i18next (internationalization)

### Backend Architecture

```
backend/
├── src/
│   ├── routes/           # API endpoints
│   ├── middleware/       # Express middleware
│   ├── database/         # Database connection
│   ├── services/         # Business logic
│   └── types/            # TypeScript interfaces
├── database/
│   └── migrations/       # SQL migration files
└── package.json
```

**Key Technologies:**
- Node.js + Express
- PostgreSQL
- TypeScript
- Zod (validation)
- JWT (authentication)
- Helmet (security)

---

## Frontend Development

### Component Structure

All components follow this pattern:

```typescript
// components/ComponentName.tsx
import { ComponentProps } from '../types';

export const ComponentName = ({ prop1, prop2 }: ComponentProps) => {
  return (
    <div className="...">
      {/* Component content */}
    </div>
  );
};
```

### State Management

Using Zustand for global state:

```typescript
// store/useAppStore.ts
import { create } from 'zustand';

export const useAppStore = create<AppState>((set) => ({
  activeTab: 'overview',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

// Usage in components
import { useAppStore } from '../store/useAppStore';

const MyComponent = () => {
  const { activeTab, setActiveTab } = useAppStore();
  // ...
};
```

### Custom Hooks

#### Data Fetching Hooks

```typescript
// hooks/useResources.ts
import { useResources } from '../hooks/useResources';

const MyComponent = () => {
  const { data, loading, error, refetch } = useResources({
    page: 1,
    limit: 10,
    region: 'global',
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{/* Render data */}</div>;
};
```

#### API Hook

```typescript
import { useApi } from '../hooks/useApi';
import { apiService } from '../services/api';

const MyComponent = () => {
  const { data, loading, error, execute } = useApi(
    apiService.getResources,
    { autoFetch: true }
  );
};
```

### Adding a New Component

1. Create component file in appropriate directory
2. Define TypeScript interfaces
3. Implement component logic
4. Add tests
5. Export from index file (if needed)

Example:

```typescript
// components/Cards/NewCard.tsx
import { NewCardProps } from '../../types';

export const NewCard = ({ title, value }: NewCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl">{value}</p>
    </div>
  );
};
```

### Styling Guidelines

We use Tailwind CSS. Follow these conventions:

- Use utility classes instead of custom CSS
- Keep component-specific styles inline
- Use consistent spacing scale (4, 8, 16, 24, 32px)
- Follow color palette from `utils/visualization.ts`

### Internationalization

Add translations:

```json
// i18n/locales/en.json
{
  "myFeature": {
    "title": "My Feature",
    "description": "Description here"
  }
}
```

Use in components:

```typescript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();

  return <h1>{t('myFeature.title')}</h1>;
};
```

---

## Backend Development

### Adding a New Endpoint

1. Create route file in `src/routes/`
2. Add validation schema
3. Implement endpoint logic
4. Register route in `src/index.ts`
5. Add tests

Example:

```typescript
// src/routes/myroute.ts
import { Router } from 'express';
import { query } from '../database/connection';
import { asyncHandler } from '../middleware/errorHandler';
import { validateBody, mySchema } from '../middleware/validation';

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
  const result = await query('SELECT * FROM my_table');

  res.json({
    success: true,
    data: result.rows,
  });
}));

router.post('/', validateBody(mySchema), asyncHandler(async (req, res) => {
  const { field1, field2 } = req.body;

  const result = await query(
    'INSERT INTO my_table (field1, field2) VALUES ($1, $2) RETURNING *',
    [field1, field2]
  );

  res.status(201).json({
    success: true,
    data: result.rows[0],
  });
}));

export default router;
```

### Validation

Define Zod schemas in `middleware/validation.ts`:

```typescript
import { z } from 'zod';

export const mySchema = z.object({
  field1: z.string().min(1).max(100),
  field2: z.number().positive(),
  field3: z.enum(['option1', 'option2']).optional(),
});
```

### Authentication

Protect routes with authentication middleware:

```typescript
import { authenticate, authorize } from '../middleware/auth';

// Require authentication
router.get('/protected', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const userId = req.user!.userId;
  // ...
}));

// Require specific role
router.delete('/admin-only', authenticate, authorize('admin'), asyncHandler(async (req, res) => {
  // ...
}));
```

### Database Queries

Always use parameterized queries to prevent SQL injection:

```typescript
// ✅ Good
const result = await query('SELECT * FROM users WHERE id = $1', [userId]);

// ❌ Bad
const result = await query(`SELECT * FROM users WHERE id = ${userId}`);
```

Use transactions for multiple related queries:

```typescript
import { transaction } from '../database/connection';

await transaction(async (client) => {
  await client.query('INSERT INTO table1 VALUES ($1)', [value1]);
  await client.query('INSERT INTO table2 VALUES ($1)', [value2]);
  // Both succeed or both rollback
});
```

---

## Database

### Schema Overview

The database has 9 main tables:

1. **resources** - Resource inventory
2. **principles_implementation** - 100 principles tracking
3. **cooperation_metrics** - Global cooperation data
4. **automation_progress** - Automation tracking
5. **environmental_metrics** - Environmental data
6. **social_metrics** - Social indicators
7. **users** - User accounts
8. **user_contributions** - Community contributions
9. **circular_cities** - Circular city tracking

### Adding a Migration

1. Create SQL file in `database/migrations/`
2. Name it sequentially (e.g., `003_add_new_table.sql`)
3. Include both schema changes and data

```sql
-- 003_add_new_table.sql
CREATE TABLE IF NOT EXISTS my_new_table (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_my_new_table_name ON my_new_table(name);
```

4. Run migration:

```bash
psql -U postgres -d rbe_platform -f backend/database/migrations/003_add_new_table.sql
```

### Querying Best Practices

- Always use indexes for frequently queried columns
- Use EXPLAIN ANALYZE to optimize slow queries
- Limit result sets with LIMIT and OFFSET for pagination
- Use appropriate data types (UUID for IDs, TIMESTAMP WITH TIME ZONE for dates)
- Include foreign key constraints for referential integrity

---

## Testing

### Frontend Tests

Run tests:

```bash
cd frontend
npm test              # Run tests
npm run test:coverage # With coverage
npm run test:ui       # With UI
```

Writing component tests:

```typescript
// __tests__/MyComponent.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MyComponent } from '../components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<MyComponent onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Backend Tests

(Tests to be implemented - framework ready)

---

## API Reference

### Base URL

```
http://localhost:3001/api
```

### Authentication

Include JWT token in requests:

```bash
Authorization: Bearer <token>
```

### Endpoints

#### Authentication

```bash
POST   /api/auth/register    # Register user
POST   /api/auth/login        # Login user
GET    /api/auth/me           # Get current user
POST   /api/auth/refresh      # Refresh token
PUT    /api/auth/change-password # Change password
```

#### Resources

```bash
GET    /api/resources         # List resources
GET    /api/resources/:id     # Get resource
POST   /api/resources         # Create resource
PUT    /api/resources/:id     # Update resource
DELETE /api/resources/:id     # Delete resource
GET    /api/resources/meta/categories # Get categories
GET    /api/resources/meta/regions # Get regions
```

#### Principles

```bash
GET    /api/principles        # List principles
GET    /api/principles/:number # Get principle
PUT    /api/principles/:number # Update principle
GET    /api/principles/stats/summary # Get summary stats
GET    /api/principles/stats/by-category # Get category stats
```

#### Cooperation

```bash
GET    /api/cooperation       # List cooperation metrics
GET    /api/cooperation/:id   # Get metric
POST   /api/cooperation       # Create metric
DELETE /api/cooperation/:id   # Delete metric
GET    /api/cooperation/stats/by-region # Region stats
GET    /api/cooperation/stats/by-type # Type stats
```

#### Automation

```bash
GET    /api/automation        # List automation progress
GET    /api/automation/:id    # Get record
POST   /api/automation        # Create record
DELETE /api/automation/:id    # Delete record
GET    /api/automation/stats/by-sector # Sector stats
GET    /api/automation/stats/summary # Summary stats
```

#### Environmental

```bash
GET    /api/environmental     # List environmental metrics
GET    /api/environmental/:id # Get metric
POST   /api/environmental     # Create metric
DELETE /api/environmental/:id # Delete metric
GET    /api/environmental/stats/by-type # Type stats
GET    /api/environmental/stats/latest # Latest metrics
```

#### Social

```bash
GET    /api/social            # List social metrics
GET    /api/social/:id        # Get metric
POST   /api/social            # Create metric
DELETE /api/social/:id        # Delete metric
GET    /api/social/stats/by-category # Category stats
GET    /api/social/stats/by-region # Region stats
GET    /api/social/stats/latest # Latest metrics
```

#### Circular Cities

```bash
GET    /api/cities            # List cities
GET    /api/cities/:id        # Get city
POST   /api/cities            # Create city
PUT    /api/cities/:id        # Update city
DELETE /api/cities/:id        # Delete city
GET    /api/cities/stats/by-status # Status stats
GET    /api/cities/stats/summary # Summary stats
```

### Response Format

All responses follow this format:

```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional message",
  "error": "Optional error message"
}
```

Paginated responses include:

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

---

## Contributing

### Git Workflow

1. Create feature branch from `main`
2. Make changes
3. Write tests
4. Commit with descriptive messages
5. Push and create pull request

```bash
git checkout -b feature/my-feature
# Make changes
git add .
git commit -m "Add: My feature description"
git push origin feature/my-feature
```

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Write descriptive variable names
- Add comments for complex logic
- Keep functions small and focused

### Pull Request Checklist

- [ ] Code follows project style guidelines
- [ ] Tests added/updated and passing
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Commits are descriptive
- [ ] PR description explains changes

---

## Troubleshooting

### Common Issues

**Database Connection Error**

```bash
Error: connect ECONNREFUSED ::1:5432
```

Solution: Check PostgreSQL is running and credentials in `.env` are correct.

**Port Already in Use**

```bash
Error: listen EADDRINUSE: address already in use :::3001
```

Solution: Kill process using the port or change PORT in `.env`.

**TypeScript Errors**

```bash
error TS2307: Cannot find module './types'
```

Solution: Ensure imports have correct paths and TypeScript is properly configured.

### Getting Help

- Check existing issues on GitHub
- Review documentation in `/docs`
- Ask in community forums
- Create detailed issue with reproduction steps

---

## Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vitest](https://vitest.dev/)

---

**Happy Coding! Together we're building a sustainable future for all humanity.**

*"The future is not something that happens to us, but something we create."* - Jacque Fresco
