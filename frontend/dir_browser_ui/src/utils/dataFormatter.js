const generateId = () => {
    return Math.random().toString(36).substring(2, 9); // 7 character
};

const getFileIcon = (fileName) => {
    const fileExtension = fileName.split('.').pop();
    const knownFileTypes = {
        py: 'code-file',
        js: 'code-file',
        jsx: 'code-file',
        html: 'code-file',
        css: 'code-file',
        txt: 'text-file',
        mst: 'text-file',
        md: 'text-file',
    };
    return knownFileTypes[fileExtension] || 'file';
};

const formatDirListResponse = (dirList) => {
    console.log('formatDirListResponse', dirList);
    const formattedDirList = dirList.map((item) => {
        return {
            id: generateId(),
            name: item.name,
            path: item.path,
            icon: item.isDirectory ? 'folder' : getFileIcon(item.name),
            type: item.isDirectory ? 'folder' : 'file',
        };
    });
    return formattedDirList;
};

export { formatDirListResponse };
