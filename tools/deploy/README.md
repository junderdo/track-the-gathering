# Deploy to Heroku

_Deploy Docker containers to Heroku Container Registry and trigger a release_

## Pre-requisites

### NX application configuration

- Every app that will be built & deployed requires a Dockerfile

```
# Based on write-up: https://blog.nrwl.io/nx-and-node-microservices-b6df3cd1bad6

# Node JS image research: https://snyk.io/blog/choosing-the-best-node-js-docker-image/
FROM node:lts-bullseye-slim
WORKDIR /app
COPY ./dist/apps/{REPLACE_WITH_APP_NAME} .
ENV PORT=3333
EXPOSE ${PORT}
RUN npm install --omit=dev
# dependencies that nestjs needs
RUN npm install reflect-metadata tslib rxjs @nestjs/platform-express
CMD node ./main.js
```

- Every app that will be built & deployed via Dockerfile requires its `project.json` to generate a package.json via the `build` target:

```
{
   ...
   "targets": {
      ...
      "build": {
         "options": {
            ...
            "generatePackageJson": true,
            ...
         }
      }
   }
   ...
}
```

### Bitbucket deployment environment

- Heroku token needs to be generated via Heroku CLI (`heroku authorizations:create`) and stored as a secured Repository Variable in Bitbucket: `HEROKU_API_KEY`
- Deployment variables (defined for both Staging & Production) are based on the NX application name & Heroku application configuration
  - Example: `APP_NAME_1: heroku-app-name|web` in Bitbucket Deployment Variables means deploy NX app `app-name-1` to the Heroku application named `heroku-app-name` on a `web` dyno process

### Process

On commit to branches defined in `/bitbucket-pipelines.yml`:

1. The code format is validated via `format:check`
2. The following NX commands are also run on affected apps:
   - `lint`
   - `test`
   - `build`
3. The Heroku CLI is downloaded to container running Bitbucket pipeline
4. `heroku container:login`
   - uses the Repository Variable defined as `HEROKU_API_KEY`
5. The `tools/deploy` package is built and executed (see below)

### Deploy script

Source code: `tools/deploy/src/index.ts`

- Uses `BITBUCKET_DEPLOYMENT_ENVIRONMENT` to determine which branch to use as base for comparisons (e.g. 'production' would use 'origin/main' as the base branch)
- The Heroku application details (i.e. Heroku application name and dyno process) are inferred from the Deployment Variable for the deployment environment & application name

The following then occurs for each of the affected apps:

- NX target `pre-deploy` is executed (to build Docker container)
- Docker tag is run with the Heroku Container Registry URL (specific to Heroku app details)
- Docker push is run with the Heroku Container Registry URL (specific to Heroku app details)
- The app container is released via the Heroku CLI (specific to Heroku app details)
