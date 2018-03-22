const express = require('express');
const VideosController = require('../controllers/videos');

module.exports = function() {
    const router = express.Router();
    router.route('/').get(VideosController.getVideos);
    router.route('/register').post(VideosController.registerLicensedVideo);
    return router;
};
