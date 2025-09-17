# Use a lightweight Node.js image
FROM mirror.gcr.io/library/node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for caching layers)
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy all backend code
COPY . .

# Expose backend port
EXPOSE 5000

# Start the backend
CMD ["node", "index.js"]
