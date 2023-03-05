async function loadEvents(client) {
    const { loadFiles } = require('../Functions/fileLoader.js');
    const eventsLoaded = [];
    
    await client.events.clear();
    
    const Files = await loadFiles('Events', '.js');
    for (const file of Files) {
        const event = require(file);
	    client.events.set(event.name, event);
        
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    };

    return console.log('\nEvents Loaded. . .');
};



module.exports = { loadEvents };