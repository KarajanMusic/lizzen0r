const express = require('express');
const Response = require('../utils/response');
const rp = require('request-promise');

module.exports = function() {
    const router = express.Router();
    router.route('*').get(async (req, res) => {
        // Basic proxy for the blokur hackathon API
        try {
            const body = await rp({
                uri: 'http://hackathon.blokur.com/v1/redbull/recordings',
                qs: req.query,
                headers: Object.assign(req.headers, { authorization: 'Bearer ' + process.env.BLOKUR_REDBULL_API_KEY }),
                method: 'GET',
                json: true,
            });
            return Response.OK(body).send(res);
        } catch (err) {
            return Response.InternalServerError(err).send(res);
        }
    });
    return router;
};
