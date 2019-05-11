const filmHandler = require('./filmHandler');

const routes = [
  {
    method: 'GET',
    path: '/film',
    handler: filmHandler.readFilms,
  },
  {
    method: 'GET',
    path: '/film/{slug}',
    handler: filmHandler.readFilm,
  },
  {
    method: 'POST',
    path: '/film',
    handler: filmHandler.createFilm,
  },
  {
    method: 'GET',
    path: '/film/all',
    handler: filmHandler.renderFilms,
  },
];

module.exports = routes;
