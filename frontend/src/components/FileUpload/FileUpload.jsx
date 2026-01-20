import React, { useState, useRef } from "react";
import { Upload, X } from "react-feather";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ currentDir, onUploadComplete }) => {
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState(null); // null, 'success', 'error'
    const [statusMessage, setStatusMessage] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelect = async (event) => {
        const files = event.target.files;
        if (!files || files.length === 0) {
            return;
        }

        setUploading(true);
        setUploadStatus(null);
        setStatusMessage("");
        setUploadProgress(0);

        try {
            const formData = new FormData();
            
            // Append all selected files
            for (const file of files) {
                formData.append("files", file);
            }

            // Encode the path for URL safety
            const encodedPath = encodeURIComponent(currentDir || "");
            const uploadUrl = `/api/directories/${encodedPath}`;

            const response = await axios.post(uploadUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percentCompleted);
                },
            });

            // Success
            setUploadStatus("success");
            setStatusMessage(response.data.message || "Files uploaded successfully");
            setUploadedFiles(response.data.files || []);
            
            // Refresh the directory listing
            if (onUploadComplete) {
                await onUploadComplete();
            }

            // Auto-hide success message after 3 seconds
            setTimeout(() => {
                setUploadStatus(null);
                setUploadProgress(0);
                setUploadedFiles([]);
            }, 3000);

        } catch (error) {
            console.error("Upload error:", error);
            setUploadStatus("error");
            
            if (error.response?.data?.message) {
                setStatusMessage(error.response.data.message);
            } else if (error.response?.status === 400) {
                setStatusMessage("Upload failed: Invalid directory or permission denied");
            } else {
                setStatusMessage("Upload failed: " + (error.message || "Unknown error"));
            }
        } finally {
            setUploading(false);
            // Clear the file input
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleDismissStatus = () => {
        setUploadStatus(null);
        setUploadProgress(0);
        setUploadedFiles([]);
    };

    return (
        <div className="file-upload-container">
            <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                style={{ display: "none" }}
                aria-label="File upload input"
            />
            
            <button
                className={`navigation-button upload-button ${uploading ? "uploading" : ""}`}
                onClick={handleUploadClick}
                disabled={uploading}
                title="Upload files"
            >
                <Upload color="#39b1d6" />
            </button>

            {/* Upload Status Notification */}
            {uploadStatus && (
                <div className={`upload-notification ${uploadStatus}`}>
                    <div className="notification-content">
                        <span className="notification-message">{statusMessage}</span>
                        {uploadedFiles.length > 0 && (
                            <span className="uploaded-count">
                                ({uploadedFiles.length} file{uploadedFiles.length > 1 ? "s" : ""})
                            </span>
                        )}
                    </div>
                    <button
                        className="notification-close"
                        onClick={handleDismissStatus}
                        aria-label="Dismiss notification"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            {/* Upload Progress */}
            {uploading && (
                <div className="upload-progress-container">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${uploadProgress}%` }}
                        />
                    </div>
                    <span className="progress-text">{uploadProgress}%</span>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
