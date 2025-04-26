# syntax=docker/dockerfile:1
ARG NODE_VERSION=22.13.1

# Build stage
FROM node:${NODE_VERSION}-slim AS builder
WORKDIR /app

# Install dependencies (npm ci is deterministic)
COPY --link package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Copy source files
COPY --link . .

# Build the app
RUN npm run build

# Remove dev dependencies for production
RUN --mount=type=cache,target=/root/.npm \
    npm ci --production

# Production stage
FROM node:${NODE_VERSION}-slim AS final
WORKDIR /app

# Create non-root user
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

# Copy built app and production deps from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"

USER appuser

EXPOSE 3000

CMD ["npm", "start"]
