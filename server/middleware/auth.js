const Response = require('../utils/response');
const google = require('googleapis').google;
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    process.env.YOUR_REDIRECT_URL, // TODO:
);

const scopes = ['https://www.googleapis.com/auth/youtube'];

const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
});

module.exports = {
    checkYoutubeToken: (req, res, next) => {
        // Get the token out of the auth header
        if (!req.headers.authorization) {
            return Response.Forbidden('An authorization token is required').send(res);
        }
        const authToken = req.headers.authorization.match(/^Bearer (\w+)$/);
        if (!authToken) {
            return Response.Forbidden('Malformed authorization header').send(res);
        }
        oauth2Client.getToken(authToken[1], function(err, tokens) {
            if (err) {
                return Response.InternalServerError('Unable to retrieve token').send(res);
            }
            oauth2Client.setCredentials(tokens);
            res.youtube = google.youtube({
                version: 'v3',
                auth: oauth2Client,
            });
            next();
        });
    },
};
