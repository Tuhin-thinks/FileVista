// component to create a canvas to display grid and cells
// This component will be center aligned to the page.

import React, { useEffect, useLayoutEffect } from 'react';
import './styles/canvas-styles.css';
import { File } from './File';
import { Folder } from './Folder';
import useDirNavigator from '../../hooks/useDirNavigator';
import { formatDirListResponse } from '../../utils/dataFormatter';
import { ArrowLeftCircle, RefreshCcw } from 'react-feather';

export const ViewCanvas = ({ setUpdateTime }) => {
    const {
        currentDir,
        getDirList,
        navigateToDir,
        dirList,
        navigateToParentDir,
        getAdditionalProperties,
    } = useDirNavigator();

    const [selectedDir, setSelectedDir] = React.useState(null);

    useEffect(() => {
        if (!selectedDir) return;
        navigateToDir(selectedDir);
    }, [selectedDir]);

    useLayoutEffect(() => {
        getDirList(currentDir);
        const extraProps = getAdditionalProperties();
        console.log(extraProps);
        setUpdateTime(extraProps.lastUpdateTime);
    }, []);

    return (
        <div className='view-canvas'>
            <div className='navigation-controls'>
                <div className='buttons-container'>
                    <button
                        className='navigation-button'
                        onClick={async () => {
                            await navigateToParentDir();
                            setSelectedDir(null);
                        }}
                    >
                        <ArrowLeftCircle color='#39b1d6' />
                    </button>
                    <button
                        className='navigation-button'
                        onClick={() => {
                            getDirList(currentDir);
                        }}
                    >
                        <RefreshCcw color='#39b1d6' />
                    </button>
                </div>
                <div className='view-canvas-header'>
                    <h5>{`/${currentDir}` || '/'}</h5>
                </div>
                <div className='space-filler'></div>
            </div>
            <div
                id='view-canvas'
                className='grid-container'
                width='500'
                height='500'
            >
                {formatDirListResponse(dirList).map((dirItem) => {
                    if (dirItem.type === 'folder') {
                        return (
                            <Folder
                                key={dirItem.id}
                                name={dirItem.name}
                                icon={dirItem.icon}
                                onClick={() => {
                                    setSelectedDir(dirItem.name);
                                }}
                            />
                        );
                    } else if (dirItem.type === 'zip-folder') {
                        return (
                            <Folder
                                key={dirItem.id}
                                name={dirItem.name}
                                icon={dirItem.icon}
                            />
                        );
                    } else if (dirItem.type === 'file') {
                        return (
                            <File
                                key={dirItem.id}
                                name={dirItem.name}
                                icon={dirItem.icon}
                            />
                        );
                    } else {
                        return (
                            <File
                                key={dirItem.id}
                                name={dirItem.name}
                                icon={dirItem.icon}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
};
