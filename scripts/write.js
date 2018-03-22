
require('colors');
const contracts = require('../server/contracts')();

(async function() {
    // WRITE ISRCs
    const args = { _isrcs: ['ATRG71515025', 'ATRG71515022'] };

    try {
        await contracts.lizzenz0r.validateCall('addISRCs', args);

        console.log('Writing ISRCs...'.blue);
    
        const result = await contracts.lizzenz0r.write('addISRCs', args);

        console.log('Done!'.green);
    } catch (err) {
        console.log('Error validating function call'.red, err);
    }
})()