const config = require('config');
const Music = require('./Music');
const utils = require('../utils/utils');

const readMusics = async function (req, h) {
  return await Music.find({}).sort({ createdAt: 'desc' });
};

const readMusic = async function (req, h) {
  let { slug } = req.params;
  slug = encodeURIComponent(slug);
  const music = await Music.find({ slug });
  return h.view('music', {
    title: config.get('app.name'),
    music: music[0],
  });
};

const createMusic = async function (req, h) {
  console.log(req.payload);
  const img = req.payload['music-img'];
  const base64img = utils.BufferToBase64(img);
  const title = req.payload['music-title'];
  const artist = req.payload['music-artist'];
  const tags = req.payload['music-tags'];
  const slug = utils.ToSlug([artist, title]);
  const content = utils.MarkdownToHtml(req.payload['music-content']);

  const music = await new Music({
    title,
    artist,
    tag: tags,
    slug,
    content,
    img: base64img,
  });

  music.save();

  return h.response({
    success: true,
    message: 'Music saved successfully'
  }).code(201);
};

const renderMusics = async function (req, h) {
  return h.view('list', {
    title: config.get('app.name'),
    resource: 'music',
    resource_description: 'albums and singles I\'m into',
  });
};

module.exports = {
  readMusics,
  readMusic,
  createMusic,
  renderMusics,
};
