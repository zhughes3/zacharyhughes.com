const config = require('config');
const Film = require('./Film');
const utils = require('../utils/utils');

const readFilms = async function (req, h) {
  return await Film.find({}).sort({ createdAt: 'desc' });
};

const readFilm = async function (req, h) {
  let { slug } = req.params;
  slug = encodeURIComponent(slug);
  const film = await Film.find({ slug });
  return h.view('film', {
    title: config.get('app.name'),
    film: film[0],
  });
};

const createFilm = async function (req, h) {
  console.log(req.payload);
  const img = req.payload['film-img'];
  const base64img = utils.BufferToBase64(img);
  const genre = req.payload['film-genre'];
  const title = req.payload['film-title'];
  const tags = req.payload['film-tag'];
  const content = utils.MarkdownToHtml(req.payload['film-content']);
  const slug = utils.ToSlug(title);

  const film = await new Film({
    title,
    tags,
    img: base64img,
    genre,
    slug,
    content,
  });

  film.save();

  return h.response({
    success: true,
    message: 'Film saved successfully'
  }).code(201);
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
