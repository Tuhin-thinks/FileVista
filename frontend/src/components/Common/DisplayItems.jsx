import { FileIcon } from "react-file-icon";
import { CiFolderOn } from "react-icons/ci";
import { getFileTypeStyle } from "./fileTypeColors.ts";

export const FileIconRenderer = ({ iconType, isDirectory, size = 40 }) => {
    if (isDirectory) {
        return <CiFolderOn size={size} />;
    }
    const styleProps = getFileTypeStyle(iconType);

    return (
        <div style={{ width: size }}>
            <FileIcon extension={iconType} {...styleProps} />
        </div>
    );
};
