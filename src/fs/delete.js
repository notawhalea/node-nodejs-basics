import { rm } from 'node:fs/promises';

const remove = async () => {
    const filePath = './src/fs/files/fileToRemove.txt';

    try {
        await rm(filePath);
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await remove();
