// Shared by the page (src/) and the server (worker/), so both agree on the shape

// One image from a search, whichever site it came from
export type ImageResult = {
  id: string;
  title: string;
  // Small version for the results grid
  thumbnail: string;
  // Larger version for viewing up close
  url: string;
  creator: string;
  source: string;
  // The image's own page on Unsplash or Pixabay
  page_url: string;
};

// What /api/search sends back. A site that fails adds a message to `errors`
// while the other site's images still come through.
export type SearchResponse = {
  results: ImageResult[];
  errors: string[];
};

// How a pinned image is shown. These are settings applied on top of the
// original photo when it's displayed; the photo itself is never changed.
export type Adjustments = {
  brightness: number; // percent, 100 = unchanged
  contrast: number; // percent, 100 = unchanged
  saturation: number; // percent, 100 = unchanged
  hue: number; // degrees, 0 = unchanged
};

// A newly pinned image starts with nothing changed
export const DEFAULT_ADJUSTMENTS: Adjustments = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  hue: 0,
};

// One pinned image: the search result plus its own settings. The same image
// can be pinned more than once (to try different settings), so each pin has
// its own id, separate from the image's.
export type PinnedImage = {
  id: string;
  image: ImageResult;
  adjust: Adjustments;
};
