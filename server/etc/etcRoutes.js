const etcHandler = require('./etcHandler');

const routes = [
  {
    method: 'GET',
    path: '/etc',
    handler: etcHandler.readEtcs,
  },
  {
    method: 'POST',
    path: '/etc',
    handler: etcHandler.createEtc,
    config: {
      auth: 'simple',
    }
  },
  {
    method: 'GET',
    path: '/etc/{slug}',
    handler: etcHandler.readEtc,
  },
  {
    method: 'GET',
    path: '/etc/all',
    handler: etcHandler.renderEtcs,
  },
];

module.exports = routes;
