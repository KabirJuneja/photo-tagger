import { useEffect } from "react";

function formatDate(value) {
  if (!value) {
    return "Unknown upload date";
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function PhotoModal({
  photo,
  photos,
  selectedIndex,
  onClose,
  onPrevious,
  onNext,
  onDelete,
}) {
  const isOpen = Boolean(photo);
  const canGoPrevious = selectedIndex > 0;
  const canGoNext = selectedIndex !== null && selectedIndex < photos.length - 1;

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft" && canGoPrevious) {
        onPrevious();
      }

      if (event.key === "ArrowRight" && canGoNext) {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canGoNext, canGoPrevious, isOpen, onClose, onNext, onPrevious]);

  if (!isOpen) {
    return null;
  }

  function handleDownload() {
    const anchor = document.createElement("a");
    anchor.href = photo.imageUrl;
    anchor.download = photo.filename || "photo";
    anchor.rel = "noopener";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }

  return (
    <div className="modal-overlay" onMouseDown={onClose} role="presentation">
      <section
        className="photo-modal"
        role="dialog"
        aria-modal="true"
        aria-label={photo.filename}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-stage">
          <button
            className="icon-button close-button"
            type="button"
            onClick={onClose}
            aria-label="Close photo viewer"
          >
            <span aria-hidden="true">x</span>
          </button>

          {canGoPrevious && (
            <button
              className="nav-button previous-button"
              type="button"
              onClick={onPrevious}
              aria-label="Previous photo"
            >
            </button>
          )}

          <img src={photo.imageUrl} alt={photo.filename} className="modal-image" />

          {canGoNext && (
            <button
              className="nav-button next-button"
              type="button"
              onClick={onNext}
              aria-label="Next photo"
            >
            </button>
          )}
        </div>

        <aside className="photo-info">
          <div className="info-header">
            <p className="image-counter">
              {selectedIndex + 1} of {photos.length}
            </p>
            <h2>{photo.filename}</h2>
          </div>

          <dl className="meta-list">
            <div>
              <dt>Uploaded</dt>
              <dd>{formatDate(photo.timestamp)}</dd>
            </div>
            <div>
              <dt>Photo ID</dt>
              <dd>{photo.photoID}</dd>
            </div>
          </dl>

          <div className="label-group" aria-label="Photo labels">
            {photo.labels.map((label) => (
              <span className="label-chip" key={label}>
                {label}
              </span>
            ))}
          </div>

          <div className="modal-actions">
            <button className="secondary-button" type="button" onClick={handleDownload}>
              Download
            </button>
            <button className="danger-button" type="button" onClick={() => onDelete(photo)}>
              Delete
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
}
