const db = require('../db');
const Response = require('../utils/response');
const videos = require('../data').videos;

module.exports = {
    getVideos(req, res) {
        Response.OK(videos).send(res);
    },
};
