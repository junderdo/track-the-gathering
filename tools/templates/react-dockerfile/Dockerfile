# Node JS image research: https://snyk.io/blog/choosing-the-best-node-js-docker-image/
FROM node:lts-bookworm-slim 

# replace with app name
ARG APP_NAME=REPLACE_WITH_APP_NAME

WORKDIR /app
COPY ./dist/apps/$APP_NAME .
WORKDIR /app/server
RUN ls
ENV NODE_ENV production
ENV PORT=3333
EXPOSE ${PORT}
RUN npm install --omit=dev
CMD npm start