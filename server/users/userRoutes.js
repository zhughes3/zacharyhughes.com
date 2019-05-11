

const userHandler = require('./userHandler');

const routes = [
  {
    method: 'POST',
    path: '/users',
    handler: userHandler.createUser,
  },
];

module.exports = routes;
