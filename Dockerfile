# Step 1: Build the React app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . ./

# Build the React app
RUN npm run build

# Step 2: Serve the React app using nginx
FROM nginx:alpine

# Copy build from the previous stage to nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]

