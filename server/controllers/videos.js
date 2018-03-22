const db = require('../db');
const Response = require('../utils/response');
const videos = require('../data').videos;

module.exports = {
    getVideos(req, res) {
        Response.OK(videos).send(res);
    },
    licenseVideo(req, res) {
        const nowTimestamp = Date.now();
        const licenseData = {
            isrc: 'AAAAAAA',
            user_id: null,
            youtube_id: '231321',
            licence_type: TO_BE_DEFINED,
            licence_start_date: nowTimestamp,
            licence_end_date: nowTimestamp + 5 * 60 * 1000, // 5 minutes
            licence_id: 2312321321,
        };
        db.sadd(['licenses', licenseData], function(err, reply) {
            if (err) {
                return Response.InternalServerError(err).send(res);
            }
            return Response.OK().send(res);
        });
    },
};
