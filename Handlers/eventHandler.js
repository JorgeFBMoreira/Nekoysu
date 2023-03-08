async function loadEvents(client) {
    const { loadFiles }  = require('../Functions/fileLoader.js');
    console.time('Events Loaded');

    client.events = new Map();
    const events  = new Array();
    
    const Files = await loadFiles('Events', '.js');
    for (const file of Files) {
        const event   = require(file);
        const execute = (...args) => event.execute(...args);
        
        if (event.once) {
            client.once(event.name, execute);
        } else {
            client.on(event.name, execute);
        }

        client.events.set(event.name, event);
        events.push({ Event: event.name, Status: '🟩' });
    };

    console.log('\nEvents =', events);
    console.info("\n\x1b[36m%s\x1b[0m", "Loaded Events.");
    console.timeEnd('Events Loaded');
};



module.exports = { loadEvents };