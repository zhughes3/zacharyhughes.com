const mongoose = require('mongoose');

const { Schema } = mongoose;

// TODO take out references to Post, the name of the resource is now Dev
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
