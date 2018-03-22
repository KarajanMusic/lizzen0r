const jsondb = require('../utils/jsondb');
const Response = require('../utils/response');
const videos = require('../data').videos;

function _getYoutubeID(link) {
    return new Promise((resolve, reject) => {
        if (link) {
            const parsedYoutube = link.match(/(https?:\/\/)?(www.)?youtube\.[a-z]{2,3}\/watch\?v=(.+)/);
            if (parsedYoutube) {
                return resolve(parsedYoutube[3]);
            }
            return reject('Does not look like a youtube link');
        }
        return reject('Missing youtube link');
    });
}

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
            licence_type: 'Lizzenz0rSoundSupplyLicense',
            licence_start_date: nowTimestamp,
            licence_end_date: nowTimestamp + 5 * 60 * 1000, // 5 minutes
            licence_id: 2312321321,
        };
        jsondb.save('licenses', licenseData);
        return Response.OK().send(res);
    },
    async registerLicensedVideo(req, res) {
        try {
            const videoData = {
                youtube_id: await _getYoutubeID(req.body.link),
            };
            jsondb.save('videos', videoData);
            return Response.OK().send(res);
        } catch (err) {
            return Response.BadRequest(err).send(err);
        }
    },
};
