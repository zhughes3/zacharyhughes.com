const musicHandler = require('./musicHandler');

const routes = [
  {
    method: 'GET',
    path: '/music',
    handler: musicHandler.readMusics,
  },
  {
    method: 'POST',
    path: '/music',
    handler: musicHandler.createMusic,
  },
  {
    method: 'GET',
    path: '/music/{slug}',
    handler: musicHandler.readMusic,
  },
  {
    method: 'GET',
    path: '/music/all',
    handler: musicHandler.renderMusics,
  },
];

module.exports = routes;
