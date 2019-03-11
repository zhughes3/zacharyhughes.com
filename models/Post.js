'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    date: { type: Date, default: Date.now },
    description: String,
    img: String,
    content: String,
    tag: String,
    slug: String
});

module.exports = mongoose.model('Post', PostSchema);