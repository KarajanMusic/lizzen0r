
require('colors');
const contracts = require('../server/contracts')();
const data = require('../server/data/index');

(async function() {
    // WRITE ISRCs
    const args = { isrcs_: data.videos.map(recording => recording.isrc) };

    try {
        await contracts.lizzenz0r.validateCall('addISRCs', args);

        console.log('Writing ISRCs...'.blue);
    
        const result = await contracts.lizzenz0r.write('addISRCs', args);

        console.log('Done!'.green);
    } catch (err) {
        console.log('Error validating function call'.red, err);
    }
})()