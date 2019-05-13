const config = require('config');
const Etc = require('./Etc');
const utils = require('../utils/utils');

const readEtcs = async function (req, h) {
  return await Etc.find({}).sort({ createdAt: 'desc' });
};

const readEtc = async function (req, h) {
  let { slug } = req.params;
  slug = encodeURIComponent(slug);
  const etc = await Etc.find({ slug });
  return h.view('etc', {
    title: config.get('app.name'),
    etc: etc[0],
  });
};

const createEtc = async function (req, h) {
  console.log(req.payload);
  const img = utils.BufferToBase64(req.payload['etc-img']);
  const title = req.payload['etc-title'];
  const tags = req.payload['etc-tags'];
  const content = req.payload['etc-content'];

  const etc = await new Etc({
    title,
    img,
    tags,
    content,
  });

  etc.save();

  return h.redirect('/etc/all');
};

const renderEtcs = async function (req, h) {
  return h.view('list', {
    title: config.get('app.name'),
    resource: 'etc',
    resource_description: 'things I do outside of work',
  });
};

module.exports = {
  readEtcs,
  readEtc,
  createEtc,
  renderEtcs,
};
