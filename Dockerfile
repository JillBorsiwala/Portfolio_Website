FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY server.js ./
COPY public ./public
COPY views ./views

EXPOSE 3002

CMD ["node", "server.js"]
