# Based on write-up: https://blog.nrwl.io/nx-and-node-microservices-b6df3cd1bad6

# Node JS image research: https://snyk.io/blog/choosing-the-best-node-js-docker-image/
FROM node:lts-bookworm-slim 

# replace with app name
ARG APP_NAME=REPLACE_WITH_APP_NAME

WORKDIR /app
COPY ./dist/apps/$APP_NAME .
ENV NODE_ENV production
ENV PORT=3333
EXPOSE ${PORT}
RUN npm install --omit=dev
# dependencies that nestjs needs
RUN npm install reflect-metadata tslib rxjs @nestjs/platform-express axios

# uncomment the following lines if PG migration is required
# COPY ./dist/apps/$APP_NAME/migrate ./migrate
# # Migration can be run on deployed application by executing `npm run migrate`
# RUN npm pkg set 'scripts.migrate'='npx typeorm -o -d ./migrate/datasource.js migration:generate ./migrate/migrations/Migration && npx typeorm -d ./migrate/datasource.js migration:run'

CMD node ./main.js