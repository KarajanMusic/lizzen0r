
require('colors');
const contracts = require('../server/contracts')();
const data = require('../server/data/index');

(async function() {
    // WRITE ISRCs
    const args = { isrcs_: data.videos.map(recording => recording.isrc) };

    try {
        await contracts.lizzenz0r.validateCall('setISRCs', args);

        console.log('Writing ISRCs...'.blue);
    
        const result = await contracts.lizzenz0r.write('setISRCs', args);

        console.log('Done! Gas used:'.green, result.gasUsed);
    } catch (err) {
        console.log('Error validating function call'.red, err);
    }
})()