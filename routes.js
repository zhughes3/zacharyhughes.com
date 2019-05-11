const glob = require('glob');
const path = require('path');
const _ = require('lodash');
const config = require('config');

const routes = [
  {
    method: 'GET',
    path: '/ping',
    handler(request, h) {
      return 'pong';
    },
    config: {
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
  },
  {
    method: 'GET',
    path: '/',
    handler(request, h) {
      return h.file('index.html');
    },
  },
  {
    method: 'GET',
    path: '/admin',
    handler(request, h) {
      return h.file('admin.html');
    },
    config: {
      auth: 'simple',
    },
  },
  {
    method: 'GET',
    path: '/about',
    handler(request, h) {
      return h.file('about.html');
    },
  },
];

glob.sync('./server/**/*Routes.js').forEach((file) => {
  routes.push(require(path.resolve(file)));
});

module.exports = _.flattenDeep(routes);
