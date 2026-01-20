// component to render a file icon and text label
import "./styles/canvas-styles.css";
import { FileIconRenderer } from "../Common/DisplayItems";

export const File = ({
    name,
    icon,
    viewStyle,
    type,
    isSelected,
    onToggleSelect,
    onNavigate,
}) => {
    const handleToggle = (event) => {
        event.stopPropagation();
        if (onToggleSelect) {
            onToggleSelect();
        }
    };

    return (
        <div
            className={`file-container ${viewStyle} ${isSelected ? "selected" : ""}`}
            onClick={onNavigate}
        >
            <div className="item icon-cell">
                {onToggleSelect ? (
                    <label
                        className="selection-checkbox"
                        aria-label={`Select ${name}`}
                    >
                        <input
                            type="checkbox"
                            checked={!!isSelected}
                            onChange={handleToggle}
                            onClick={(event) => event.stopPropagation()}
                        />
                        <span className="selection-indicator"></span>
                    </label>
                ) : null}
                <FileIconRenderer
                    iconType={icon.props.extension || "default"}
                    isDirectory={false}
                    size={viewStyle === "grid" ? 60 : 40}
                />
            </div>
            <div className="item name-cell">
                <p className="file-name p-text">{name}</p>
            </div>
            {viewStyle === "list" ? (
                <div className="item type-cell">
                    <p className="file-type p-text">{type}</p>
                </div>
            ) : null}
        </div>
    );
};

