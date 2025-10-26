import { writeFile } from 'node:fs/promises';

const create = async () => {
    const filePath = './src/fs/files/fresh.txt';
    const content = 'I am fresh and young';

    try {
        await writeFile(filePath, content, { flag: 'wx' });
    } catch (err) {
        if (err.code === 'EEXIST') {
            throw new Error('FS operation failed');
        } else {
            throw new Error(`Error creating file: ${err.message}`);
        }
    }
};

await create();