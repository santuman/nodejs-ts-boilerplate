# Build stage
FROM node:14.18.1-alpine3.13 AS build
RUN npm install -g typescript
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN rm -rf node_modules
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage
FROM node:14.18.1-alpine3.13 AS runtime
RUN npm install -g pm2
USER node
RUN mkdir -p /home/node/code
WORKDIR /home/node/code
RUN rm -rf *

COPY --from=build --chown=node:node /app .

CMD ["pm2-runtime","start","./build/src/server.js","-i","max"]
