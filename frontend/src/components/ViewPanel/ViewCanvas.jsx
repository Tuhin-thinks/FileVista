// component to create a canvas to display grid and cells
// This component will be center aligned to the page.

import React, { useEffect, useState, useLayoutEffect, useMemo } from "react";
import "./styles/canvas-styles.css";
import "../../styles/list-view.css";
import "../../styles/grid-view.css";
import { File } from "./File";
import { Folder } from "./Folder";
import useDirNavigator from "../../hooks/useDirNavigator";
import { formatDirListResponse } from "../../utils/dataFormatter";
import axios from "axios";
import {
    ArrowLeftCircle,
    List,
    RefreshCcw,
    Download,
    Info,
} from "react-feather";
import FileUpload from "../FileUpload/FileUpload";

export const ViewCanvas = ({ setUpdateTime }) => {
    const {
        currentDir,
        pathSeparator,
        lastUpdateTime,
        getDirList,
        navigateToDir,
        dirList,
        navigateToParentDir,
    } = useDirNavigator();

    const [selectedDir, setSelectedDir] = useState(null);
    const [viewStyle, setViewStyle] = useState("grid");
    const [selectedItems, setSelectedItems] = useState([]);
    const [sizePreview, setSizePreview] = useState(null);
    const [previewError, setPreviewError] = useState("");
    const [sizeLoading, setSizeLoading] = useState(false);
    const [downloadLoading, setDownloadLoading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState({
        loaded: 0,
        total: null,
    });

    useEffect(() => {
        if (!selectedDir) return;
        navigateToDir(selectedDir);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDir]);

    useLayoutEffect(() => {
        getDirList(currentDir);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setUpdateTime(lastUpdateTime);
    }, [lastUpdateTime, setUpdateTime]);

    useEffect(() => {
        setSelectedItems([]);
        setSizePreview(null);
        setPreviewError("");
        setDownloadProgress({ loaded: 0, total: null });
    }, [currentDir, dirList]);

    const formattedDirItems = useMemo(
        () => formatDirListResponse(dirList),
        [dirList]
    );

    const isSafePath = (path) => {
        if (!path) return false;
        const trimmedPath = path.trim();
        return (
            trimmedPath.length > 0 &&
            !trimmedPath.includes("..") &&
            !trimmedPath.includes(":") &&
            !trimmedPath.startsWith("/") &&
            !trimmedPath.startsWith("\\")
        );
    };

    const isItemSelected = (path) =>
        selectedItems.some((item) => item.path === path);

    const resetSelectionState = () => {
        setSelectedItems([]);
        setSizePreview(null);
        setPreviewError("");
        setDownloadProgress({ loaded: 0, total: null });
    };

    const toggleItemSelection = (item) => {
        if (!isSafePath(item.path)) {
            setPreviewError(
                "Selection blocked: use relative paths without '..' or leading slashes."
            );
            return;
        }

        setPreviewError("");
        setSelectedItems((prev) => {
            const exists = prev.find((entry) => entry.path === item.path);
            const updated = exists
                ? prev.filter((entry) => entry.path !== item.path)
                : [...prev, item];
            setSizePreview(null);
            return updated;
        });
    };

    const formatBytes = (bytes) => {
        if (!Number.isFinite(bytes)) return "--";
        const units = ["B", "KB", "MB", "GB", "TB"];
        let size = bytes;
        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex += 1;
        }

        const shouldShowDecimal = size < 10 && unitIndex > 0;
        return `${size.toFixed(shouldShowDecimal ? 1 : 0)} ${units[unitIndex]}`;
    };

    const handlePreviewSize = async () => {
        if (!selectedItems.length) return;

        const payload = {
            items: selectedItems.map((item) => item.path),
        };

        if (payload.items.some((path) => !isSafePath(path))) {
            setPreviewError(
                "Preview blocked: ensure selected paths are relative and safe."
            );
            return;
        }

        setSizePreview(null);
        setPreviewError("");
        setSizeLoading(true);

        try {
            const response = await axios.post(
                "/api/directories/download/size",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setSizePreview(response.data);
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Unable to fetch size preview. Please try again.";
            setPreviewError(message);
        } finally {
            setSizeLoading(false);
        }
    };

    const extractFilename = (contentDisposition, fallbackName) => {
        if (!contentDisposition) return fallbackName;

        const encodedMatch = contentDisposition.match(
            /filename\*=UTF-8''([^;\n]*)/i
        );
        if (encodedMatch && encodedMatch[1]) {
            return decodeURIComponent(encodedMatch[1]);
        }

        const quotedMatch = contentDisposition.match(/filename="?([^";]+)"?/i);
        if (quotedMatch && quotedMatch[1]) {
            return quotedMatch[1];
        }

        return fallbackName;
    };

    const triggerDownload = (blob, fileName) => {
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = fileName;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
    };

    const handleDownload = async () => {
        if (!selectedItems.length) return;

        const items = selectedItems.map((item) => item.path);
        if (items.some((path) => !isSafePath(path))) {
            setPreviewError(
                "Download blocked: ensure selected paths are relative and safe."
            );
            return;
        }

        setPreviewError("");
        setDownloadLoading(true);
        setDownloadProgress({ loaded: 0, total: null });

        try {
            const response = await fetch("/api/directories/download", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ items }),
            });

            if (!response.ok) {
                let message = "Download failed. Please try again.";
                try {
                    const errorBody = await response.json();
                    if (errorBody?.message) {
                        message = errorBody.message;
                    }
                } catch (parseError) {
                    // ignore
                }
                setPreviewError(message);
                return;
            }

            const totalBytesHeader = response.headers.get("X-Download-Bytes");
            const totalBytes = totalBytesHeader
                ? parseInt(totalBytesHeader, 10)
                : null;
            const contentDisposition =
                response.headers.get("Content-Disposition") || "";
            const fallbackName =
                selectedItems.length === 1
                    ? selectedItems[0].name
                    : "download.zip";
            const fileName = extractFilename(contentDisposition, fallbackName);
            const contentType =
                response.headers.get("Content-Type") ||
                "application/octet-stream";

            if (response.body && Number.isFinite(totalBytes)) {
                const reader = response.body.getReader();
                const chunks = [];
                let received = 0;

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    if (value) {
                        chunks.push(value);
                        received += value.length;
                        setDownloadProgress({
                            loaded: received,
                            total: totalBytes,
                        });
                    }
                }

                const blob = new Blob(chunks, { type: contentType });
                triggerDownload(blob, fileName);
            } else {
                const blob = await response.blob();
                triggerDownload(blob, fileName);
            }
        } catch (error) {
            setPreviewError(
                error.response?.data?.message ||
                    "Download failed due to a network issue."
            );
        } finally {
            setDownloadLoading(false);
            setDownloadProgress({ loaded: 0, total: null });
        }
    };

    const downloadPercentage = downloadProgress.total
        ? Math.min(
              100,
              Math.round(
                  (downloadProgress.loaded / downloadProgress.total) * 100
              )
          )
        : 0;

    return (
        <div className="view-canvas">
            <div className="navigation-controls">
                <div className="buttons-container">
                    <button
                        className="navigation-button"
                        onClick={async () => {
                            await navigateToParentDir();
                            setSelectedDir(null);
                            resetSelectionState();
                        }}
                    >
                        <ArrowLeftCircle color="#39b1d6" />
                    </button>
                    <button
                        className="navigation-button"
                        onClick={() => {
                            getDirList(currentDir);
                            resetSelectionState();
                        }}
                    >
                        <RefreshCcw color="#39b1d6" />
                    </button>
                    <button
                        className="navigation-button"
                        onClick={() => {
                            setViewStyle(
                                viewStyle === "grid" ? "list" : "grid"
                            );
                        }}
                    >
                        <List color="#39b1d6" />
                    </button>
                    <FileUpload
                        currentDir={currentDir}
                        onUploadComplete={() => getDirList(currentDir)}
                    />
                </div>
                <div className="view-canvas-header">
                    <h5>{`${currentDir}` || pathSeparator}</h5>
                </div>
                <div className="space-filler"></div>
            </div>

            <div className="selection-toolbar">
                <div className="selection-meta">
                    <span className="pill">Selected: {selectedItems.length}</span>
                    <span className="pill muted">View: {viewStyle}</span>
                    {sizePreview ? (
                        <span className="pill success">
                            Total size: {formatBytes(sizePreview.totalSize)}
                        </span>
                    ) : null}
                    {downloadProgress.total ? (
                        <span className="pill progress">
                            Downloading {downloadPercentage}% ({formatBytes(
                                downloadProgress.loaded
                            )}
                            {downloadProgress.total
                                ? ` / ${formatBytes(downloadProgress.total)}`
                                : ""}
                            )
                        </span>
                    ) : null}
                </div>
                <div className="selection-actions">
                    <button
                        className="action-button secondary"
                        onClick={handlePreviewSize}
                        disabled={!selectedItems.length || sizeLoading}
                    >
                        <Info size={14} /> {" "}
                        {sizeLoading ? "Checking..." : "Preview size"}
                    </button>
                    <button
                        className="action-button primary"
                        onClick={handleDownload}
                        disabled={!selectedItems.length || downloadLoading}
                    >
                        <Download size={14} /> {" "}
                        {downloadLoading ? "Downloading..." : "Download"}
                    </button>
                    <button
                        className="action-button ghost"
                        onClick={resetSelectionState}
                        disabled={!selectedItems.length && !sizePreview}
                    >
                        Clear
                    </button>
                </div>
            </div>

            {previewError ? (
                <div className="error-banner" role="alert">
                    <span>{previewError}</span>
                    <button
                        className="action-button ghost"
                        onClick={() => setPreviewError("")}
                    >
                        Dismiss
                    </button>
                </div>
            ) : null}

            {sizePreview ? (
                <div className="size-preview-panel">
                    <div className="size-preview-header">
                        <span>
                            Preview total: {formatBytes(sizePreview.totalSize)}
                        </span>
                        <span className="size-preview-caption">
                            Per-item sizes from /download/size
                        </span>
                    </div>
                    <div className="size-preview-items">
                        {(sizePreview.items || []).map((item) => (
                            <div className="size-row" key={item.path}>
                                <div className="size-col path">{item.path}</div>
                                <div className="size-col type">
                                    {item.isDirectory ? "directory" : "file"}
                                </div>
                                <div className="size-col bytes">
                                    {formatBytes(item.size)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}

            <div
                className={
                    viewStyle === "grid" ? "grid-container" : "list-container"
                }
            >
                <div className={`items-container ${viewStyle}`}>
                    {formattedDirItems.map((dirItem) => {
                        const commonProps = {
                            key: dirItem.path || dirItem.id,
                            name: dirItem.name,
                            icon: dirItem.icon,
                            type: dirItem.type,
                            viewStyle,
                            isSelected: isItemSelected(dirItem.path),
                            onToggleSelect: () => toggleItemSelection(dirItem),
                        };

                        if (dirItem.type === "folder") {
                            return (
                                <Folder
                                    {...commonProps}
                                    onNavigate={() => {
                                        setSelectedDir(dirItem.name);
                                    }}
                                />
                            );
                        }

                        return <File {...commonProps} />;
                    })}
                </div>
            </div>
        </div>
    );
};

