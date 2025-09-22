FROM node:20-bookworm-slim

# Create non-root user
RUN useradd -m botuser

WORKDIR /app

# Copy source files
COPY package*.json ./
RUN npm ci --omit=dev

COPY src/ ./src/

# Lock down filesystem
RUN chmod -R a-w /app
USER botuser

CMD ["node", "src/index.js"]