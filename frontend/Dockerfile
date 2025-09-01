FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=backend-production-7295.up.railway.app

FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/build ./build
EXPOSE ${PORT:-5000}
CMD ["sh", "-c", "serve -s build -l ${PORT:-5000}"]
