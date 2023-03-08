// Returns the name of the emoji (as key) and formats the emoji to be usable in-chat (value)
// Example: emoji.mode_std => <:mode_std:1082733555089686528>
async function emojiLoader(guildEmojis, requestedEmojis) {
    let emojisFound = new Object();

    for(const emoji of requestedEmojis) {
        const searchEmoji = guildEmojis.find(emote => emote.name === emoji);
        
        if(!searchEmoji) return { 
            error: `- The emoji \`${emoji}\` does not exist in this Guild.` 
        };
        if(emojisFound.hasOwnProperty(searchEmoji.name)) continue;

        console.log(searchEmoji.name)
        emojisFound[searchEmoji.name] = searchEmoji.toString();
    }

    return emojisFound;
}


// Returns a string of emojis (object => string)
function renderEmojis(emojis) {
    let result = '';

    Object.values(emojis).forEach((value) => {
        result += `${value} `
    });

    return result;
}



module.exports = { emojiLoader, renderEmojis }