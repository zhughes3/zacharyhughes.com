const devHandler = require('./devHandler');

const routes = [
  {
    method: 'POST',
    path: '/dev',
    handler: devHandler.createDev,
    config: {auth: 'jwt'}
  },
  {
    method: 'GET',
    path: '/dev',
    handler: devHandler.readDevs,
    config: {auth: false}
  },
  {
    method: 'GET',
    path: '/dev/{slug}',
    handler: devHandler.readDev,
    config: {auth: false}
  },
  {
    method: 'GET',
    path: '/dev/all',
    handler: devHandler.renderDevs,
    config: {auth: false}
  },
];

module.exports = routes;
