const inert = require('inert');
const vision = require('vision');
const hapiAuthBasic = require('hapi-auth-basic');
const hapiAuthJwt = require('hapi-auth-jwt2');

let plugins = [];
plugins = plugins.concat([
  inert,
  vision,
  hapiAuthBasic,
  hapiAuthJwt
]);

module.exports = plugins;
