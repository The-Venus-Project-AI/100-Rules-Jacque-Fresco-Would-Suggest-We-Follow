# Contributing to RBE Platform

Thank you for your interest in contributing to the Resource-Based Economy Platform! This project is inspired by Jacque Fresco's Venus Project and aims to create tools for managing a resource-based economy.

## Getting Started

### Prerequisites
- Node.js 20+
- Docker and Docker Compose
- Git

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/rbe-platform.git
   cd rbe-platform
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend && npm install
   
   # Frontend
   cd ../frontend && npm install
   ```

3. **Run locally with Docker**
   ```bash
   docker compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - API: http://localhost:3000/api/resources

## Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing patterns and conventions
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### Frontend Development
- Use React functional components with hooks
- Follow the existing component structure
- Use Tailwind CSS for styling
- Add responsive design considerations

### Backend Development
- Use Express.js patterns
- Add proper error handling
- Include input validation
- Write tests for new endpoints

## Contributing Process

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test your changes**
   ```bash
   # Run tests
   npm test
   
   # Build and test Docker container
   docker build -t rbe-platform .
   ```
5. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

## Areas for Contribution

### High Priority
- [ ] Database integration and models
- [ ] User authentication system
- [ ] Real-time data updates
- [ ] Mobile responsiveness improvements
- [ ] Internationalization (i18n)

### Medium Priority
- [ ] Additional chart types and visualizations
- [ ] Data export functionality
- [ ] API documentation
- [ ] Performance optimizations
- [ ] Accessibility improvements

### Low Priority
- [ ] Theme customization
- [ ] Plugin system
- [ ] Advanced analytics
- [ ] Integration with external APIs

## Code of Conduct

This project follows the Venus Project principles of cooperation and mutual benefit. Please:

- Be respectful and constructive in discussions
- Focus on solutions that benefit all humanity
- Consider the environmental and social impact of your contributions
- Help others learn and grow

## Questions?

- Open an issue for bugs or feature requests
- Start a discussion for questions or ideas
- Join our community discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
