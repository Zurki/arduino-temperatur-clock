FROM node:21-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3001

RUN npm build

CMD["npm", "start"]
