const mongoose = require('mongoose');

const { Schema } = mongoose;

const etcSchema = new Schema({
  title: String,
  date: { type: Date, default: Date.now },
  img: String,
  content: String,
  tags: String,
  slug: String,
});

module.exports = mongoose.model('Etc', etcSchema);
