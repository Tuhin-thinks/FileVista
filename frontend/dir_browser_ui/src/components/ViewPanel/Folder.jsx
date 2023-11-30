// component to render a file icon and text label
import './styles/canvas-styles.css';

export const Folder = ({ name, icon, onClick }) => {
    return (
        <div className='file-container' onClick={onClick}>
            <div className={'folder-icon ' + icon}></div>
            <p className='file-name'>{name}</p>
        </div>
    );
};
