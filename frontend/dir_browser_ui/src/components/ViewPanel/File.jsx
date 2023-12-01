// component to render a file icon and text label
import "./styles/canvas-styles.css";

export const File = ({ name, icon }) => {
    return (
        <div className="file-container">
            <div className={"file-icon " + icon}></div>
            <p className="file-name">{name}</p>
        </div>
    );
};
