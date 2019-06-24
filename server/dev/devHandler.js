const path = require('path');
const config = require('config');
const utils = require('../utils/utils');
const Dev = require('./Dev');

const readDevs = async function (req, h) {
  return await Dev.find({}).sort({ createdAt: 'desc' });
};

const readDev = async function (req, h) {
  let { slug } = req.params;
  slug = encodeURIComponent(slug);
  const post = await Dev.find({ slug });
  return h.view('post', {
    title: config.get('app.name'),
    post: post[0],
  });
};

const createDev = async function (req, h) {
  const title = req.payload['post-title'];
  const content = utils.MarkdownToHtml(req.payload['post-content']);
  const tags = req.payload['post-tags'];
  const slug = utils.ToSlug(title);
  const post = await new Dev({
    title,
    content,
    tag: tags,
    slug,
  });

  post.save();

  return h.response({
    success: true,
    message: 'Post saved successfully'
  }).code(201);
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
