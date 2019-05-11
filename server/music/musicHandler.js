const config = require('config');
const Music = require('./Music');
const utils = require('../utils/utils');

const readMusics = async function (req, h) {
  return await Music.find({}).sort({ createdAt: 'desc' });
};

const readMusic = async function (req, h) {
  const { slug } = req.params;
  const music = await Music.find({ slug });
  return music;
};

const createMusic = async function (req, h) {
  console.log(req.payload);

  const title = req.payload['music-title'];
  const artist = req.payload['music-artist'];
  const tags = req.payload['music-tags'];
  const slug = utils.TitleToSlug(title);
  const content = utils.MarkdownToHtml(req.payload['music-content']);

  const music = await new Music({
    title,
    artist,
    tag: tags,
    slug,
    content,
  });

  music.save();

  return h.redirect('/music/all');
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
