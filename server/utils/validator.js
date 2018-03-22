const Joi = require('joi');

module.exports = {
    validate: (data, schema) =>
        Joi.validate(data, schema).catch(err => {
            if (err.isJoi) {
                const messages = err.details.map(detail => detail.message);
                throw new Object({ isValidation: true, messages });
            }
            throw err;
        }),
    schemas: {
        numericString: Joi.string().regex(/^\d+$/),
        iswc: Joi.string().regex(/^T[0-9]{10}$/),
        hash: Joi.string().regex(/^[0-9A-Za-z]{32}$/),
        id: Joi.number().positive(),
    },
};
