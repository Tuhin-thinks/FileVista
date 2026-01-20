// custom hook to navigate through directories, by making request to the backend
import { useState } from "react";
import axios from "axios";

const useDirNavigator = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [dirFetchResponse, setDirFetchResponse] = useState({
        status: null,
        message: "",
        dirList: [],
        currentDir: "",
        pathSeparator: "\\", // using default path separator as in windows
        lastUpdateTime: null,
    });

    const getDirList = async (path) => {
        try {
            const response = await axios.get("/api/directories/" + path);
            const responseBody = response.data;

            if (response.status !== 200) {
                setErrorMessage(responseBody.message);
            }

            setDirFetchResponse({
                status: response.status,
                message: responseBody.message,
                dirList: responseBody.dirList,
                currentDir: responseBody.currentDir,
                pathSeparator: responseBody.pathSeparator,
                lastUpdateTime: new Date().toISOString(),
            });
        } catch (error) {
            console.error(
                `Error while fetching directory items [${path}]:`,
                error.message
            );
            setErrorMessage(error.message);
        }
    };

    const navigateToDir = async (dirName) => {
        if (!dirName) {
            return;
        }
        const newPath =
            dirFetchResponse.currentDir +
            dirFetchResponse.pathSeparator +
            dirName;
        await getDirList(newPath);
    };

    const navigateToParentDir = async () => {
        const newPath = dirFetchResponse.currentDir
            .split(dirFetchResponse.pathSeparator)
            .slice(0, -1)
            .join(dirFetchResponse.pathSeparator);
        await getDirList(newPath);
    };

    // return the directory list, current directory path, error message and the getDirList function
    return {
        errorMessage,
        getDirList,
        navigateToDir,
        navigateToParentDir,
        ...dirFetchResponse,
    };
};

export default useDirNavigator;
