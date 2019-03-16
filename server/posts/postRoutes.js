'use strict';

const config = require('config');
const postHandler = require('./postHandler');

const routes = [
    {
        method: 'POST',
        path: '/posts',
        handler: postHandler.createPost,
        options: {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data'
            }
        }
    },
    {
        method: 'GET',
        path: '/posts',
        handler: postHandler.readPosts
    },
    {
        method: 'GET',
        path: '/posts/{slug}',
        handler: postHandler.readPost
    }
];

module.exports = routes;
