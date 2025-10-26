import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
    const readableStream = createReadStream(filePath, { encoding: 'utf-8' });

    readableStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });

    readableStream.on('end', () => {
        process.stdout.write('\nDONE\n');
    });

    readableStream.on('error', (err) => {
        console.error('Error', err.message);
    });
};

await read();
