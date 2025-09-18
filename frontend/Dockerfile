#official node:18-alpine image
FROM node:18-alpine
#label
LABEL maintainer="bobi.galic@yahoo.com"
#set workdir
WORKDIR /app
# copy requirements and install Node.js dependencies
COPY package*.json ./
RUN npm install
#RUN npm install --legacy-peer-deps
#copy application code at the same location
COPY . .
#expose port
EXPOSE 3000
#command to run the app
CMD ["npm", "start"]
