const API_BASE = "https://obx6hrco7j.execute-api.ap-south-1.amazonaws.com/dev";

async function parseApiError(response, fallbackMessage) {
  try {
    const data = await response.json();
    return data?.message || data?.error || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
}

export async function getUploadUrl(filename) {
  const response = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filename }),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response, "Failed to prepare upload"));
  }

  return response.json();
}

export async function uploadToS3(uploadUrl, file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("PUT", uploadUrl);
    xhr.setRequestHeader("Content-Type", file.type);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded * 100) / event.total));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error("Upload to storage failed"));
      }
    };

    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(file);
  });
}

export async function getPhotos() {
  const response = await fetch(`${API_BASE}/photos`);

  if (!response.ok) {
    throw new Error(await parseApiError(response, "Failed to load photos"));
  }

  return response.json();
}

export async function deletePhoto(photoID) {
  const response = await fetch(`${API_BASE}/photos/${encodeURIComponent(photoID)}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response, "Failed to delete photo"));
  }

  if (response.status === 204) {
    return null;
  }

  return response.json().catch(() => null);
}
