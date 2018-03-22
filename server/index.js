const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('winston-color');
const helmet = require('helmet');
const path = require('path');
const compression = require('compression');
const config = require('./config');
const contracts = require('./contracts')();

require('dotenv').load();

// const port_https = 8000;
const app = express();

// Set app config
//app.set('backend', appConfig[ENV].backend);

// Security
app.use(helmet());

// Log HTTP requests
app.use(morgan('common'));

// Compress all response bodies
app.use(compression());

// Parse request bodies
app.use(bodyParser.json({ type: '*/*' }));

// Add headers
/*app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	// res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
	next();
});*/

// Inject routes
logger.info('[SERVER] Initializing routes');
require('./routes')(app, contracts);

// Fallback everything else to the React application
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Listen for requests
logger.info('[SERVER] Starting...');
const server = app.listen(config.port, () => {
    logger.info(`Magic happens on port ${server.address().port}`);
});
