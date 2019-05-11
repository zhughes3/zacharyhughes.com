const path = require('path');
const config = require('config');
const utils = require('../utils/utils');
const Dev = require('./Dev');

const UPLOAD_PATH = path.join(path.dirname(require.main.filename), 'public', 'images');
const fileOptions = { dest: `${UPLOAD_PATH}/` };

const readDevs = async function (req, h) {
  return await Dev.find({}).sort({ createdAt: 'desc' });
};

const readDev = async function (req, h) {
  const { slug } = req.params;
  const post = await Dev.find({ slug });
  return h.view('post', {
    title: config.get('app.name'),
    post: post[0],
  });
};

const createDev = async function (req, h) {
  // const image = req.payload['post-img'];
  //
  // const filesDetails = await uploader(image, fileOptions);
  //
  // logger.debug(filesDetails);

  const title = req.payload['post-title'];
  // const description = req.payload['post-description'];
  const content = utils.MarkdownToHtml(req.payload['post-content']);
  const tags = req.payload['post-tags'];
  const slug = utils.TitleToSlug(title);
  const post = await new Dev({
    title,
    // description,
    content,
    // img: filesDetails.path,
    tag: tags,
    slug,
  });

  post.save();

  // return { message: 'Post created successfully', post };
  // return h.file('dev-list.html');

  return h.redirect('/dev/all');
};

const renderDevs = async function (req, h) {
  return h.view('list', {
    title: config.get('app.name'),
    resource: 'dev',
    resource_description: 'software development, automation, cloud infrastructure, and everything in-between',
  });
};

module.exports = {
  createDev,
  readDevs,
  readDev,
  renderDevs,
};
