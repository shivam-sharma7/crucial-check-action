import core from'@actions/core'
import github from '@actions/github'
import fs from 'fs'

async function checkFileExists(filePath) {
    return fs.promises.access(filePath)
    .then(() => {
        core.info(`File ${filePath} exists`);
        return true;
    })
    .catch(() => {
        core.setFailed(`File ${filePath} is mandatory`);
        return false;
    });
}

(
    async () => {
        try {
            checkFileExists("LICENSE");
            checkFileExists("README.md");
            checkFileExists("CONTRIBUTING.md");

        } catch (error) {
            core.setFailed(error.message);
        }
    }

)();