const fs = require('fs');
const path = require('path');

const DEFAULT_START_DIR = '/storage/';

const getRelPath = (startDir, currentDir) => {
    if (currentDir === startDir) {
        return '';
    }
    return path.relative(startDir, currentDir);
};

const dir_list_get = (req, res) => {
    const relDirPath = req.params[0] || '';

    const absDirPath = path.join(DEFAULT_START_DIR, relDirPath);

    // check if the path exists and is a directory
    if (!fs.existsSync(absDirPath)) {
        res.status(404).json({
            message: `The path ${relDirPath} does not exist.`,
        });
        return;
    }
    if (!fs.statSync(absDirPath).isDirectory()) {
        res.status(400).json({
            message: `The path ${relDirPath} is not a directory.`,
        });
        return;
    }

    const dir = fs.readdirSync(absDirPath);

    const dirList = dir.map((item) => {
        const itemPath = path.join(absDirPath, item);
        const itemStat = fs.statSync(itemPath);
        return {
            name: item,
            path: getRelPath(DEFAULT_START_DIR, itemPath),
            isDirectory: itemStat.isDirectory(),
        };
    });
    // create the response object
    const response = {
        dirList,
        currentDir: getRelPath(DEFAULT_START_DIR, absDirPath),
        pathSeparator: path.sep,
    };
    return res.json(response);
};

exports.dir_list_get = dir_list_get;
