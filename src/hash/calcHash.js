import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
    const fileStream = createReadStream(filePath);
    const hashStream = createHash('sha256');

    fileStream.on('error', (err) => {
        if (err.code === 'ENOENT') {
            console.error('FS operation failed: File not found.');
        } else {
            console.error(`FS operation failed: ${err.message}`);
        }
        hashStream.end();
    });

    hashStream.on('finish', () => {
        const hashResult = hashStream.digest('hex');
        console.log(`SHA256 Hash for ${path.basename(filePath)}: ${hashResult}`);
    });

    fileStream.pipe(hashStream);
};

await calculateHash();