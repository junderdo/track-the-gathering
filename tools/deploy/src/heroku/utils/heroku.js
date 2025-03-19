function getHerokuAppProperties(nxProjectName) {
  // Environment variable key format: HEROKU_APP_{NX_PROJECT_NAME}
  // Environment variable value format: APP_NAME|PROCESS_TYPE
  const projectName = nxProjectName.toUpperCase().replace(/-/g, '_');
  const formattedVarName = `HEROKU_APP_${projectName}`;
  console.log('Heroku app env var key: ', formattedVarName);
  const herokuAppProperties= process.env[formattedVarName];
  console.log('Heroku app and process type: ', herokuAppProperties);

  if (!herokuAppProperties || !herokuAppProperties.includes('|')) {
    console.log('Missing deployment properties for project: ', nxProjectName);
    return [];
  }

  const [HEROKU_APP_NAME, HEROKU_PROCESS_TYPE] = herokuAppProperties.split('|');
  console.log('Heroku app name: ', HEROKU_APP_NAME);
  console.log('Process type: ', HEROKU_PROCESS_TYPE);
  return [HEROKU_APP_NAME, HEROKU_PROCESS_TYPE];
}

function getHerokuContainerRegistryUrl(herokuAppName, herokuDynoProcess) {
  return `registry.heroku.com/${herokuAppName}/${herokuDynoProcess}`;
}

module.exports = { getHerokuAppProperties, getHerokuContainerRegistryUrl };
