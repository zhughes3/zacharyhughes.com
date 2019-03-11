'use strict';

const glob = require('glob');
const path = require('path');
const _ = require('lodash');

const routes = [
    {
        method: 'GET',
        path: '/ping',
        handler: function(request, h) {
            return 'pong';
        },
        config: {
            tags: ['api']
        }
    },
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                listing: true
            }
        }
    },
    {
        method: 'GET',
        path: '/',
        handler: function(request, h) {
            return h.file('posts-list.html')
        }
    },
    {
        method: 'GET',
        path: '/admin',
        handler: function(request, h) {
            return h.file('admin.html')
        }
    }
];

glob.sync('./server/**/*Routes.js').forEach((file) => {
    routes.push(require(path.resolve(file)));
});

module.exports = _.flattenDeep(routes);