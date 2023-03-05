const { readdir } = require('fs/promises');
const path = require('path');

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
    
    return files;
};



module.exports = { loadFiles }