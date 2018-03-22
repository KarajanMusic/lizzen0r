const jsondb = require('../utils/jsondb');
const Response = require('../utils/response');

module.exports = {
    registerUser(req, res) {
        if (!req.body.user) {
            return Response.BadRequest('Missing user object.').send(res);
        }
        jsondb.save('users', JSON.stringify(req.body.user));
        return Response.OK().send(res);
    },
    getUsers(req, res) {
        const result = jsondb.get('users');
        return Response.OK(result).send(res);
    },
};
