# RBE Platform

A comprehensive dashboard and management system for a Resource-Based Economy, inspired by Jacque Fresco's Venus Project. This platform provides tools to visualize, monitor, and manage global resources for the benefit of all humanity.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Available-green.svg)](https://the-venus-project-ai.github.io/100-Rules-Jacque-Fresco-Would-Suggest-We-Follow/)

## 🌐 Live Demo

**👉 [View Live Dashboard](https://the-venus-project-ai.github.io/100-Rules-Jacque-Fresco-Would-Suggest-We-Follow/)**

Experience the RBE Platform dashboard in action - no installation required!

## 🌍 Vision

This platform embodies Jacque Fresco's vision of a resource-based economy, where:
- Earth's resources are managed as the common heritage of all humanity
- Technology serves human needs rather than profit
- Artificial scarcity is eliminated through scientific resource allocation
- Global cooperation replaces competition and conflict

## ✨ Features

### 📊 Comprehensive Dashboard
- **Overview**: Key metrics and global cooperation indicators
- **Resources**: Real-time resource allocation and availability
- **Automation**: Progress tracking for labor automation
- **Social**: Quality of life indicators and well-being metrics
- **Environment**: Sustainability and circular economy progress
- **Principles**: Interactive checklist of Jacque Fresco's 100 principles

### 🎯 Key Capabilities
- Interactive charts and visualizations
- Regional and time-based filtering
- Real-time data simulation
- Responsive design for all devices
- Global cooperation metrics
- Circular economy tracking

## 🚀 Quick Start

### 🌐 Try It Live (Recommended)
**👉 [Launch Dashboard](https://the-venus-project-ai.github.io/100-Rules-Jacque-Fresco-Would-Suggest-We-Follow/)**

No installation needed - experience the full dashboard immediately!

### Prerequisites
- Node.js 20+
- Docker and Docker Compose
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/rbe-platform.git
   cd rbe-platform
   ```

2. **Run with Docker**
   ```bash
   docker compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - API: http://localhost:3000/api/resources

### Manual Setup

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📋 Development Methodology

### Spec-Driven Development

This project follows **Spec-Driven Development** - a rigorous, scientific approach where we think before we code. Every feature starts with comprehensive specifications that ensure quality, maintainability, and alignment with RBE principles.

**📚 [Read the Complete Spec Kit Documentation](.speckit/README.md)**

#### Quick Links
- **[RBE Platform Constitution](.speckit/constitution/RBE_PLATFORM_CONSTITUTION.md)** - Our governing principles
- **[Development Workflow](.speckit/WORKFLOW.md)** - Step-by-step process guide
- **[Feature Spec Template](.speckit/templates/FEATURE_SPEC_TEMPLATE.md)** - For new features
- **[Technical Plan Template](.speckit/templates/TECHNICAL_PLAN_TEMPLATE.md)** - For implementation
- **[Example Specification](.speckit/examples/FEATURE_SPEC_AI_RESOURCE_OPTIMIZATION.md)** - See it in action

#### Why Spec-Driven?
- ✅ **Better Design**: Think through edge cases and alternatives upfront
- ✅ **Clear Communication**: Everyone knows what's being built
- ✅ **Easier Onboarding**: New contributors read specs to understand features
- ✅ **Higher Quality**: Testing, security, and accessibility built in from day one
- ✅ **RBE Aligned**: Ensures every feature serves humanity's best interests

**New contributors:** Start by reading our [Workflow Guide](.speckit/WORKFLOW.md)!

---

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │◄──►│   (Express)     │◄──►│   (PostgreSQL)  │
│   Port: 3000    │    │   Port: 3001    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technology Stack
- **Frontend**: React + TypeScript + Vite + Tailwind CSS + Zustand
- **Backend**: Node.js + Express + TypeScript + Zod + JWT
- **Database**: PostgreSQL 16
- **Charts**: Recharts
- **Testing**: Vitest + React Testing Library
- **Deployment**: Docker + Nginx

## 🐳 Deployment

### GitHub Pages (Frontend Only)
The dashboard frontend can be deployed to GitHub Pages for free hosting:

1. **Automatic Deployment**: Push to `main` branch triggers automatic deployment
2. **Manual Deployment**: Run `npm run deploy` from the frontend directory
3. **Access**: `https://yourusername.github.io/100-Rules-Jacque-Fresco-Would-Suggest-We-Follow/`

See [GitHub Pages Deployment Guide](docs/github-pages-deployment.md) for detailed instructions.

### Docker (Full Stack)
```bash
docker compose up --build
```

### Coolify Deployment
1. Connect your Git repository
2. Use the root `Dockerfile`
3. Set environment variables in Coolify dashboard
4. Deploy!

## 📁 Project Structure

```
rbe-platform/
├── backend/                 # Express API server
│   ├── src/
│   │   └── index.ts        # Main server file
│   ├── package.json
│   └── Dockerfile
├── frontend/               # React application
│   ├── src/
│   │   ├── App.tsx         # Main dashboard component
│   │   └── main.tsx        # Entry point
│   ├── package.json
│   └── Dockerfile
├── docs/                   # Documentation
├── docker-compose.yml      # Multi-service setup
├── Dockerfile             # Single container for production
├── nginx.conf             # Nginx configuration
└── README.md
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Areas for Contribution
- Database integration and models
- User authentication system
- Real-time data updates
- Mobile responsiveness
- Internationalization
- Additional visualizations
- API documentation

## 📚 Documentation

### For Developers
- **[Developer Guide](DEVELOPER_GUIDE.md)** - Complete development manual
- **[Code Review & 30-Year Roadmap](CODE_REVIEW_AND_ROADMAP.md)** - Architecture review and long-term vision
- **[Implementation Summary](IMPLEMENTATION_SUMMARY.md)** - Phase 1 details
- **[Final Build Summary](FINAL_BUILD_SUMMARY.md)** - Complete feature list

### Spec-Driven Development
- **[Spec Kit Documentation](.speckit/README.md)** - Complete methodology guide
- **[RBE Platform Constitution](.speckit/constitution/RBE_PLATFORM_CONSTITUTION.md)** - Governing principles
- **[Development Workflow](.speckit/WORKFLOW.md)** - Step-by-step process
- **[Feature Spec Template](.speckit/templates/FEATURE_SPEC_TEMPLATE.md)** - For specifications
- **[Technical Plan Template](.speckit/templates/TECHNICAL_PLAN_TEMPLATE.md)** - For implementation plans
- **[Task Breakdown Template](.speckit/templates/TASK_BREAKDOWN_TEMPLATE.md)** - For task organization

### Deployment & Contributing
- [Architecture Overview](docs/architecture.md)
- [GitHub Pages Deployment](docs/github-pages-deployment.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)
- [Security Policy](SECURITY.md)

## 🌟 Philosophy

This platform is built on the principles of:
- **Cooperation over Competition**: Working together for mutual benefit
- **Science over Opinion**: Evidence-based decision making
- **Abundance over Scarcity**: Using technology to provide for all
- **Sustainability over Exploitation**: Protecting our planet
- **Education over Indoctrination**: Critical thinking and learning

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Jacque Fresco** - For his visionary work on The Venus Project
- **The Venus Project Community** - For continuing this important work
- **Open Source Contributors** - For making this platform possible

## 🔗 Related Resources

- [The Venus Project](https://thevenusproject.com)
- [Resource-Based Economy](https://en.wikipedia.org/wiki/Resource-based_economy)
- [Jacque Fresco's Books](https://thevenusproject.com/books/)

---

*"The future is not something that happens to us, but something we create."* - Jacque Fresco

*Working towards a sustainable, equitable civilization free from war, poverty, and unnecessary suffering.*