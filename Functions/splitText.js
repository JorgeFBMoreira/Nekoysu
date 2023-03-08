// Returns an array of strings
// Example: getEmojisProvided (string) => requestEmojis (array) ['mode_std', 'mode_mania'...]
function splitText(string, delimeter) {
    return string.match(
        new RegExp(`(${delimeter}|[^${delimeter}]+)`, "g")
    );
}



module.exports = { splitText }