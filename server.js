const hapi = require('hapi');
const config = require('config');
const path = require('path');
const handlebars = require('handlebars');
handlebars.registerHelper('toLowerCase', function(str) {
  return str.toLowerCase();
});

const routes = require('./routes');
const plugins = require('./plugins');
const logger = require('./server/utils/logger');
const { validate } = require('./server/users/userHandler');

exports.deployment = async () => {
  const server = new hapi.server({
    host: config.get('app.host'),
    port: config.get('app.port'),
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'public'),
      },
    },
    debug: { request: ['error'] },
  });

  const gracefulStopServer = function () {
    server.stop({ timeout: 10 * 1000 }, () => {
      logger.info('Shutting down server.');
      process.exit(0);
    });
  };

  process.on('uncaughtException', (err) => {
    logger.error(err, 'Uncaught exception');
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error({
      promise,
      reason,
    }, 'unhandledRejection');
    process.exit(1);
  });

  process.on('SIGINT', gracefulStopServer);
  process.on('SIGTERM', gracefulStopServer);

  await server.register(plugins);

  server.auth.strategy('simple', 'basic', { validate });

  server.auth.strategy('jwt', 'jwt',
  { key: config.get('app.secret'),          // Never Share your secret key
    validate,            // validate function defined above
    verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
  });
 
  server.auth.default('jwt');

  server.views({
    engines: {
      html: handlebars,
    },
    relativeTo: __dirname,
    path: 'templates',
  });

  server.route(routes);

  return server;
};
