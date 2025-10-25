import { access, rename as renameFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFile = path.join(__dirname, 'files', 'wrongFilename.txt');
const destinationFile = path.join(__dirname, 'files', 'properFilename.md');

const checkFile = async () => {
    const isDestinationFileExists = await asyncExists(destinationFile);
    const isSourceFileExists = await asyncExists(sourceFile);

    if (isDestinationFileExists || !isSourceFileExists) {
        throw new Error('FS operation failed')
    }
};

const asyncExists = async (path) => {
    try {
        await access(path, constants.F_OK);
        return true;
    } catch (err) {
        return false;
    }
};

const rename = async () => {
    await checkFile();
    await renameFile(sourceFile, destinationFile)
};

await rename();
