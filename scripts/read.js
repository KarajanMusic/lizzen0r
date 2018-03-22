
require('colors');
const contracts = require('../server/contracts')();

(async function() {
    // READ ISRCS

    try {
        await contracts.lizzenz0r.validateCall('getISRCs', {});

        console.log('Writing ISRCs...'.blue);
    
        const result = await contracts.lizzenz0r.read('getISRCs', {});

        console.log('Done!'.green, result);
    } catch (err) {
        console.log('Error validating function call'.red, err);
    }
})()