# Linux x64
FROM node:12.14.1-alpine

LABEL org.opencontainers.image.title="Me Loger sur Bordeaux - Backend" \
      org.opencontainers.image.description="Backend part of the project Me Loger sur Bordeaux" \
      org.opencontainers.image.authors="@flowcad"

# Create directory in container image for app code
RUN mkdir -p /usr/src/app

# Copy app code (.) to /usr/src/app in container image
COPY . /usr/src/app

# Set working directory context
WORKDIR /usr/src/app

# Install dependencies from packages.json
RUN npm install

# Command for container to execute
ENTRYPOINT [ "node", "server.js" ]