'use strict';

const config = require('config');

const Server = require('./server');
const logger = require('./server/utils/logger');
const db = require('./database');

async function init() {
    try {
        let server = await Server.deployment();
        await server.start();
    } catch (err) {
        logger.error(err);
        process.exit(1);q
    }

    logger.info(`Server started at port: ${config.get('app.port')} with env: ${config.util.getEnv('NODE_ENV')}`);
}

init();