const redis = require('redis');
const logger = require('winston-color');
const config = require('../config').redis;

const client = redis.createClient(config.port, config.host);

client.on('connect', function(err) {
    logger.info('[REDIS] Connected');
});

// handle redis connection temporarily going down without app crashing
client.on('error', function(err) {
    logger.error('[REDIS] Error:', err);
});

module.exports = client;
