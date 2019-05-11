const config = require('config');
const Film = require('./Film');
const utils = require('../utils/utils');

const readFilms = async function (req, h) {
  return await Film.find({}).sort({ createdAt: 'desc' });
};

const readFilm = async function (req, h) {
  const { slug } = req.params;
  const film = await Film.find({ slug });
  return film;
};

const createFilm = async function (req, h) {
  console.log(req.payload);
  const title = req.payload['film-title'];
  const tags = req.payload['film-tag'];
  const content = utils.MarkdownToHtml(req.payload['film-content']);
  const slug = utils.TitleToSlug(title);

  const film = await new Film({
    title,
    tag: tags,
    slug,
    content,
  });

  film.save();

  return h.redirect('/film/all');
};

const renderFilms = async function (req, h) {
  return h.view('list', {
    title: config.get('app.name'),
    resource: 'film',
    resource_description: 'movies and tv shows i\m into',
  });
};

module.exports = {
  readFilm,
  readFilms,
  createFilm,
  renderFilms,
};
