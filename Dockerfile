# Step 1: Build React app
FROM node:20 AS builder
WORKDIR /app

# Accept build-time args
ARG REACT_APP_GRAPHQL_URL
ARG REACT_APP_BACKEND_URL
ARG REACT_APP_GCLOUD_IMAGES_BASE_URL

# Write them to .env.production
RUN echo "REACT_APP_GRAPHQL_URL=$REACT_APP_GRAPHQL_URL" > .env.production && \
    echo "REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL" >> .env.production && \
    echo "REACT_APP_GCLOUD_IMAGES_BASE_URL=$REACT_APP_GCLOUD_IMAGES_BASE_URL" >> .env.production

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve the static site
FROM node:20-slim
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/build ./build
EXPOSE 8080
CMD ["serve", "-s", "build", "-l", "8080"]
