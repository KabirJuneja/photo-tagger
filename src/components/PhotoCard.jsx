export default function PhotoCard({ photo, onClick }) {
  return (
    <button
      className="photo-card"
      type="button"
      onClick={onClick}
      aria-label={`Open ${photo.filename}`}
    >
      <img
        src={photo.imageUrl}
        alt={photo.filename}
        className="gallery-image"
        loading="lazy"
      />
    </button>
  );
}
