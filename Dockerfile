FROM node:20-bookworm-slim

# Create non-root user
RUN useradd -m botuser

WORKDIR /app

# Copy source files
COPY package*.json ./
RUN npm ci --omit=dev

COPY src/ ./src/

# Set proper permissions and switch user
RUN chown -R botuser:botuser /app && \
    chmod -R 755 /app && \
    find /app -type f -exec chmod 644 {} \;
USER botuser

CMD ["node", "src/index.js"]