const express = require('express');
const logger = require('winston-color');
const Response = require('../utils/response');
const rp = require('request-promise');
const UsersController = require('../controllers/users');

module.exports = function() {
    const router = express.Router();
    router.route('/').post(UsersController.registerUser);
    return router;
};
