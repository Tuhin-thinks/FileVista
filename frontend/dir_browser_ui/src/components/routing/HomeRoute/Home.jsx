import { ViewCanvas } from '../../ViewPanel/ViewCanvas';
import '../../../styles/common.css';

export const Home = () => {
    return (
        <div className='view-panel-container'>
            <div className='path-container'>
                <p className='path'>
                    /storage/backup/.temp/654b36e1416cad156cfdef8d/R_C_P/
                </p>
            </div>
            <ViewCanvas />
        </div>
    );
};
