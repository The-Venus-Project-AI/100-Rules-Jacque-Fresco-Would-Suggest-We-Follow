# Open Government Platform - Project Structure

This document outlines the recommended directory structure for the open-source government budget transparency platform.

---

## 📁 Root Directory Structure

```
government-budget-platform/
│
├── 📂 backend/                      # Backend API server
│   ├── 📂 src/
│   │   ├── 📂 modules/             # Feature modules
│   │   │   ├── 📂 budget/          # Budget management
│   │   │   │   ├── budget.controller.ts
│   │   │   │   ├── budget.service.ts
│   │   │   │   ├── budget.repository.ts
│   │   │   │   ├── budget.model.ts
│   │   │   │   ├── budget.validator.ts
│   │   │   │   └── budget.routes.ts
│   │   │   │
│   │   │   ├── 📂 transactions/    # Transaction tracking
│   │   │   │   ├── transaction.controller.ts
│   │   │   │   ├── transaction.service.ts
│   │   │   │   ├── transaction.repository.ts
│   │   │   │   └── transaction.routes.ts
│   │   │   │
│   │   │   ├── 📂 voting/          # Voting system
│   │   │   │   ├── 📂 proposals/
│   │   │   │   │   ├── proposal.controller.ts
│   │   │   │   │   ├── proposal.service.ts
│   │   │   │   │   └── proposal.validator.ts
│   │   │   │   ├── 📂 votes/
│   │   │   │   │   ├── vote.controller.ts
│   │   │   │   │   ├── vote.service.ts
│   │   │   │   │   └── vote.anonymization.ts
│   │   │   │   └── 📂 results/
│   │   │   │       ├── result.calculator.ts
│   │   │   │       └── result.publisher.ts
│   │   │   │
│   │   │   ├── 📂 jurisdictions/   # Geographic regions
│   │   │   │   ├── jurisdiction.controller.ts
│   │   │   │   ├── jurisdiction.service.ts
│   │   │   │   └── jurisdiction.hierarchy.ts
│   │   │   │
│   │   │   ├── 📂 users/           # User management
│   │   │   │   ├── user.controller.ts
│   │   │   │   ├── user.service.ts
│   │   │   │   ├── user.repository.ts
│   │   │   │   └── user.verification.ts
│   │   │   │
│   │   │   ├── 📂 auth/            # Authentication
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── strategies/
│   │   │   │   │   ├── oauth.strategy.ts
│   │   │   │   │   ├── government-id.strategy.ts
│   │   │   │   │   └── two-factor.strategy.ts
│   │   │   │   └── guards/
│   │   │   │       ├── jwt.guard.ts
│   │   │   │       └── verified-citizen.guard.ts
│   │   │   │
│   │   │   ├── 📂 analytics/       # Performance metrics
│   │   │   │   ├── metrics.controller.ts
│   │   │   │   ├── metrics.service.ts
│   │   │   │   ├── performance.calculator.ts
│   │   │   │   └── efficiency.analyzer.ts
│   │   │   │
│   │   │   ├── 📂 sensitive/       # Sensitive operations
│   │   │   │   ├── sensitive.controller.ts
│   │   │   │   ├── classification.service.ts
│   │   │   │   ├── oversight.access.ts
│   │   │   │   └── declassification.scheduler.ts
│   │   │   │
│   │   │   └── 📂 notifications/   # Notification system
│   │   │       ├── notification.controller.ts
│   │   │       ├── notification.service.ts
│   │   │       └── channels/
│   │   │           ├── email.channel.ts
│   │   │           ├── sms.channel.ts
│   │   │           └── push.channel.ts
│   │   │
│   │   ├── 📂 shared/              # Shared utilities
│   │   │   ├── 📂 middleware/
│   │   │   │   ├── error-handler.ts
│   │   │   │   ├── security.ts
│   │   │   │   ├── rate-limiter.ts
│   │   │   │   ├── audit-logger.ts
│   │   │   │   └── cors.ts
│   │   │   │
│   │   │   ├── 📂 utils/
│   │   │   │   ├── encryption.ts
│   │   │   │   ├── hashing.ts
│   │   │   │   ├── date.ts
│   │   │   │   ├── currency.ts
│   │   │   │   └── validators.ts
│   │   │   │
│   │   │   ├── 📂 types/
│   │   │   │   ├── index.ts
│   │   │   │   ├── budget.types.ts
│   │   │   │   ├── voting.types.ts
│   │   │   │   └── user.types.ts
│   │   │   │
│   │   │   └── 📂 constants/
│   │   │       ├── index.ts
│   │   │       ├── vote-thresholds.ts
│   │   │       └── sensitivity-levels.ts
│   │   │
│   │   ├── 📂 database/            # Database layer
│   │   │   ├── 📂 migrations/
│   │   │   │   ├── 001_initial_schema.sql
│   │   │   │   ├── 002_add_voting_tables.sql
│   │   │   │   ├── 003_add_jurisdictions.sql
│   │   │   │   └── ...
│   │   │   │
│   │   │   ├── 📂 seeds/
│   │   │   │   ├── dev/
│   │   │   │   │   ├── users.seed.ts
│   │   │   │   │   └── budgets.seed.ts
│   │   │   │   └── production/
│   │   │   │       └── jurisdictions.seed.ts
│   │   │   │
│   │   │   ├── connection.ts
│   │   │   └── pool.ts
│   │   │
│   │   ├── 📂 integrations/        # External system integrations
│   │   │   ├── 📂 treasury/
│   │   │   │   ├── treasury-api.client.ts
│   │   │   │   └── treasury-data.transformer.ts
│   │   │   │
│   │   │   ├── 📂 identity/
│   │   │   │   ├── government-id.client.ts
│   │   │   │   └── identity-verification.service.ts
│   │   │   │
│   │   │   └── 📂 gis/
│   │   │       └── mapping.service.ts
│   │   │
│   │   ├── 📂 jobs/                # Background jobs
│   │   │   ├── 📂 schedulers/
│   │   │   │   ├── data-sync.job.ts
│   │   │   │   ├── vote-tally.job.ts
│   │   │   │   ├── notification.job.ts
│   │   │   │   └── declassification.job.ts
│   │   │   │
│   │   │   └── queue-config.ts
│   │   │
│   │   ├── app.ts                  # Express app setup
│   │   ├── server.ts               # Server entry point
│   │   └── config.ts               # Configuration
│   │
│   ├── 📂 tests/
│   │   ├── 📂 unit/
│   │   │   ├── budget.service.test.ts
│   │   │   ├── vote.anonymization.test.ts
│   │   │   └── ...
│   │   │
│   │   ├── 📂 integration/
│   │   │   ├── budget-api.test.ts
│   │   │   ├── voting-flow.test.ts
│   │   │   └── ...
│   │   │
│   │   └── 📂 e2e/
│   │       ├── complete-vote.test.ts
│   │       └── budget-approval.test.ts
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── Dockerfile
│
├── 📂 frontend/                     # React frontend application
│   ├── 📂 src/
│   │   ├── 📂 pages/               # Page components
│   │   │   ├── 📂 home/
│   │   │   │   ├── HomePage.tsx
│   │   │   │   └── HomePage.module.css
│   │   │   │
│   │   │   ├── 📂 budget/
│   │   │   │   ├── BudgetExplorerPage.tsx
│   │   │   │   ├── BudgetDetailsPage.tsx
│   │   │   │   ├── TransactionsPage.tsx
│   │   │   │   └── PerformancePage.tsx
│   │   │   │
│   │   │   ├── 📂 voting/
│   │   │   │   ├── ProposalsListPage.tsx
│   │   │   │   ├── ProposalDetailsPage.tsx
│   │   │   │   ├── VotingPage.tsx
│   │   │   │   ├── ResultsPage.tsx
│   │   │   │   └── MyVotesPage.tsx
│   │   │   │
│   │   │   ├── 📂 jurisdiction/
│   │   │   │   ├── RegionSelectorPage.tsx
│   │   │   │   ├── RegionDashboardPage.tsx
│   │   │   │   └── ComparisonPage.tsx
│   │   │   │
│   │   │   ├── 📂 auth/
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   ├── RegisterPage.tsx
│   │   │   │   └── VerifyPage.tsx
│   │   │   │
│   │   │   └── 📂 profile/
│   │   │       ├── ProfilePage.tsx
│   │   │       ├── SettingsPage.tsx
│   │   │       └── NotificationsPage.tsx
│   │   │
│   │   ├── 📂 components/          # Reusable components
│   │   │   ├── 📂 budget/
│   │   │   │   ├── BudgetChart.tsx
│   │   │   │   ├── BudgetBreakdown.tsx
│   │   │   │   ├── BudgetCompare.tsx
│   │   │   │   ├── TransactionList.tsx
│   │   │   │   ├── TransactionDetail.tsx
│   │   │   │   ├── SpendingTrend.tsx
│   │   │   │   └── CategoryPieChart.tsx
│   │   │   │
│   │   │   ├── 📂 voting/
│   │   │   │   ├── ProposalCard.tsx
│   │   │   │   ├── ProposalTimeline.tsx
│   │   │   │   ├── VoteButton.tsx
│   │   │   │   ├── VoteProgress.tsx
│   │   │   │   ├── CommentSection.tsx
│   │   │   │   └── ImpactAssessment.tsx
│   │   │   │
│   │   │   ├── 📂 maps/
│   │   │   │   ├── JurisdictionMap.tsx
│   │   │   │   ├── SpendingHeatmap.tsx
│   │   │   │   └── RegionalComparison.tsx
│   │   │   │
│   │   │   ├── 📂 charts/
│   │   │   │   ├── BarChart.tsx
│   │   │   │   ├── LineChart.tsx
│   │   │   │   ├── PieChart.tsx
│   │   │   │   ├── TreemapChart.tsx
│   │   │   │   └── SankeyDiagram.tsx
│   │   │   │
│   │   │   ├── 📂 layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Navigation.tsx
│   │   │   │   └── Breadcrumbs.tsx
│   │   │   │
│   │   │   ├── 📂 common/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Select.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Table.tsx
│   │   │   │   ├── Tabs.tsx
│   │   │   │   ├── Tooltip.tsx
│   │   │   │   └── Loading.tsx
│   │   │   │
│   │   │   └── 📂 filters/
│   │   │       ├── DateRangeFilter.tsx
│   │   │       ├── CategoryFilter.tsx
│   │   │       ├── RegionFilter.tsx
│   │   │       └── AmountFilter.tsx
│   │   │
│   │   ├── 📂 hooks/               # Custom React hooks
│   │   │   ├── useBudget.ts
│   │   │   ├── useTransactions.ts
│   │   │   ├── useProposals.ts
│   │   │   ├── useVoting.ts
│   │   │   ├── useAuth.ts
│   │   │   ├── useJurisdiction.ts
│   │   │   └── useAnalytics.ts
│   │   │
│   │   ├── 📂 services/            # API services
│   │   │   ├── api.client.ts
│   │   │   ├── budget.service.ts
│   │   │   ├── voting.service.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── user.service.ts
│   │   │   └── analytics.service.ts
│   │   │
│   │   ├── 📂 store/               # State management
│   │   │   ├── index.ts
│   │   │   ├── auth.store.ts
│   │   │   ├── budget.store.ts
│   │   │   ├── voting.store.ts
│   │   │   ├── jurisdiction.store.ts
│   │   │   └── ui.store.ts
│   │   │
│   │   ├── 📂 utils/               # Utility functions
│   │   │   ├── formatters.ts       # Number, currency, date formatting
│   │   │   ├── validators.ts
│   │   │   ├── calculations.ts
│   │   │   ├── storage.ts
│   │   │   └── analytics.ts
│   │   │
│   │   ├── 📂 types/               # TypeScript types
│   │   │   ├── budget.types.ts
│   │   │   ├── voting.types.ts
│   │   │   ├── user.types.ts
│   │   │   └── api.types.ts
│   │   │
│   │   ├── 📂 constants/           # Constants
│   │   │   ├── routes.ts
│   │   │   ├── api-endpoints.ts
│   │   │   ├── vote-thresholds.ts
│   │   │   └── colors.ts
│   │   │
│   │   ├── 📂 styles/              # Global styles
│   │   │   ├── globals.css
│   │   │   ├── variables.css
│   │   │   └── tailwind.config.js
│   │   │
│   │   ├── App.tsx                 # Root component
│   │   ├── main.tsx                # Entry point
│   │   ├── router.tsx              # Route configuration
│   │   └── vite-env.d.ts
│   │
│   ├── 📂 public/
│   │   ├── favicon.ico
│   │   ├── logo.svg
│   │   └── manifest.json
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── Dockerfile
│
├── 📂 mobile/                       # React Native mobile app (future)
│   ├── 📂 ios/
│   ├── 📂 android/
│   └── 📂 src/
│       └── (similar structure to frontend)
│
├── 📂 data-pipeline/                # ETL and data processing
│   ├── 📂 extractors/
│   │   ├── treasury-extractor.py
│   │   ├── financial-system-extractor.py
│   │   └── tax-data-extractor.py
│   │
│   ├── 📂 transformers/
│   │   ├── budget-transformer.py
│   │   ├── transaction-transformer.py
│   │   └── jurisdiction-mapper.py
│   │
│   ├── 📂 loaders/
│   │   ├── database-loader.py
│   │   └── cache-loader.py
│   │
│   ├── 📂 validators/
│   │   ├── data-validator.py
│   │   └── schema-validator.py
│   │
│   ├── 📂 dags/                    # Airflow DAGs
│   │   ├── daily-budget-sync.py
│   │   ├── hourly-transaction-sync.py
│   │   └── weekly-metrics-calc.py
│   │
│   ├── requirements.txt
│   └── Dockerfile
│
├── 📂 database/                     # Database scripts and migrations
│   ├── 📂 migrations/
│   │   ├── V001__initial_schema.sql
│   │   ├── V002__voting_tables.sql
│   │   └── ...
│   │
│   ├── 📂 seeds/
│   │   ├── jurisdictions.sql
│   │   └── test-data.sql
│   │
│   ├── 📂 procedures/
│   │   ├── calculate_vote_results.sql
│   │   └── anonymize_votes.sql
│   │
│   └── schema-diagram.md
│
├── 📂 infrastructure/               # Infrastructure as Code
│   ├── 📂 terraform/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   ├── vpc.tf
│   │   ├── database.tf
│   │   ├── redis.tf
│   │   ├── ecs.tf
│   │   └── cdn.tf
│   │
│   ├── 📂 kubernetes/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── ingress.yaml
│   │   └── configmap.yaml
│   │
│   └── 📂 docker/
│       ├── docker-compose.yml
│       ├── docker-compose.dev.yml
│       └── docker-compose.prod.yml
│
├── 📂 docs/                         # Documentation
│   ├── 📂 api/
│   │   ├── openapi.yaml
│   │   ├── budget-api.md
│   │   ├── voting-api.md
│   │   └── auth-api.md
│   │
│   ├── 📂 guides/
│   │   ├── getting-started.md
│   │   ├── development-setup.md
│   │   ├── deployment-guide.md
│   │   ├── contributing.md
│   │   └── security-best-practices.md
│   │
│   ├── 📂 architecture/
│   │   ├── system-architecture.md
│   │   ├── data-architecture.md
│   │   ├── security-architecture.md
│   │   └── voting-mechanism.md
│   │
│   ├── 📂 user-guides/
│   │   ├── how-to-vote.md
│   │   ├── understanding-budgets.md
│   │   ├── creating-proposals.md
│   │   └── reading-performance-metrics.md
│   │
│   └── 📂 legal/
│       ├── privacy-policy.md
│       ├── terms-of-service.md
│       ├── data-retention.md
│       └── accessibility-statement.md
│
├── 📂 scripts/                      # Utility scripts
│   ├── setup-dev.sh
│   ├── deploy.sh
│   ├── backup-db.sh
│   ├── restore-db.sh
│   ├── generate-test-data.ts
│   └── run-migrations.sh
│
├── 📂 .github/                      # GitHub configuration
│   ├── 📂 workflows/
│   │   ├── ci.yml
│   │   ├── cd.yml
│   │   ├── security-scan.yml
│   │   └── dependency-update.yml
│   │
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── security_vulnerability.md
│   │
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CODEOWNERS
│
├── 📂 .speckit/                     # Spec-driven development (existing)
│   ├── constitution/
│   ├── templates/
│   └── examples/
│
├── .gitignore
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── LICENSE
├── README.md
├── CONTRIBUTING.md
├── SECURITY.md
├── CHANGELOG.md
└── package.json                     # Root package for monorepo scripts
```

---

## 📋 Module Responsibilities

### Backend Modules

| Module | Responsibility | Key Features |
|--------|---------------|--------------|
| **budget** | Budget data management | CRUD operations, hierarchy, versioning |
| **transactions** | Transaction tracking | Recording, searching, exporting |
| **voting** | Voting system | Proposals, votes, results, anonymization |
| **jurisdictions** | Geographic regions | Hierarchy, boundaries, population |
| **users** | User management | Registration, profiles, verification |
| **auth** | Authentication | Login, OAuth, 2FA, sessions |
| **analytics** | Performance metrics | Calculations, trends, efficiency |
| **sensitive** | Sensitive data | Classification, oversight, declassification |
| **notifications** | Notifications | Email, SMS, push, preferences |

### Frontend Pages

| Page | Purpose | URL |
|------|---------|-----|
| **Home** | Landing page, overview | `/` |
| **Budget Explorer** | Browse budgets | `/budget` |
| **Budget Details** | Specific budget details | `/budget/:id` |
| **Transactions** | Search transactions | `/transactions` |
| **Performance** | Metrics & analytics | `/performance` |
| **Proposals** | Browse proposals | `/proposals` |
| **Proposal Details** | View & vote | `/proposals/:id` |
| **Vote** | Cast vote | `/proposals/:id/vote` |
| **Results** | Vote results | `/proposals/:id/results` |
| **My Votes** | User's voting history | `/profile/votes` |
| **Region Selector** | Choose jurisdiction | `/region` |
| **Region Dashboard** | Regional overview | `/region/:id` |
| **Login** | Authentication | `/login` |
| **Register** | New account | `/register` |
| **Profile** | User profile | `/profile` |

---

## 🔧 Technology Choices by Directory

### `/backend`
- **Language**: TypeScript
- **Framework**: Express.js
- **ORM**: Raw SQL with `pg` driver (for transparency)
- **Validation**: Zod
- **Testing**: Jest + Supertest

### `/frontend`
- **Language**: TypeScript
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State**: Zustand + React Query
- **Charts**: Recharts + D3.js
- **Maps**: Leaflet
- **Testing**: Vitest + React Testing Library

### `/data-pipeline`
- **Language**: Python 3.11+
- **Orchestration**: Apache Airflow
- **Data Processing**: Pandas, NumPy
- **Validation**: Great Expectations
- **Testing**: pytest

### `/infrastructure`
- **IaC**: Terraform
- **Containers**: Docker + Docker Compose
- **Orchestration**: Kubernetes (optional, for scale)
- **CI/CD**: GitHub Actions

---

## 🚀 Getting Started

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/government-budget-platform.git
   cd government-budget-platform
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install

   # Install data pipeline dependencies
   cd ../data-pipeline
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up database**
   ```bash
   # Start PostgreSQL with Docker
   docker-compose up -d postgres

   # Run migrations
   npm run migrate

   # Seed test data
   npm run seed:dev
   ```

5. **Start development servers**
   ```bash
   # Terminal 1: Backend
   cd backend
   npm run dev

   # Terminal 2: Frontend
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - API Docs: http://localhost:3001/api-docs

---

## 📦 Monorepo vs Multi-repo

**Recommendation**: Start with **Monorepo**

**Pros**:
- Easier coordination between frontend and backend
- Shared types and constants
- Atomic changes across multiple components
- Simpler CI/CD setup
- Better for small to medium teams

**Tools**:
- Turborepo (recommended)
- Nx
- Lerna

**Structure** (if using Turborepo):
```
packages/
├── backend/
├── frontend/
├── shared/          # Shared types, constants, utils
├── mobile/
└── data-pipeline/
```

---

## 🔐 Security Considerations

### Sensitive Files (Add to `.gitignore`)

```gitignore
# Environment variables
.env
.env.local
.env.production

# Secrets
secrets/
*.key
*.pem
*.p12

# Database
*.db
*.sqlite
db-backups/

# Logs
logs/
*.log

# Build outputs
dist/
build/
.next/

# Dependencies
node_modules/
__pycache__/
*.pyc

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db
```

### Secret Management

- Use environment variables for configuration
- Never commit secrets to git
- Use secret management services (AWS Secrets Manager, HashiCorp Vault)
- Rotate credentials regularly
- Encrypt sensitive data at rest

---

## 📊 Scalability Considerations

As the platform grows:

1. **Backend**: Split into microservices
   ```
   services/
   ├── budget-service/
   ├── voting-service/
   ├── auth-service/
   ├── analytics-service/
   └── notification-service/
   ```

2. **Frontend**: Code splitting and lazy loading
3. **Database**: Read replicas, sharding by jurisdiction
4. **Caching**: Redis for frequently accessed data
5. **CDN**: Static assets and API responses
6. **Message Queue**: RabbitMQ or Kafka for async processing

---

## 🎯 Development Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/vote-delegation
   ```

2. **Write specification** (in `.speckit/`)
   - Feature spec
   - Technical plan
   - Task breakdown

3. **Implement feature**
   - Write tests first (TDD)
   - Implement backend
   - Implement frontend
   - Update documentation

4. **Test thoroughly**
   - Unit tests
   - Integration tests
   - E2E tests
   - Manual testing

5. **Create pull request**
   - Reference spec document
   - Include screenshots/videos
   - Request review

6. **Merge and deploy**
   - Automated deployment to staging
   - Manual approval for production

---

## 📖 Documentation Standards

Each module should include:

- **README.md**: Overview, setup, usage
- **API.md**: API endpoints, request/response examples
- **ARCHITECTURE.md**: Design decisions, patterns used
- **TESTING.md**: How to run tests, coverage requirements
- **CHANGELOG.md**: Version history

---

## ✅ Quality Standards

- **Code Coverage**: Minimum 80%
- **TypeScript**: Strict mode enabled
- **Linting**: ESLint + Prettier
- **Commits**: Conventional commits format
- **Documentation**: JSDoc for all public APIs
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Lighthouse score >90
- **Security**: OWASP top 10 compliance

---

*This structure is designed to scale from MVP to a global platform while maintaining clarity, security, and transparency.*
