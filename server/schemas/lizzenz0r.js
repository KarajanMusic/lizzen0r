const Joi = require('joi');
const web3 = require('web3');
const validator = require('../utils/validator');

module.exports = {
    setISRCs: {
        inputs: {
            isrcs_: {
                validate: Joi.array()
                    .min(1)
                    .items(validator.schemas.isrc.required()),
                transform: values => values.map(value => web3.utils.padLeft(web3.utils.toHex(value), 24)),
            },
        },
        outputs: {},
    },
    registerLicensePurchase: {
        inputs: {
            userId: {
                validate: validator.schemas.userId.required(),
                transform: value => value,
            },
            isrc: {
                validate: validator.schemas.isrc.required(),
                transform: value => web3.utils.padLeft(web3.utils.toHex(value), 24),
            },
            startTime: {
                validate: Joi.number().positive(),
                transform: value => value,
            },
            endTime: {
                validate: Joi.number().positive(),
                transform: value => value,
            },
        },
        outputs: {
            licenseId: {
                validate: validator.schemas.licenseId.required(),
                transform: value => value,
            },
        },
    },
    registerVideo: {
        inputs: {
            ytId: {
                validate: validator.schemas.youtubeId.required(),
                transform: value => value,
            },
            licenseId: {
                validate: validator.schemas.licenseId.required(),
                transform: value => value,
            },
            userId: {
                validate: validator.schemas.userId.required(),
                transform: value => value,
            },
        },
        outputs: {},
    },
    getLicenseOnVideo: {
        inputs: {
            ytId: {
                validate: validator.schemas.youtubeId.required(),
            },
        },
        outputs: {
            userId: {
                validate: validator.schemas.userId.required(),
                transform: value => value,
            },
            isrc: {
                validate: validator.schemas.isrc.required(),
                transform: value => web3.utils.padLeft(web3.utils.toHex(value), 24),
            },
            start: {
                validate: Joi.number().positive(),
                transform: value => value,
            },
            end: {
                validate: Joi.number().positive(),
                transform: value => value,
            },
        },
    },
    getISRCs: {
        inputs: {},
        outputs: {
            '': {
                transform: values => values.map(value => web3.utils.hexToAscii(value)),
            },
        },
    },
};
