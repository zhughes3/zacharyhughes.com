const inert = require('inert');
const vision = require('vision');
const hapiAuthBasic = require('hapi-auth-basic');

let plugins = [];
plugins = plugins.concat([
  inert,
  vision,
  hapiAuthBasic,
]);

module.exports = plugins;
