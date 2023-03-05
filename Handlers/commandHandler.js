async function loadCommands(client) {
    const { loadFiles } = require('../Functions/fileLoader.js');
    
    await client.commands.clear();
    

    let commandsArray = [];
    console.log("Awaiting to load Commands...");
    const Files = await loadFiles('Commands', '.js');
    
    for (const file of Files) {
        const command = require(file);
	    
        client.commands.set(command.data.name, command);
        commandsArray.push(command.data.toJSON());
    };
    
    client.application.commands.set(commandsArray);
    return console.log('Commands Loaded. . .');
};



module.exports = { loadCommands };