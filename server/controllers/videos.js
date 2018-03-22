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
    async licenseVideo(req, res) {
        const nowTimestamp = Date.now();
        const userId = req.body.user_id;
        const isrc = req.body.isrc;
        const startTime = nowTimestamp;
        const endTime = nowTimestamp + 5 * 60 * 1000;
        console.log('LICENSING VIDEO... ', {
            userId,
            isrc,
            startTime,
            endTime
        });
        const result = await req.contracts.lizzenz0r.write('registerLicensePurchase', {
            userId,
            isrc,
            startTime,
            endTime
        });
        const licenseId = await req.contracts.lizzenz0r.read('getUserLicenseId', {
            userId
        });
        console.log('LICENSE VIDEO read licenseId: ', licenseId);
        return Response.OK({ result, licenseId }).send(res);
    },
    async registerLicensedVideo(req, res) {
        try {
            if (!req.body.link || !req.body.license_id) {
                console.log('BadRequest!', req.body.link, req.body.license_id);
                return Response.BadRequest().send(res);
            }
            console.log(req.body.link)
            const videoData = {
                youtube_id: await _getYoutubeID(req.body.link),
            };
            const userId = req.body.user_id;
            const licenseId = req.body.license_id;
            console.log('REGISTERING LICENSED VIDEO...', {
                ytId: videoData.youtube_id,
                licenseId,
                userId,
            });
            const result = await req.contracts.lizzenz0r.write('registerVideo', {
                ytId: videoData.youtube_id,
                licenseId,
                userId,
            });
            return Response.OK({ result }).send(res);
        } catch (err) {
            console.log('ERROR', err);
            return Response.BadRequest(err).send(err);
        }
    },
};
