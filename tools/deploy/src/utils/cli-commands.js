const COMMANDS = {
  PRE_DEPLOY: (nxProjectName) =>
    `npx nx pre-deploy --project=${nxProjectName} --verbose`,
  DOCKER_TAG: (nxProjectName, containerRegistryUrl) =>
    `docker tag ${nxProjectName} ${containerRegistryUrl}`,
  DOCKER_PUSH: (containerRegistryUrl) => `docker push ${containerRegistryUrl}`,
  HEROKU_CONTAINER_RELEASE: (appName, dynoProcess) =>
    `heroku container:release ${dynoProcess} --app ${appName}`,
};

module.exports = { COMMANDS };
