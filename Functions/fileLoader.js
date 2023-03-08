const { readdir } = require('fs/promises');
const path = require('path');

// Deletes file cached
async function deleteCachedFile(file) {
    const filePath = path.resolve(file);
    if(require.cache[filePath]) {
        delete require.cache[filePath];
    }
}


// Load files
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
    return files;
};



module.exports = { loadFiles }