FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --include=dev

COPY . .

RUN node node_modules/typescript/bin/tsc

RUN npm prune --production

EXPOSE 3000

CMD ["node", "dist/server.js"]