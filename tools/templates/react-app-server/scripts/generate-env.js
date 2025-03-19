let outputPath = 'env.js';
let doSetOutputPath = false;
let inputPath = undefined;
let doSetInputPath = false;

process.argv.forEach(function (val, index, array) {
  if (doSetInputPath) (inputPath = val) & (doSetInputPath = false);
  if (val === '-i') doSetInputPath = true;
  if (doSetOutputPath) (outputPath = val) & (doSetOutputPath = false);
  if (val === '-o') doSetOutputPath = true;
});

if (process.env.NODE_ENV !== 'production') {
  if (inputPath) {
    require('dotenv').config({ path: inputPath });
  } else {
    require('dotenv');
  }
}

/**
 * To add more env variables see src/app/env.service.ts & src/env.js
 */
const apiUrlBase = process.env.API_URL;
const auth0Config = {
  url: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  apiAudience: process.env.AUTH0_API_AUDIENCE,
};
const production = process.env.NODE_ENV === 'production';
const enableDebug = process.env.DEBUG === 'true';
const templateBody = `
  (function (window) {
    window.__env = window.__env || {};
    window.__env.production = ${production};
    window.__env.enableDebug = ${enableDebug};
    window.__env.apiRestUrlBase = "${apiUrlBase}";
    window.__env.auth0Domain = "${auth0Config.url}";
    window.__env.auth0ClientId = "${auth0Config.clientId}";
    window.__env.auth0ApiAudience = "${auth0Config.apiAudience}";
  }(this));
`;

const fs = require('fs');
fs.writeFile(outputPath, templateBody, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`env.js successfully generated: ${outputPath}`);
  }
});
