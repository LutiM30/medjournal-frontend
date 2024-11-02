# Use Node.js 18 Alpine as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
RUN apk add --no-cache libc6-compat
RUN corepack enable pnpm

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]