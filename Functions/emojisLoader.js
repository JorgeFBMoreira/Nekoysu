async function emojiLoader(guildEmojis, requestedEmojis) {
    console.log(requestedEmojis)

    let emojisFound = new Object();

    for(const emoji of requestedEmojis) {
        const searchEmoji = guildEmojis.find(emote => emote.name === emoji);
        if(!searchEmoji) return;

        emojisFound[searchEmoji.name] = searchEmoji.toString();
    }

    return emojisFound;
}



module.exports = { emojiLoader }