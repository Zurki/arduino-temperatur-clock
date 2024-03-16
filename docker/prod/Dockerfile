FROM node:18-alpine as DEV_BUILD
WORKDIR /app

COPY ../../. .  

RUN npm install
RUN npm run build

FROM node:18-alpine as PROD
WORKDIR /app

COPY --from=DEV_BUILD /app/package.json .
COPY --from=DEV_BUILD /app/dist ./dist 

RUN npm install nodemon

ENV PORT $PORT
EXPOSE $PORT

CMD [ "npm", "run", "start" ]  # Start the application
