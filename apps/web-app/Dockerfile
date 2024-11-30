FROM node:lts-bookworm-slim 
ARG APP_NAME=web-app

WORKDIR /app
COPY ./dist/apps/$APP_NAME .
WORKDIR /app/server
ENV NODE_ENV production
ENV PORT=3333
EXPOSE ${PORT}
RUN npm install --omit=dev
CMD npm start