const userHandler = require('./userHandler');

const routes = [
  {
    method: 'POST',
    path: '/users',
    handler: userHandler.createUser,
  },
  {
    method: 'POST',
    path: '/login',
    handler: userHandler.login,
    config: {auth: false}
  }
];

module.exports = routes;
