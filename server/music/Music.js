const mongoose = require('mongoose');

const { Schema } = mongoose;

const musicSchema = new Schema({
  title: String,
  date: { type: Date, default: Date.now },
  artist: String,
  slug: String,
  content: String,
  tags: String,
});

module.exports = mongoose.model('Music', musicSchema);
