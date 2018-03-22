const fs = require('fs');

const db = require('../data/db');
const jsondb = {};

jsondb.save = function(key, data) {
    db[key].push(data);
    fs.writeFileSync('../data/db.json', JSON.stringify(db));
};

jsondb.get = function(key) {
    return db[key];
};

module.exports = jsondb;
