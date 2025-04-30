# Base image
FROM node:20-alpine

# Set NODE_ENV to development
ENV NODE_ENV=development

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock* ./

# Install yarn if it's not already installed
RUN apk add --no-cache yarn

# Install dependencies only if node_modules doesn't exist
RUN if [ ! -d "node_modules" ]; then yarn install; fi

# Copy source code
COPY . .

# Expose port
EXPOSE 3001

# Start the application in development mode
CMD ["yarn", "start:dev"]
