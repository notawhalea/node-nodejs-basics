import { access, cp } from 'node:fs/promises';
import { constants } from 'node:fs';

const sourceFolder = './src/fs/files';
const destinationFolder = './src/fs/files_copy';

const checkFile = async () => {
    const isDestinationFolderExists = await asyncExists(destinationFolder);
    const isSourceFolderExists = await asyncExists(sourceFolder);

    if (isDestinationFolderExists || !isSourceFolderExists) {
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

const copy = async () => {
    await checkFile();
    await cp(sourceFolder, destinationFolder, {
        recursive: true,
    });
}

await copy();