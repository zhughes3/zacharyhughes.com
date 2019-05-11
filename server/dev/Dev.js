const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  date: { type: Date, default: Date.now },
  description: String,
  img: String,
  content: String,
  tag: String,
  slug: String,
});

module.exports = mongoose.model('Dev', postSchema);
