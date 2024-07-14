# Use the official Node.js image as a base
FROM node:lts

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN yarn run build

# Expose port 4000
EXPOSE 4000

# Start the application
CMD ["npm", "run", "dev"]