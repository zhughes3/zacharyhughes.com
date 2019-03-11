'use strict';

const Hapi = require('hapi');
const config = require('config');
const Path = require('path');
const Handlebars = require('handlebars');

const routes = require('./routes');
const plugins = require('./plugins');
const logger = require('./server/utils/logger');

exports.deployment = async() => {
    const server = new Hapi.server({
        host: config.get('app.host'),
        port: config.get('app.port'),
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    });

    const gracefulStopServer = function() {
        server.stop({timeout: 10 * 1000}, () => {
            logger.info('Shutting down server.');
            process.exit(0);
        })
    };
    
    process.on('uncaughtException', err => {
        logger.error(err, 'Uncaught exception');
        process.exit(1);
    });
    
    process.on('unhandledRejection', (reason,promise) => {
        logger.error({
            promise: promise,
            reason: reason
        }, 'unhandledRejection');
        process.exit(1);
    });
    
    process.on('SIGINT', gracefulStopServer);
    process.on('SIGTERM', gracefulStopServer);

    await server.register(plugins);

    server.views({
        engines: {
            html: Handlebars
        },
        relativeTo: __dirname,
        path: 'templates'
    });

    server.route(routes);

    return server;
};
