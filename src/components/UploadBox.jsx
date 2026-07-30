import { useRef, useState } from "react";
import { getUploadUrl, uploadToS3 } from "../api";

export default function UploadBox({ disabled = false, onUploadFinished, onUploadFailed }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const isUploading = status === "requesting" || status === "uploading" || status === "processing";

  async function upload(file) {
    if (!file || isUploading) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      const errorMessage = "Please choose an image file.";
      setStatus("error");
      setMessage(errorMessage);
      onUploadFailed?.(errorMessage);
      return;
    }

    try {
      setProgress(0);
      setMessage("");
      setStatus("requesting");

      const { uploadUrl } = await getUploadUrl(file.name);

      setStatus("uploading");
      await uploadToS3(uploadUrl, file, setProgress);

      setStatus("processing");
      setMessage("Upload complete. Reading labels...");

      window.setTimeout(() => {
        setStatus("done");
        setProgress(100);
        setMessage("Photo added to your library.");
        onUploadFinished?.();
      }, 1800);
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
      onUploadFailed?.(error.message);
    } finally {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);

    if (disabled || isUploading) {
      return;
    }

    upload(event.dataTransfer.files?.[0]);
  }

  function handleBrowse(event) {
    upload(event.target.files?.[0]);
  }

  return (
    <section
      className={`upload-box${isDragging ? " is-dragging" : ""}`}
      onDragEnter={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      aria-label="Upload photo"
    >
      <div className="upload-copy">
        <h2>Upload a photo</h2>
        <p>Drop an image here, or browse from your computer.</p>
      </div>

      <input
        ref={inputRef}
        id="photo-upload-input"
        className="file-input"
        type="file"
        accept="image/*"
        onChange={handleBrowse}
        disabled={disabled || isUploading}
      />

      <button
        className="primary-button"
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={disabled || isUploading}
      >
        {isUploading ? "Uploading" : "Choose image"}
      </button>

      {isUploading && (
        <div className="progress-wrap" aria-live="polite">
          <div className="progress-track">
            <progress value={progress} max="100" aria-label="Upload progress" />
          </div>
          <p>{status === "processing" ? message : `${progress}% uploaded`}</p>
        </div>
      )}

      {(status === "done" || status === "error") && (
        <p className={`upload-status ${status}`}>{message}</p>
      )}
    </section>
  );
}
