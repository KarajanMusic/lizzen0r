const express = require('express');
const logger = require('winston');
const Response = require('../utils/response');

module.exports = function() {
    const router = express.Router();

    router.route('/').get(async (req, res) => {});

    return router;
};
