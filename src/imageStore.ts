import { useEffect, useState } from "react";
import { createStore, del, get, set } from "idb-keyval";
import { newPinId } from "./pinStore";
import type { ImageResult } from "./types";

// Some pinned pictures are saved in the browser's database (IndexedDB), which
// has far more room than the storage the pin list uses. Each picture is saved
// under its image id. Saved are:
// - pasted images, which have no web address at all
// - Pixabay images. The addresses Pixabay gives out stop working after about a
//   day, and Pixabay asks apps to keep their own copy instead.
// Unsplash images aren't copied: their addresses keep working, and Unsplash
// asks apps to show its pictures from those addresses.
const images = createStore("painthands", "images");

// What `source` says for an image that was pasted in
export const PASTED = "Pasted";

// Whether this image's picture is saved in the browser
export function hasSavedCopy(image: ImageResult): boolean {
  // Pasted pins from before `saved` existed don't say so, but are always saved
  return image.saved === true || image.source === PASTED;
}

// Saves a picture under an image id. False if it couldn't be saved (e.g. the
// browser blocks storage in a private window).
async function savePicture(id: string, picture: Blob): Promise<boolean> {
  try {
    await set(id, picture, images);
    return true;
  } catch (err) {
    console.warn("Couldn't save the image:", err);
    return false;
  }
}

// Saves a pasted picture and returns an image to pin, or null if it couldn't
// be saved
export async function savePastedImage(file: Blob): Promise<ImageResult | null> {
  const id = `pasted-${newPinId()}`;
  if (!(await savePicture(id, file))) return null;
  return {
    id,
    title: "Pasted image",
    thumbnail: "",
    url: "",
    creator: "",
    source: PASTED,
    page_url: "",
    saved: true,
  };
}

// Gets an image ready to pin. A Pixabay image is downloaded and saved first,
// and comes back marked as saved. Other images come back as they are. If the
// download or saving fails, the Pixabay image comes back as it is too, so it
// still shows from its web address until that stops working.
export async function prepareToPin(image: ImageResult): Promise<ImageResult> {
  if (image.source !== "Pixabay" || hasSavedCopy(image)) return image;
  try {
    const res = await fetch(image.url);
    if (!res.ok) throw new Error(`Pixabay returned ${res.status}`);
    if (await savePicture(image.id, await res.blob())) {
      return { ...image, saved: true };
    }
  } catch (err) {
    console.warn("Couldn't download the Pixabay image to save it:", err);
  }
  return image;
}

// Removes a saved picture once no pin shows it any more
export function deleteSavedCopy(id: string): void {
  del(id, images).catch((err) =>
    console.warn("Couldn't delete the saved image:", err),
  );
}

// The address to show an image from: its web address, or for a saved picture,
// a temporary address for it. For a saved picture this is undefined for a
// moment while it loads, and null if it can't be found (e.g. the browser's
// data was cleared).
export function useImageSrc(image: ImageResult): string | null | undefined {
  const saved = hasSavedCopy(image);
  const [savedSrc, setSavedSrc] = useState<string | null>();

  useEffect(() => {
    if (!saved) return;
    let address: string | undefined;
    let stillWanted = true;
    get<Blob>(image.id, images)
      .then((picture) => {
        if (!stillWanted) return;
        if (!picture) return setSavedSrc(null);
        address = URL.createObjectURL(picture);
        setSavedSrc(address);
      })
      .catch((err) => {
        console.warn("Couldn't load a saved image:", err);
        if (stillWanted) setSavedSrc(null);
      });
    // The temporary address holds the picture in memory, so let it go when
    // it's no longer shown
    return () => {
      stillWanted = false;
      if (address) URL.revokeObjectURL(address);
    };
  }, [image.id, saved]);

  return saved ? savedSrc : image.url;
}
