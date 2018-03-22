const Joi = require('joi');
const web3 = require('web3');
const validator = require('../utils/validator');

module.exports = {
    addISRCs: {
        inputs: {
            _isrcs: {
                validate: Joi.array()
                .min(1)
                .items(validator.schemas.isrc.required()),
                transform: values => values.map(value => web3.utils.padLeft(web3.utils.toHex(value), 24)),
            },
        },
        outputs: {},
    },
    getISRCs: {
        inputs: {},
        outputs: {
            '': {
                transform: value => web3.utils.hexToAscii(value),
            },
        },
    },
};
