# Base image
FROM node:20-alpine AS development

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock* ./

# Install yarn if it's not already installed
RUN apk add --no-cache yarn

# Install dependencies
RUN yarn install

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM node:20-alpine

# Set NODE_ENV to production
ENV NODE_ENV=production

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock* ./

# Install yarn if it's not already installed
RUN apk add --no-cache yarn

# Install only production dependencies
RUN yarn install --production

# Copy built application from development stage
COPY --from=development /usr/src/app/dist ./dist

# Expose port
EXPOSE 3002

# Start the application
CMD ["node", "dist/main"]
