const glob = require('glob');
const config = require('config');
const path = require('path');
const logger = require('./server/utils/logger');
const _ = require('lodash');

const routes = [
  {
    method: 'GET',
    path: '/ping',
    handler(request, h) {
      return 'pong';
    },
    config: {
      auth: false,
      tags: ['api'],
    },
  },
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        listing: true,
      },
    },
    config: { auth: false}
  },
  {
    method: 'GET',
    path: '/',
    handler(request, h) {
      return h.file('index.html');
    },
    config: { auth: false }
  },
  {
    method: 'GET',
    path: '/admin',
    handler(request, h) {
      return h.file('admin.html');
    },
    config: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/about',
    handler(request, h) {
      return h.file('about.html');
    },
    config: {auth: false}
  }
];

glob.sync('./server/**/*Routes.js').forEach((file) => {
  routes.push(require(path.resolve(file))); // removing require will cause this to break
});

module.exports = _.flattenDeep(routes);
