import Loader from "./Loader";
import PhotoCard from "./PhotoCard";

export default function Gallery({ loading, photos, hasPhotos, onPhotoSelect, onUploadClick }) {
  if (loading) {
    return (
      <div className="gallery-grid" aria-label="Loading photos">
        {Array.from({ length: 10 }).map((_, index) => (
          <Loader key={index} variant="skeleton" />
        ))}
      </div>
    );
  }

  if (!hasPhotos) {
    return (
      <div className="empty-state">
        <div className="empty-illustration" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <h2>No photos uploaded yet</h2>
        <p>Your tagged image library will appear here once the first upload finishes.</p>
        <button className="primary-button" type="button" onClick={onUploadClick}>
          Upload photo
        </button>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="empty-state compact">
        <h2>No matching photos</h2>
        <p>Try a filename, object, scene, or label from your image collection.</p>
      </div>
    );
  }

  return (
    <div className="gallery-grid">
      {photos.map((photo, index) => (
        <PhotoCard
          key={photo.photoID}
          photo={photo}
          onClick={() => onPhotoSelect(index)}
        />
      ))}
    </div>
  );
}
