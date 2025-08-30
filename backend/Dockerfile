FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx nest build
RUN npm prune --production

EXPOSE 5000

CMD ["node", "dist/main.js"]