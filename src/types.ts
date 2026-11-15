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
