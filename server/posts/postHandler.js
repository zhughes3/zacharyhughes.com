'use strict';

const Path = require('path');
const Marked = require('marked');
const logger = require('../utils/logger');
const Post = require('../../models/Post');
const uploader = require('../utils/utils');

const UPLOAD_PATH = Path.join(Path.dirname(require.main.filename), 'public', 'images');
const fileOptions = { dest: `${UPLOAD_PATH}/`};

function toSlug(title) {
    return encodeURIComponent(title.toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") //remove all punctuation
        .replace(/ /g, '-') //replace spaces with dashes
    );
}

function markdownToHtml(markdown) {
    return Marked(markdown);
}

const readPosts = async function(req, h) {
    // TODO error handling
    return await Post.find({}).sort({createdAt: 'desc'});
};

const readPost = async function(req, h) {
    let slug = req.params.slug;
    let post = await Post.find({slug: slug});
    return h.view('post', { post: post[0] });
}

const createPost = async function(req, h) {
    const image = req.payload['post-img'];

    const filesDetails = await uploader(image, fileOptions);

    logger.debug(filesDetails);

    const title = req.payload['post-title'];
    const description = req.payload['post-description'];
    const content = markdownToHtml(req.payload['post-content']);
    const tag = req.payload['post-tag'];
    const slug = toSlug(title);
    const post = await new Post({
        title: title,
        description: description,
        content: content,
        img: filesDetails.path,
        tag: tag,
        slug: slug
    });
    
    post.save();

    return { message: "Post created successfully", post };
};

module.exports = {
    createPost,
    readPosts,
    readPost
};