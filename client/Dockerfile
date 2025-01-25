# Use Node.js 20 Alpine as the base image to reduce size
FROM node:20-alpine AS build

# Set the working directory to /app
WORKDIR /app

# Install dependencies, ensuring that only necessary production dependencies are installed
COPY package*.json ./

# Install production dependencies only
RUN npm Install

# Install Peer Dependencies
RUN npm Install 

# Expose the Vite development server port
EXPOSE 5173

# Copy the rest of the application code to the working directory
COPY . .

# Remove development dependencies and clean cache (optional, depends on your setup)
RUN npm prune --production && \
    rm -rf /tmp/* /var/cache/apk/*

# Run the Vite development server, ensuring it binds to 0.0.0.0 for external access
CMD ["npm", "run", "dev"]
