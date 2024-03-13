FROM node:18-alpine as DEV_BUILD 
WORKDIR /app


COPY ../../package.json .
RUN npm install

COPY ../../. .

ENV PORT $PORT
EXPOSE $PORT
CMD [ "npm", "run", "dev"]
