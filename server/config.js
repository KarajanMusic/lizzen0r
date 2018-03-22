const logger = require('winston');

const _configs = {
    _globals: {
        port: 3000,
        redis: {
            host: '127.0.0.1',
            port: 6379,
        },
    },
    development: {
        redis: {},
    },
    produdction: {
        redis: {},
    },
};

const env = process.env.NODE_ENV || 'development';
logger.info(`Configuration loaded for environment: ${env}`);

// Extend global configuration with environmental one
module.exports = Object.assign(_configs._globals, _configs[process.env.NODE_ENV || env]);
