# Use the official Node.js image as a base
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all necessary application files and directories
COPY app.js ./
COPY .env ./
COPY models ./models
COPY routes ./routes
COPY validations ./validations
COPY verifyToken.js ./
COPY test.js ./

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
