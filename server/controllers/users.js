const Response = require('../utils/response');

module.exports = {
    registerUser(req, res) {
        if (!req.body.user) {
            return Response.BadRequest('Missing user object.').send(res);
        }
        return Response.OK().send(res);
    },
};
