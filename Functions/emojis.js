/**
 * Request **emojis** and returns an `Object`:
 *  ```json
 * {
 *    error: "Message\n"
 *    emoji_name: "<:emote_name:id>",
 * }
 * ```
 * @param   {Collection} guildEmojis     All the emojis in a Guild
 * @param   {Array}      requestedEmojis `Array` containing the requested emojis
 * @returns {Object}                     `Object`
 */
async function emojiLoader(guildEmojis, requestedEmojis) {
    let emojisFound = new Object({
        error: ''
    });

    for(const emoji of requestedEmojis) {
        const emojiFound = guildEmojis.find(emote => emote.name === emoji);
        
        if(!emojiFound) {
            emojisFound.error += `\`${emoji}\` `;
            continue;
        }
        if(emojisFound.hasOwnProperty(emojiFound.name)) continue;

        emojisFound[emoji] = emojiFound.toString();
    }

    return emojisFound;
}


/**
 * Returns a string of emojis (`Object` -> `String`)
 * @param   {Object} emojis Get emojis as `Object`
 * @returns {String}        `String`
 */
function emojisToString(emojis) {
    let result = '';
    Object.values(emojis).forEach((value) => {
        result += `${value}`
    });

    return result;
}



module.exports = { emojiLoader, emojisToString }