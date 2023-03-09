const { readdir } = require('fs/promises');
const path = require('path');

// 
/**
 * Deletes cached file
 * @param {String} file 
 */
async function deleteCachedFile(file) {
    const filePath = path.resolve(file);
    
    if(require.cache[filePath]) {
        delete require.cache[filePath];
    }
}


// 
/**
 * Load files
 * ```bash
 * Result: ['yourPath/Nekoysu/Commands/Developer/Emojis/emojis.js', ...]
 * ```
 * @param   {String} dirName  Name of the Folder
 * @param   {String} fileType Specified file type (Ex.: `.js`)
 * @returns {Array}           `Array` of files
 */
async function loadFiles(dirName, fileType) {
    let files = [];
    const items = await readdir(dirName, { withFileTypes: true });

    for (const item of items) {
        if (item.isDirectory()) {
            files = [
                ...files,
                ...(await loadFiles(`${dirName}/${item.name}`, fileType)),
            ];
        } else {
            if(fileType) {
                if(path.extname(item.name) === fileType) files.push(`${process.cwd().replace(/\\/g, '/')}/${dirName}/${item.name}`);
            }
            else {
                files.push(`${process.cwd().replace(/\\/g, '/')}/${dirName}/${item.name}`);
            }
        }
    }
    
    await Promise.all(files.map(deleteCachedFile));
    console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n', typeof(files), files[1])
    return files;
};



module.exports = { loadFiles }