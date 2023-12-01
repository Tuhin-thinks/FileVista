import { ViewCanvas } from '../../ViewPanel/ViewCanvas';
import '../../../styles/common.css';
import { useState } from 'react';

export const Home = () => {
    const [updateTime, setUpdateTime] = useState(null);

    return (
        <div className='view-panel-container'>
            <div className='path-container'>
                <span className='text-small'>Last updated: {updateTime}</span>
            </div>
            <ViewCanvas setUpdateTime={setUpdateTime} />
        </div>
    );
};
