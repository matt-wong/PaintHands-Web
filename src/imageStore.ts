import { useEffect, useState } from "react";
import { createStore, del, get, set } from "idb-keyval";
import { newPinId } from "./pinStore";
import type { ImageResult } from "./types";

// Pasted images have no web address, so the picture itself is saved in the
// browser's database (IndexedDB), which has far more room than the storage the
// pin list uses. Each picture is saved under its image id.
const images = createStore("painthands", "images");

// What `source` says for an image that was pasted in
export const PASTED = "Pasted";

export function isPasted(image: ImageResult): boolean {
  return image.source === PASTED;
}

// Saves a pasted picture and returns an image to pin, or null if it couldn't
// be saved (e.g. the browser blocks storage in a private window)
export async function savePastedImage(file: Blob): Promise<ImageResult | null> {
  const id = `pasted-${newPinId()}`;
  try {
    await set(id, file, images);
  } catch (err) {
    console.warn("Couldn't save the pasted image:", err);
    return null;
  }
  return {
    id,
    title: "Pasted image",
    thumbnail: "",
    url: "",
    creator: "",
    source: PASTED,
    page_url: "",
  };
}

// Removes a pasted picture once no pin shows it any more
export function deletePastedImage(id: string): void {
  del(id, images).catch((err) =>
    console.warn("Couldn't delete the pasted image:", err),
  );
}

// The address to show an image from: its web address, or for a pasted image,
// a temporary address for the saved picture (ready a moment after loading)
export function useImageSrc(image: ImageResult): string | undefined {
  const pasted = isPasted(image);
  const [savedSrc, setSavedSrc] = useState<string>();

  useEffect(() => {
    if (!pasted) return;
    let address: string | undefined;
    let stillWanted = true;
    get<Blob>(image.id, images)
      .then((picture) => {
        if (!picture || !stillWanted) return;
        address = URL.createObjectURL(picture);
        setSavedSrc(address);
      })
      .catch((err) => console.warn("Couldn't load a pasted image:", err));
    // The temporary address holds the picture in memory, so let it go when
    // it's no longer shown
    return () => {
      stillWanted = false;
      if (address) URL.revokeObjectURL(address);
    };
  }, [image.id, pasted]);

  return pasted ? savedSrc : image.url;
}
