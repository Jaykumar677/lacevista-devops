# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Expose your app's port
EXPOSE 3000

# Start the app using app.js
CMD ["node", "app.js"]
