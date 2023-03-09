/**
 * Returns an `Array` of strings
 * @param   {String} string    Values as a `String`
 * @param   {String} delimeter Delimeters as a `String`
 * @returns {Array}            `Array`
 */
function splitString(string, delimeter) {
    return string.match(
        new RegExp(`(${delimeter}|[^${delimeter}]+)`, "g")
    );
}



module.exports = { splitString }