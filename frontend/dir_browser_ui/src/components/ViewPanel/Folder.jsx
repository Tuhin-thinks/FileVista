// component to render a file icon and text label
import "./styles/canvas-styles.css";

export const Folder = ({ name, icon, onClick, viewStyle, type }) => {
    return (
        <div className={`file-container ${viewStyle}`} onClick={onClick}>
            <div className="item">
                <div className={"folder-icon " + icon}></div>
            </div>
            <div className="item">
                <p className="file-name p-text">{name}</p>
            </div>
            {viewStyle === "list" ? (
                <div className="item">
                    <p className="file-type p-text">{type}</p>
                </div>
            ) : null}
        </div>
    );
};

