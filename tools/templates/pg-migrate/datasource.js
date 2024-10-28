//NOTE: this file is copied to the /dist/apps/*/migrate folder and executed via the app's NX commands to run the migration
module.exports = {
  DataSource: require('./main.js').getDs(),
};
