const db = require('../db');
const Response = require('../utils/response');

module.exports = {
    registerUser(req, res) {
        if (!req.body.user) {
            return Response.BadRequest('Missing user object.').send(res);
        }
        db.rpush(['users', JSON.stringify(req.body.user)], (err, reply) => {
            if (err) {
                return Response.InternalServerError(err).send(res);
            }
            return Response.OK().send(res);
        });
    },
    getUsers(req, res) {
        client.lrange('users', 0, -1, (err, reply) => {
            if (err) {
                return Response.InternalServerError(err).send(res);
            }
            return Response.OK(reply).send(res);
        });
    },
};
