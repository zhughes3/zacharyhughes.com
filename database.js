const mongoose = require('mongoose');
const config = require('config');
const logger = require('./server/utils/logger');

mongoose.connect(config.get('database.url'), { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', logger.error.bind(console, 'connection error'));
db.once('open', () => {
  logger.info('Connection with database succeeded.');
});

module.exports = db;
