const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const { getHomePath } = require("../../utils/pathHelper");
const multer = require("multer");

const DEFAULT_START_DIR = path.resolve(getHomePath());
const BASE_WITH_TRAILING = DEFAULT_START_DIR.endsWith(path.sep)
    ? DEFAULT_START_DIR
    : `${DEFAULT_START_DIR}${path.sep}`;

const normalizeRelPath = (relPath = "") => relPath.replace(/^\\+|^\/+/, "");

const resolveWithinBase = (relPath = "") => {
    const normalized = normalizeRelPath(relPath);
    const absPath = path.resolve(DEFAULT_START_DIR, normalized);
    if (
        absPath !== DEFAULT_START_DIR &&
        !absPath.startsWith(BASE_WITH_TRAILING)
    ) {
        throw new Error("Path escapes base directory");
    }
    return { relPath: normalized, absPath };
};

const getRelPath = (startDir, currentDir) => {
    if (currentDir === startDir) {
        return "";
    }
    return path.relative(startDir, currentDir);
};

const getDirectoryStats = (dirPath) => {
    try {
        // check if directory has read access
        fs.accessSync(dirPath, fs.constants.R_OK);
        return [true, fs.statSync(dirPath).isDirectory()];
    } catch (err) {
        if (err.code === "ENOENT") {
            return [false, "Inaccessible directory"];
        } else if (err.code === "EPERM") {
            return [false, "Permission denied"];
        } else {
            return [false, "Unknown error: " + err.code + " " + err.message];
        }
    }
};

const dir_list_get = (req, res) => {
    const relDirPath = req.params[0] || "";

    const { absPath: absDirPath } = resolveWithinBase(relDirPath);

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

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const relDirPath = req.params[0] || "";
        const { absPath: absDirPath } = resolveWithinBase(relDirPath);
        
        // Ensure directory exists
        if (!fs.existsSync(absDirPath)) {
            return cb(new Error("Directory does not exist"));
        }
        
        cb(null, absDirPath);
    },
    filename: (req, file, cb) => {
        // Preserve original filename
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const dir_upload_post = (req, res) => {
    const relDirPath = req.params[0] || "";
    const { absPath: absDirPath } = resolveWithinBase(relDirPath);

    // Verify directory exists and is accessible
    const [isDir, error] = getDirectoryStats(absDirPath);
    if (!isDir) {
        return res.status(400).json({ message: error });
    }

    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
    }

    // Get uploaded file information
    const uploadedFiles = req.files.map(file => ({
        name: file.filename,
        path: getRelPath(DEFAULT_START_DIR, file.path),
        size: file.size
    }));

    return res.json({
        message: "Files uploaded successfully",
        files: uploadedFiles,
        count: uploadedFiles.length
    });
};

const getEntrySize = (absPath) => {
    const stats = fs.statSync(absPath);
    if (stats.isDirectory()) {
        const entries = fs.readdirSync(absPath);
        return entries.reduce((acc, entry) => {
            const childPath = path.join(absPath, entry);
            return acc + getEntrySize(childPath);
        }, 0);
    }
    return stats.size;
};

const buildSelection = (items) => {
    if (!Array.isArray(items) || items.length === 0) {
        throw new Error("Provide at least one item to download");
    }

    return items.map((relPath) => {
        if (typeof relPath !== "string") {
            throw new Error("Each item must be a string path");
        }
        const trimmed = relPath.trim();
        const { relPath: normalized, absPath } = resolveWithinBase(trimmed);
        if (!fs.existsSync(absPath)) {
            throw new Error(`Path does not exist: ${normalized}`);
        }
        const stats = fs.statSync(absPath);
        return {
            relPath: normalized,
            absPath,
            isDirectory: stats.isDirectory(),
            size: getEntrySize(absPath),
        };
    });
};

const dir_download_size_post = (req, res) => {
    try {
        const selection = buildSelection(req.body?.items);
        const totalSize = selection.reduce((acc, item) => acc + item.size, 0);
        return res.json({
            totalSize,
            items: selection.map((item) => ({
                path: item.relPath,
                size: item.size,
                isDirectory: item.isDirectory,
            })),
        });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const dir_download_post = (req, res) => {
    let selection;
    try {
        selection = buildSelection(req.body?.items);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }

    const totalSize = selection.reduce((acc, item) => acc + item.size, 0);
    res.setHeader("X-Download-Bytes", totalSize);

    if (selection.length === 1 && !selection[0].isDirectory) {
        return res.download(selection[0].absPath, path.basename(selection[0].relPath));
    }

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", "attachment; filename=download.zip");

    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.on("error", (err) => {
        if (!res.headersSent) {
            res.status(500).json({ message: err.message });
        } else {
            res.end();
        }
    });

    archive.pipe(res);

    selection.forEach((item) => {
        const archiveName = item.relPath || path.basename(item.absPath);
        if (item.isDirectory) {
            archive.directory(item.absPath, archiveName);
        } else {
            archive.file(item.absPath, { name: archiveName });
        }
    });

    archive.finalize();
};

exports.dir_list_get = dir_list_get;
exports.dir_upload_post = dir_upload_post;
exports.upload = upload;
exports.dir_download_post = dir_download_post;
exports.dir_download_size_post = dir_download_size_post;
