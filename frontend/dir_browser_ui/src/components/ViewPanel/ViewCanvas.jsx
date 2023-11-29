// component to create a canvas to display grid and cells
// This component will be center aligned to the page.

import React from 'react';
import './styles/canvas-styles.css';
import { File } from './File';
import { Folder } from './Folder';

export const ViewCanvas = (props) => {
    // add 3 files in the view panel
    const NFiles = 100;
    const files = Array.from(Array(NFiles).keys()).map((i) => {
        const randomChoice = Math.floor(Math.random() * 100);
        if (randomChoice % 11 === 0) {
            return {
                id: i,
                name: 'file' + i,
                icon: 'folder',
                type: 'folder',
            };
        } else if (randomChoice % 19 === 0) {
            return {
                id: i,
                name: 'zip-file' + i + '.zip',
                icon: 'zip',
                type: 'zip-folder',
            };
        } else if (randomChoice % 13 === 0) {
            return {
                id: i,
                name: 'file' + i,
                icon: 'code-file',
                type: 'file',
            };
        } else {
            return {
                id: i,
                name: 'file' + i + '.py',
                icon: 'file',
                type: 'file',
            };
        }
    });

    return (
        <div className='view-canvas'>
            <div
                id='view-canvas'
                className='grid-container'
                width='500'
                height='500'
            >
                {files.map((dirItem) => {
                    if (dirItem.type === 'folder') {
                        return (
                            <Folder
                                key={dirItem.id}
                                name={dirItem.name}
                                icon={dirItem.icon}
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
