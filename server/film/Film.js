const mongoose = require('mongoose');

const { Schema } = mongoose;

const FilmSchema = new Schema({
  title: String,
  date: { type: Date, default: Date.now },
  img: Buffer,
  slug: String,
  genre: String,
  content: String,
  tags: String,
});

module.exports = mongoose.model('Film', FilmSchema);
