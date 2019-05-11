const config = require('config');
const server = require('./server');
const logger = require('./server/utils/logger');
require('./database');

async function init() {
  try {
    const svr = await server.deployment();
    await svr.start();
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }

  logger.info(`Server started at port: ${config.get('app.port')} with env: ${config.util.getEnv('NODE_ENV')}`);
}

init();
