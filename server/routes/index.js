const checkYoutubeToken = require('../middleware/auth').checkYoutubeToken;

module.exports = function(app, contracts) {
    // TERRIBLE hack to make contracts interface available on request object
    app.use((req, res, next) => {
        req.contracts = contracts;
        next();
    });

    // Add headers
    app.use((req, res, next) => {
        // TODO: It should probably allow connection from local only, as it is the UI doing the requests
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
        next();
    });

    app.use('/api/*', checkYoutubeToken);

    app.use('/api/users', require('./users')());
    app.use('/api/videos', require('./videos')());
    app.use('/api/redbull', require('./redbull')());
};
