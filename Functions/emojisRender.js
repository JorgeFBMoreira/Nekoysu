function renderEmojis(emojis) {
    let result = '';

    Object.values(emojis).forEach((value) => {
        result += `${value} `
    });

    return result;
}



module.exports = { renderEmojis }