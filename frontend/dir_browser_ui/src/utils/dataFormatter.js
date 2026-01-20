import { FileIcon, defaultStyles } from "react-file-icon";
import { CiFolderOn } from "react-icons/ci";
const generateId = () => {
    return Math.random().toString(36).substring(2, 9); // 7 character
};

const iconComponent = (extension) => {
    return <FileIcon extension={extension} {...defaultStyles[extension]} />;
};

const getFileIcon = (fileName) => {
    const parts = fileName.split(".");
    if (parts.length > 1) {
        const extension = parts.pop().toLowerCase();
        return iconComponent(extension);
    } else {
        return iconComponent("default");
    }
};

const formatDirListResponse = (dirList) => {
    const formattedDirList = dirList.map((item) => {
        return {
            id: generateId(),
            name: item.name,
            path: item.path,
            isDirectory: item.isDirectory,
            icon: item.isDirectory ? (
                <CiFolderOn size={40} />
            ) : (
                getFileIcon(item.name)
            ),
            type: item.isDirectory ? "folder" : "file",
        };
    });
    return formattedDirList;
};

export { formatDirListResponse };
