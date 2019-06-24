const filmHandler = require('./filmHandler');

const routes = [
  {
    method: 'GET',
    path: '/film',
    handler: filmHandler.readFilms,
    config: {auth: false} 
  },
  {
    method: 'GET',
    path: '/film/{slug}',
    handler: filmHandler.readFilm,
    config: {auth: false} 
  },
  {
    method: 'POST',
    path: '/film',
    handler: filmHandler.createFilm,
    config: {auth: 'jwt'} 
  },
  {
    method: 'GET',
    path: '/film/all',
    handler: filmHandler.renderFilms,
    config: {auth: false} 
  },
];

module.exports = routes;
