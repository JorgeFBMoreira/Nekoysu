async function loadCommands(client) {
    const { loadFiles } = require('../Functions/fileLoader.js');
    console.time('Commands Loaded');
    
    await client.commands.clear();
    await client.subCommands.clear();

    
    
    const commandsArray = [];
    const commandsPrompt = new Array();

    const Files = await loadFiles('Commands', '.js');
    for (const file of Files) {
        const command = require(file);

        if(command.subCommand) {
            client.subCommands.set(command.subCommand, command);
            commandsPrompt.push({ SubCommand: command.subCommand, Status: '🟩' });
            continue;
        }
	    client.commands.set(command.data.name, command);
        commandsPrompt.push({ Command: command.data.name, Status: '🟩' });
        
        commandsArray.push(command.data.toJSON());
    };
    
    client.application.commands.set(commandsArray);

    console.log('\nCommands =', commandsPrompt);
    console.info("\n\x1b[36m%s\x1b[0m", "Loaded Commands.");
    console.timeEnd('Commands Loaded');
};



module.exports = { loadCommands };