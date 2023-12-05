// component to create a canvas to display grid and cells
// This component will be center aligned to the page.

import React, { useEffect, useState, useLayoutEffect } from "react";
import "./styles/canvas-styles.css";
import "../../styles/list-view.css";
import "../../styles/grid-view.css";
import { File } from "./File";
import { Folder } from "./Folder";
import useDirNavigator from "../../hooks/useDirNavigator";
import { formatDirListResponse } from "../../utils/dataFormatter";
import { ArrowLeftCircle, List, RefreshCcw } from "react-feather";

export const ViewCanvas = ({ setUpdateTime }) => {
    const {
        currentDir,
        pathSeparator,
        lastUpdateTime,
        getDirList,
        navigateToDir,
        dirList,
        navigateToParentDir,
    } = useDirNavigator();

    const [selectedDir, setSelectedDir] = useState(null);
    const [viewStyle, setViewStyle] = useState("grid");

    useEffect(() => {
        if (!selectedDir) return;
        navigateToDir(selectedDir);
        setUpdateTime(lastUpdateTime);
    }, [selectedDir]);

    useLayoutEffect(() => {
        getDirList(currentDir);
        setUpdateTime(lastUpdateTime);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="view-canvas">
            <div className="navigation-controls">
                <div className="buttons-container">
                    <button
                        className="navigation-button"
                        onClick={async () => {
                            await navigateToParentDir();
                            setSelectedDir(null);
                        }}
                    >
                        <ArrowLeftCircle color="#39b1d6" />
                    </button>
                    <button
                        className="navigation-button"
                        onClick={() => {
                            getDirList(currentDir);
                        }}
                    >
                        <RefreshCcw color="#39b1d6" />
                    </button>
                    <button
                        className="navigation-button"
                        onClick={() => {
                            setViewStyle(
                                viewStyle === "grid" ? "list" : "grid"
                            );
                        }}
                    >
                        <List color="#39b1d6" />
                    </button>
                </div>
                <div className="view-canvas-header">
                    <h5>{`${currentDir}` || pathSeparator}</h5>
                </div>
                <div className="space-filler"></div>
            </div>
            <div
                className={
                    viewStyle === "grid" ? "grid-container" : "list-container"
                }
            >
                <div className={`items-container ${viewStyle}`}>
                    {formatDirListResponse(dirList).map((dirItem) => {
                        if (dirItem.type === "folder") {
                            return (
                                <Folder
                                    key={dirItem.id}
                                    name={dirItem.name}
                                    icon={dirItem.icon}
                                    onClick={() => {
                                        setSelectedDir(dirItem.name);
                                    }}
                                    type={dirItem.type}
                                    viewStyle={viewStyle}
                                />
                            );
                        } else if (dirItem.type === "zip-folder") {
                            return (
                                <Folder
                                    key={dirItem.id}
                                    name={dirItem.name}
                                    icon={dirItem.icon}
                                    type={dirItem.type}
                                    viewStyle={viewStyle}
                                />
                            );
                        } else if (dirItem.type === "file") {
                            return (
                                <File
                                    key={dirItem.id}
                                    name={dirItem.name}
                                    icon={dirItem.icon}
                                    type={dirItem.type}
                                    viewStyle={viewStyle}
                                />
                            );
                        } else {
                            return (
                                <File
                                    key={dirItem.id}
                                    name={dirItem.name}
                                    icon={dirItem.icon}
                                    type={dirItem.type}
                                    viewStyle={viewStyle}
                                />
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

