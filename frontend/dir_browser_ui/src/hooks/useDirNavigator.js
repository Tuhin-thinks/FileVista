// custom hook to navigate through directories, by making request to the backend
import { useState } from 'react';
import axios from 'axios';

const useDirNavigator = () => {
    // state for the directory list
    const [dirList, setDirList] = useState([]);
    const [currentDir, setCurrentDir] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const getDirList = async (path) => {
        try {
            const response = await axios.get('/api/directories/' + path);
            const responseBody = response.data;
            if (response.status !== 200) {
                throw new Error(responseBody.message);
            }
            setDirList(responseBody.dirList);
            setCurrentDir(responseBody.currentDir);
            setErrorMessage('');
        } catch (error) {
            console.error(
                `Error while fetching directory items [${path}]:`,
                error
            );
            setErrorMessage(error.message);
        }
    };

    const navigateToDir = async (dirName) => {
        if (!dirName) {
            return;
        }
        const newPath = currentDir + '/' + dirName;
        await getDirList(newPath);
    };

    const navigateToParentDir = async () => {
        const newPath = currentDir.split('/').slice(0, -1).join('/');
        await getDirList(newPath);
    };

    // return the directory list, current directory path, error message and the getDirList function
    return {
        dirList,
        currentDir,
        errorMessage,
        getDirList,
        navigateToDir,
        navigateToParentDir,
    };
};

export default useDirNavigator;
