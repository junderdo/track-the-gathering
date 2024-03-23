function getHerokuAppDetails(nxProjectName) {
  //expected format -> HEROKU_APP_NAME|HEROKU_DYNO_PROCESS
  const formattedEnvName = nxProjectName.toUpperCase().replace(/-/g, '_');
  const herokuAppDetails = process.env[formattedEnvName];
  console.log('HEROKU APP DETAILS: ', herokuAppDetails);

  if (!herokuAppDetails || !herokuAppDetails.includes('|')) {
    console.log('NO DEPLOYMENT CONFIGURATION FOR APP: ', nxProjectName);
    return [];
  }

  const [HEROKU_APP_NAME, HEROKU_DYNO_PROCESS] = herokuAppDetails.split('|');
  console.log('HEROKU APP NAME: ', HEROKU_APP_NAME);
  console.log('HEROKU APP PROCESS NAME: ', HEROKU_DYNO_PROCESS);
  return [HEROKU_APP_NAME, HEROKU_DYNO_PROCESS];
}

function getHerokuContainerRegistryUrl(herokuAppName, herokuDynoProcess) {
  return `registry.heroku.com/${herokuAppName}/${herokuDynoProcess}`;
}

module.exports = { getHerokuAppDetails, getHerokuContainerRegistryUrl };
