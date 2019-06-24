const musicHandler = require('./musicHandler');

const routes = [
  {
    method: 'GET',
    path: '/music',
    handler: musicHandler.readMusics,
    config: {auth: false}  
  },
  {
    method: 'POST',
    path: '/music',
    handler: musicHandler.createMusic,
    config: {auth: 'jwt'}  
  },
  {
    method: 'GET',
    path: '/music/{slug}',
    handler: musicHandler.readMusic,
    config: {auth: false}  
  },
  {
    method: 'GET',
    path: '/music/all',
    handler: musicHandler.renderMusics,
    config: {auth: false}  
  },
];

module.exports = routes;
