# syntax=docker/dockerfile:1
ARG NODE_VERSION=22.13.1

# --- Build Stage ---
FROM node:${NODE_VERSION}-slim AS builder
WORKDIR /app

# Install dependencies (only package.json and lockfile for cache efficiency)
COPY --link package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the rest of the application source code
COPY --link . .

# Build TypeScript (assumes tsc is in package.json scripts or devDependencies)
RUN --mount=type=cache,target=/root/.npm \
    npm run build

# Remove dev dependencies and install only production dependencies
RUN --mount=type=cache,target=/root/.npm \
    rm -rf node_modules && npm ci --production

# --- Production Stage ---
FROM node:${NODE_VERSION}-slim AS final
WORKDIR /app

# Security: create non-root user
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

# Copy built app and production node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"
USER appuser

EXPOSE 3001
CMD ["node", "dist/index.js"]
