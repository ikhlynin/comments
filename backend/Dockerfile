FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npx nest build
RUN npm prune --production

EXPOSE $PORT

CMD ["node", "dist/main.js"]