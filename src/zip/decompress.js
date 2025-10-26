import { createReadStream, createWriteStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputFilePath = join(__dirname, 'files', 'archive.gz');
const outputFilePath = join(__dirname, 'files', 'fileToCompress.txt');

const decompress = async () => {
    const readStream = createReadStream(inputFilePath);
    const writeStream = createWriteStream(outputFilePath);

    const gzip = createGunzip();

    readStream.pipe(gzip).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log(`File '${inputFilePath}' successfully compressed to '${outputFilePath}'.`);
    });

    writeStream.on('error', (err) => {
        console.error('Error during compression:', err);
    });

    readStream.on('error', (err) => {
        console.error('Error reading input file:', err);
    });
};

await decompress();
