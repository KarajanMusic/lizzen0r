module.exports = {
    addISRCs: {
        inputs: {
            _isrcs: {
                validate: value => !isNaN(value),
                transform: value => value,
            },
        },
        outputs: {},
    },
    get: {
        inputs: {},
        outputs: {
            retVal: {
                transform: value => value,
            },
        },
    },
};
