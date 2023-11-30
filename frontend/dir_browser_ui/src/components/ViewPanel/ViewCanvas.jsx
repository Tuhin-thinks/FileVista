// component to create a canvas to display grid and cells
// This component will be center aligned to the page.

import React, { useEffect, useLayoutEffect } from 'react';
import './styles/canvas-styles.css';
import { File } from './File';
import { Folder } from './Folder';
import useDirNavigator from '../../hooks/useDirNavigator';
import { formatDirListResponse } from '../../utils/dataFormatter';

export const ViewCanvas = (props) => {
    const { currentDir, setCurrentDir, getDirList, navigateToDir, dirList } =
        useDirNavigator();

    const [selectedDir, setSelectedDir] = React.useState(null);

    useEffect(() => {
        console.log('currentDir changed to: ', currentDir);
        navigateToDir(selectedDir);
    }, [selectedDir]);

    useLayoutEffect(() => {
        console.log('[useLayoutEffect] currentDir changed to: ', currentDir);
        getDirList(currentDir);
    }, []);

    return (
        <div className='view-canvas'>
            <div className='navigation-controls'>
                <div className='buttons-container'>
                    <button
                        className='navigation-button'
                        onClick={() => {
                            console.log('clicked on back button');
                            // navigateToDir('..');
                        }}
                    >
                        <div className='back-button-icon'></div>
                    </button>
                    <button
                        className='navigation-button'
                        onClick={() => {
                            console.log('clicked on refresh button');
                            // getDirList(currentDir);
                        }}
                    >
                        <div className='refresh-button-icon'></div>
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
                                    console.log('clicked on folder');
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
