# Stage 1: Build
FROM node:20-bookworm-slim AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-bookworm-slim

# Create non-root user
RUN useradd -m botuser

WORKDIR /app

# Copy built app and install only production dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Optional: Harden filesystem
RUN chmod -R a-w /app

# Switch to non-root user
USER botuser

# Start the bot
CMD ["node", "dist/index.js"]