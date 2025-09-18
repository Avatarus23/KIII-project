FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./src ./src
RUN npm run build
# Serve build folder
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]


FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
ENV NODE_ENV=production
EXPOSE 4000
CMD ["node","index.js"]