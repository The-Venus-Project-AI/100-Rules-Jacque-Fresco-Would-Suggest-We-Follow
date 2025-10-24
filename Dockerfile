# 2025-10-24 rbe-platform single container for Coolify deployment
FROM node:20-alpine AS backend-builder

WORKDIR /app/backend
COPY backend/package.json ./
RUN npm install --production
COPY backend .
RUN npm run build

FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend
COPY frontend/package.json ./
RUN npm install
COPY frontend .
RUN npm run build

FROM node:20-alpine AS runtime

WORKDIR /app

# Install backend dependencies
COPY backend/package.json ./
RUN npm install --production

# Copy built backend
COPY --from=backend-builder /app/backend/dist ./dist
COPY --from=backend-builder /app/backend/package.json ./

# Install nginx for frontend
RUN apk add --no-cache nginx

# Copy built frontend
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Create startup script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'nginx &' >> /app/start.sh && \
    echo 'node dist/index.js' >> /app/start.sh && \
    chmod +x /app/start.sh

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:3000/ || exit 1

CMD ["/app/start.sh"]
