const fs = require('fs');
const Contract = require('./utils/contract');
require('dotenv').load();

module.exports = function() {
    const contracts = {};
    const filenames = fs.readdirSync('blockchain/build/contracts'); // eslint-disable-line no-sync
    for (const filename of filenames) {
        contracts[filename.replace('.json', '')] = new Contract(filename, process.env.CONTRACT_ADDRESS, {
            address: process.env.OWNER_ADDRESS,
            password: process.env.OWNER_PASSWORD
        });
    }
    return contracts;
};
