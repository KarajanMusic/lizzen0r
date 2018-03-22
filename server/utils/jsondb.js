const fs = require('fs');

const db = require('../data/db');
const jsondb = {};

jsondb.save = function(key, data) {
    db[key].push(data);
    fs.writeFileSync('server/data/db.json', JSON.stringify(db, null, 2)); // eslint-disable-line no-sync
};

jsondb.get = function(key) {
    return db[key];
};

module.exports = jsondb;
