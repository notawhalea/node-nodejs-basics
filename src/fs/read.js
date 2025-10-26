import { readFile } from 'node:fs/promises';

const read = async () => {
    const filePath = './src/fs/files/fileToRead.txt';

    try {
        const data = await readFile(filePath, 'utf8');
        console.log(data)
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await read();
