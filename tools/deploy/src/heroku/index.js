const { execSync } = require('child_process');
const { COMMANDS } = require('../utils/cli-commands');
const {
  getHerokuAppDetails,
  getHerokuContainerRegistryUrl,
} = require('../utils/heroku');
const deployableApps = require('./deployable-apps.constants');

const execute = () => {
  console.log('process.env: ', process.env);

  const projectNameToDeploy = process.env.PROJECT_NAME;
  if (!projectNameToDeploy) {
    console.log('***** No project name specified -- deploying all apps *****');
    // TODO run nx affected to only deploy apps that need to be deployed
    deployableApps.forEach((nxProjectName) => {
      deployNxProject(nxProjectName);
    });
  } else {
    console.log(`***** Deploying app: ${projectNameToDeploy} *****`);
    deployNxProject(projectNameToDeploy);
  }
};

function deployNxProject(nxProjectName) {
  //get Heroku app details from ENV
  const [herokuAppName, herokuDynoProcess] = getHerokuAppDetails(nxProjectName);

  //build apps and Docker containers
  console.log('Running pre-deploy target for ', nxProjectName);
  execSync(COMMANDS.PRE_DEPLOY(nxProjectName));

  const containerRegistryUrl = getHerokuContainerRegistryUrl(
    herokuAppName,
    herokuDynoProcess
  );

  //tag container
  console.log('Tagging container in Heroku Container Registry.');
  execSync(COMMANDS.DOCKER_TAG(nxProjectName, containerRegistryUrl));

  //push container to Heroku registry
  console.log('Pushing container to Heroku Container Registry.');
  execSync(COMMANDS.DOCKER_PUSH(containerRegistryUrl));

  //release container on Heroku
  console.log('Releasing container.');
  const herokuContainerReleaseOutput = execSync(
    COMMANDS.HEROKU_CONTAINER_RELEASE(herokuAppName, herokuDynoProcess)
  );
  console.log(herokuContainerReleaseOutput.toString('utf-8'));
}

//execute the deploy script
try {
  execute();
} catch (err) {
  console.error('ERROR RUNNING DEPLOY SCRIPT: ', err);
  console.error(err.toString('utf-8'));
  console.error(err.output.toString('utf-8'));
  throw err;
}
