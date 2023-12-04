// component to render a file icon and text label
import "./styles/canvas-styles.css";

export const File = ({ name, icon, viewStyle, type }) => {
    return (
        <div className={`file-container ${viewStyle}`}>
            <div className="item">
                <div className={`file-icon ${icon}`}></div>
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

