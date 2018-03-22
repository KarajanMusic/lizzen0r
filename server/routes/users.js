const express = require('express');
const UsersController = require('../controllers/users');

module.exports = function() {
    const router = express.Router();
    router.route('/').post(UsersController.registerUser);
    return router;
};
