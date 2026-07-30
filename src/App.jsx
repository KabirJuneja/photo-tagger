import { useCallback, useEffect, useMemo, useState } from "react";
import { deletePhoto, getPhotos } from "./api";
import ConfirmDialog from "./components/ConfirmDialog";
import Gallery from "./components/Gallery";
import PhotoModal from "./components/PhotoModal";
import Toast from "./components/Toast";
import UploadBox from "./components/UploadBox";
import "./App.css";

function sortPhotosByNewest(photos) {
  return [...photos].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [toast, setToast] = useState(null);
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const showToast = useCallback((type, message) => {
    setToast({ id: Date.now(), type, message });
  }, []);

  const loadPhotos = useCallback(async ({ silent = false } = {}) => {
    if (!silent) {
      setLoading(true);
    }

    try {
      const data = await getPhotos();
      setPhotos(sortPhotosByNewest(Array.isArray(data) ? data : []));
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    let isMounted = true;

    async function loadInitialPhotos() {
      try {
        const data = await getPhotos();

        if (isMounted) {
          setPhotos(sortPhotosByNewest(Array.isArray(data) ? data : []));
        }
      } catch (error) {
        if (isMounted) {
          showToast("error", error.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadInitialPhotos();

    return () => {
      isMounted = false;
    };
  }, [showToast]);

  const filteredPhotos = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return photos;
    }

    return photos.filter((photo) => {
      const filename = photo.filename?.toLowerCase() || "";
      const labels = Array.isArray(photo.labels) ? photo.labels : [];

      return (
        filename.includes(query) ||
        labels.some((label) => label.toLowerCase().includes(query))
      );
    });
  }, [photos, search]);

  const selectedPhoto = selectedIndex === null ? null : filteredPhotos[selectedIndex];

  const handleUploadFinished = useCallback(async () => {
    showToast("success", "Photo uploaded and queued for tagging");
    await loadPhotos({ silent: true });
  }, [loadPhotos, showToast]);

  const handleUploadFailed = useCallback((message) => {
    showToast("error", message);
  }, [showToast]);

  const handleRequestDelete = useCallback((photo) => {
    setPhotoToDelete(photo);
  }, []);

  const handleDeleteConfirmed = useCallback(async () => {
    if (!photoToDelete) {
      return;
    }

    const deletedPhotoID = photoToDelete.photoID;

    setIsDeleting(true);

    try {
      await deletePhoto(deletedPhotoID);
      setPhotos((currentPhotos) =>
        currentPhotos.filter((photo) => photo.photoID !== deletedPhotoID)
      );
      setSelectedIndex(null);
      setPhotoToDelete(null);
      showToast("success", "Photo deleted");
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setIsDeleting(false);
    }
  }, [photoToDelete, showToast]);

  const handlePrevious = useCallback(() => {
    setSelectedIndex((currentIndex) => Math.max((currentIndex ?? 0) - 1, 0));
  }, []);

  const handleNext = useCallback(() => {
    setSelectedIndex((currentIndex) =>
      Math.min((currentIndex ?? 0) + 1, filteredPhotos.length - 1)
    );
  }, [filteredPhotos.length]);

  return (
    <main className="app-shell">
      <header className="top-nav">
        <div>
          <p className="eyebrow">AWS Photo Auto Tagger</p>
          <h1>Photos, organized by what is in them.</h1>
          <p className="subtitle">
            Upload images, let Rekognition label them, then search your collection instantly.
          </p>
        </div>
        <button className="ghost-button" type="button" onClick={() => loadPhotos()}>
          Refresh
        </button>
      </header>

      <UploadBox
        disabled={loading}
        onUploadFinished={handleUploadFinished}
        onUploadFailed={handleUploadFailed}
      />

      <section className="search-section" aria-label="Search photos">
        <label className="search-field">
          <span className="sr-only">Search photos by filename or labels</span>
          <input
            type="search"
            placeholder="Search by filename or labels"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </section>

      <section className="gallery-section" aria-labelledby="gallery-title">
        <div className="gallery-heading">
          <div>
            <h2 id="gallery-title">Library</h2>
            <p>{photos.length} {photos.length === 1 ? "photo" : "photos"}</p>
          </div>
        </div>

        <Gallery
          loading={loading}
          photos={filteredPhotos}
          hasPhotos={photos.length > 0}
          onPhotoSelect={setSelectedIndex}
          onUploadClick={() => document.getElementById("photo-upload-input")?.click()}
        />
      </section>

      <PhotoModal
        photo={selectedPhoto}
        photos={filteredPhotos}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onDelete={handleRequestDelete}
      />

      <ConfirmDialog
        open={Boolean(photoToDelete)}
        loading={isDeleting}
        title="Delete this photo?"
        description="This removes the image from storage and deletes its metadata. This action cannot be undone."
        confirmLabel="Delete photo"
        onCancel={() => setPhotoToDelete(null)}
        onConfirm={handleDeleteConfirmed}
      />

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </main>
  );
}

export default App;
