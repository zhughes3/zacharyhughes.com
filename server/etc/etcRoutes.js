const etcHandler = require('./etcHandler');

const routes = [
  {
    method: 'GET',
    path: '/etc',
    handler: etcHandler.readEtcs,
    config: {auth: false}  
  },
  {
    method: 'POST',
    path: '/etc',
    handler: etcHandler.createEtc,
    config: {auth: 'jwt'}
  },
  {
    method: 'GET',
    path: '/etc/{slug}',
    handler: etcHandler.readEtc,
    config: {auth: false}
  },
  {
    method: 'GET',
    path: '/etc/all',
    handler: etcHandler.renderEtcs,
    config: {auth: false}
  },
];

module.exports = routes;
