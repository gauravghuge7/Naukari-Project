# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Install Python, make, and g++ for native dependencies
RUN apk add --no-cache python3 make g++

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies, including development dependencies
RUN npm install

# Rebuild native modules like bcrypt
RUN npm rebuild bcrypt --build-from-source

# Copy the rest of the application files
COPY . .

# Expose port 5000 to the outside world
EXPOSE 5000

# Command to run the application
CMD ["npm", "run", "dev"]
      