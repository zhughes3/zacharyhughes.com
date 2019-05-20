const devHandler = require('./devHandler');

const routes = [
  {
    method: 'POST',
    path: '/dev',
    handler: devHandler.createDev,
    options: {
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data',
      },
    },
    config: {
      auth: 'simple',
    }
  },
  {
    method: 'GET',
    path: '/dev',
    handler: devHandler.readDevs
  },
  {
    method: 'GET',
    path: '/dev/{slug}',
    handler: devHandler.readDev,
  },
  {
    method: 'GET',
    path: '/dev/all',
    handler: devHandler.renderDevs,
  },
];

module.exports = routes;
