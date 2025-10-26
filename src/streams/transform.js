import { Transform } from 'node:stream';
import process from 'node:process';

const transform = async () => {
    let buffer = '';

    const reverseStream = new Transform({
        transform(chunk, encoding, callback) {
            const str = chunk.toString('utf8');
            const trimmed = str.trim();

            if (trimmed.toUpperCase() === 'CLOSE') {
                const reversedText = buffer.split('').reverse().join('');
                process.stdout.write(reversedText + '\n', () => {
                    console.log('--- Program closed by user command ---');
                    process.exit(0);
                });
                return callback();
            }

            buffer += str;
            callback();
        },

        flush(callback) {
            const reversedText = buffer.split('').reverse().join('');
            this.push(reversedText);
            callback();
        }
    });

    console.log('--- Enter text (type CLOSE to exit, or Ctrl+D/Ctrl+Z to finish input): ---');

    process.stdin.setEncoding('utf8');
    process.stdin.pipe(reverseStream).pipe(process.stdout);

    process.stdin.on('error', (err) => {
        console.error(`Operation failed: ${err.message}`);
        process.exit(1);
    });
};

await transform();