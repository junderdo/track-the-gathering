const { execSync } = require('child_process');
const { COMMANDS } = require('./utils/cli-commands');
const {
  getHerokuAppDetails,
  getHerokuContainerRegistryUrl,
} = require('./utils/heroku');

const deployableApps = ['web-app', 'api'];

const execute = () => {
  console.log('Deploying all apps');
  deployableApps.forEach((nxProjectName) => {
    deployNxProject(nxProjectName);
  });
};

function deployNxProject(nxProjectName) {
  const [herokuAppName, herokuDynoProcess] = getHerokuAppDetails(nxProjectName);

  console.log('Running pre-deploy target for ', nxProjectName);
  execSync(COMMANDS.PRE_DEPLOY(nxProjectName));

  const containerRegistryUrl = getHerokuContainerRegistryUrl(
    herokuAppName,
    herokuDynoProcess
  );

  console.log('Tagging container in Heroku Container Registry.');
  execSync(COMMANDS.DOCKER_TAG(nxProjectName, containerRegistryUrl));

  console.log('Pushing container to Heroku Container Registry.');
  execSync(COMMANDS.DOCKER_PUSH(containerRegistryUrl));

  console.log('Creating release version with container');
  const herokuContainerReleaseOutput = execSync(
    COMMANDS.HEROKU_CONTAINER_RELEASE(herokuAppName, herokuDynoProcess)
  );
  console.log(herokuContainerReleaseOutput.toString('utf-8'));
}

try {
  execute();
} catch (err) {
  console.error('ERROR: ', err);
  console.error(err.toString('utf-8'));
  console.error(err.output.toString('utf-8'));
  throw err;
}
