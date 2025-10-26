import { createWriteStream } from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
    const fileWritableStream = createWriteStream(filePath, { encoding: 'utf-8' });

    console.log("--- START TYPING BELOW. Press Ctrl+D (or Ctrl+Z then Enter on Windows) to finish and save. ---");

    // 3. Pipe the Readable Stream (process.stdin) to the Writable Stream (file)
    // This handles all the data transfer and flow control automatically.
    process.stdin.pipe(fileWritableStream);

    // 4. Listen for the correct termination event on the Writable Stream
    fileWritableStream.on('finish', () => {
        console.log('\n--- DATA SUCCESSFULLY WRITTEN TO fileToWrite.txt ---');
    });

    // 5. Handle errors
    fileWritableStream.on('error', (err) => {
        console.error('File Writing Error:', err.message);
    });
};

await write();
