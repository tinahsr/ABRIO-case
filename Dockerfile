# =========================================
# Stage 1: Build the Angular and NestJS Application
# =========================================
ARG NODE_VERSION=22.14.0-alpine
ARG NGINX_VERSION=alpine3.21

# Use a lightweight Node.js image for building (customizable via ARG)
FROM node:${NODE_VERSION} AS builder

# Set the working directory inside the container
WORKDIR /app/client

# Copy package-related files first to leverage Docker's caching mechanism
COPY client/package.json .
COPY client/package-lock.json .

# Install project dependencies using npm ci (ensures a clean, reproducible install)
RUN --mount=type=cache,target=/root/.npm npm ci

RUN npm install -g @angular/cli

# Copy the rest of the application source code into the container
COPY ./client/ .

# Build the Angular application
RUN npm run build

WORKDIR /app/server

COPY server/package.json .
COPY server/package-lock.json .

RUN --mount=type=cache,target=/root/.npm npm ci

COPY ./server/ .

RUN npm run build

# =========================================
# Stage 2: Start the NestJS Application
# =========================================

EXPOSE 8080

CMD ["node", "dist/src/main.js"]