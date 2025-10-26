import { readdir } from 'node:fs/promises';

const sourceFolder = './files';
const list = async () => {
    try {
        const files = await readdir(sourceFolder);
        for (const file of files)
            console.log(file);
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await list();
