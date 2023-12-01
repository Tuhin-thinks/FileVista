const fs = require("fs");
const path = require("path");
const { getHomePath } = require("../../utils/pathHelper");

const DEFAULT_START_DIR = getHomePath();

const getRelPath = (startDir, currentDir) => {
    if (currentDir === startDir) {
        return "";
    }
    return path.relative(startDir, currentDir);
};

const getDirectoryStats = (dirPath) => {
    try {
        return [true, fs.statSync(dirPath).isDirectory()];
    } catch (err) {
        if (err.code === "ENOENT") {
            return [false, "Inaccessible directory"];
        } else if (err.code === "EPERM") {
            return [false, "Permission denied"];
        } else {
            return [false, "Unknown error"];
        }
    }
};

const dir_list_get = (req, res) => {
    const relDirPath = req.params[0] || "";

    const absDirPath = path.join(DEFAULT_START_DIR, relDirPath);

    // do trial and error to check if directory is accessible and exists
    const [isDir, error] = getDirectoryStats(absDirPath);
    if (!isDir) {
        return res.status(400).json({ message: error });
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
