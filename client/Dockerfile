# Use Node.js 20 as the base image
FROM node:20

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json /app

# Install dependencies
RUN npm install

# Expose the Vite development server port
EXPOSE 5173

# Copy the rest of the application code to the working directory
COPY . .

# Run the Vite development server, ensuring it binds to 0.0.0.0 for external access
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
