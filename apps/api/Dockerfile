FROM node:lts-bookworm-slim 
ARG APP_NAME=api

# setup app workspace
WORKDIR /app
COPY ./dist/apps/$APP_NAME .

# setup app environment
ENV NODE_ENV production
ENV PORT=3333
EXPOSE ${PORT}

# install app dependencies
RUN npm install --omit=dev

# install nest dependencies
RUN npm install reflect-metadata tslib rxjs @nestjs/platform-express axios @nestjs/swagger

# add db migration and seeding scripts
COPY ./dist/apps/$APP_NAME/migrate ./migrate
# COPY ./dist/apps/$APP_NAME/migrate/seed ./migrate/seed
RUN npm pkg set 'scripts.migrate'='npx typeorm -o -d ./migrate/datasource.js migration:generate ./migrate/migrations/Migration && npx typeorm -d ./migrate/datasource.js migration:run'
# RUN npm pkg set 'scripts.seed'='node ./migrate/seed/main.js'

# run the app on startup
CMD node ./main.js