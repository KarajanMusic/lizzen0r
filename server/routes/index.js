const rp = require('request-promise');
const checkYoutubeToken = require('../middleware/auth').checkYoutubeToken;
/*router.get('handle_youtube_callback', async function(ctx, next) {
  ctx.redirect(`app://code/${encodeURIComponent(ctx.query.code)}`)
});*/

module.exports = function(app) {
    // Add headers
    app.use((req, res, next) => {
        // TODO: It should probably allow connection from local only, as it is the UI doing the requests
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
        next();
    });

    app.use(checkYoutubeToken);

    app.use('/api/redbull', require('./redbull')());

    app.get('/api/*', (req, res) => res.send('got it'));

    // Proxy all API requests to the backend
    /*app.use('/api/*', async (req, res) => {
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }

        try {
            const body = await rp({
                uri: app.settings.backend.host + req.originalUrl.substr(4),
                qs: req.query,
                body: req.body,
                headers: req.headers,
                method: req.method,
                json: true,
            });
            return res.status(200).json(body);
        } catch (err) {
            if (err === undefined || err.statusCode !== 304) {
                console.error(err);
                return res.status(err.statusCode || 500).json(err.message);
            }
        }
    });*/
};
