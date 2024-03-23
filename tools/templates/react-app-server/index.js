//Install express server
const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// App served based on write-up: https://medium.com/@prashantns9/angular-expressjs-404-error-after-page-refresh-on-production-server-12042e789eb8
// Serve only the static files from the dist directory
app.get('*.*', express.static(`${__dirname}/../`));
app.all('*', function (req, res) {
  res.status(200).sendFile('/', { root: `${__dirname}/../` });
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
