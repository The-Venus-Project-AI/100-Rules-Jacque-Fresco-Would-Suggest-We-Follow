# RBE Platform

A comprehensive dashboard and management system for a Resource-Based Economy, inspired by Jacque Fresco's Venus Project. This platform provides tools to visualize, monitor, and manage global resources for the benefit of all humanity.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

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

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │◄──►│   (Express)     │◄──►│   (PostgreSQL)  │
│   Port: 3000    │    │   Port: 3001    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technology Stack
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL
- **Charts**: Recharts
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

- [Architecture Overview](docs/architecture.md)
- [GitHub Pages Deployment](docs/github-pages-deployment.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

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