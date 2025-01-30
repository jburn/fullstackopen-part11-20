ARG NODE_VERSION=20.16.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

WORKDIR /app

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

COPY package-lock.json package.json ./

RUN npm ci

COPY backend ./backend

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "backend/index.js"]