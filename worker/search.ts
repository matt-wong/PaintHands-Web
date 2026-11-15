import type { ImageResult, SearchResponse } from "../src/types";

// The API keys. They live only on the server, never in the page: locally in
// .env, online as Cloudflare secrets.
export type Env = {
  UNSPLASH_ACCESS_KEY?: string;
  PIXABAY_API_KEY?: string;
};

// Unsplash and Pixabay each send their own shape of data, so read it loosely
type Json = any;

function apiKey(env: Env, name: keyof Env): string {
  const key = env[name]?.trim();
  if (!key) throw new Error(`${name} is not set`);
  return key;
}

async function fetchJson(
  endpoint: string,
  params: Record<string, string>,
  headers: Record<string, string> = {},
): Promise<Json> {
  const url = `${endpoint}?${new URLSearchParams(params)}`;
  // Pixabay turns away requests that don't say what program is asking
  // (it answers "429 Too Many Requests"), so always name the app
  const res = await fetch(url, {
    headers: { "User-Agent": "PaintHands", ...headers },
  });
  if (!res.ok) throw new Error(`returned ${res.status} ${res.statusText}`);
  return res.json();
}

// With no search term, asks for random photos instead
async function unsplash(env: Env, query?: string): Promise<ImageResult[]> {
  const headers = {
    Authorization: `Client-ID ${apiKey(env, "UNSPLASH_ACCESS_KEY")}`,
  };
  const photos: Json[] = query
    ? // Search wraps the photos in a "results" field
      (
        await fetchJson(
          "https://api.unsplash.com/search/photos",
          { query, per_page: "10" },
          headers,
        )
      ).results
    : // Random sends back just the list of photos
      await fetchJson(
        "https://api.unsplash.com/photos/random",
        { count: "10" },
        headers,
      );
  return (photos ?? []).map((photo) => ({
    id: `unsplash-${photo.id}`,
    title: photo.alt_description ?? "",
    thumbnail: photo.urls?.small ?? "",
    url: photo.urls?.regular ?? "",
    creator: photo.user?.name ?? "",
    source: "Unsplash",
    page_url: photo.links?.html ?? "",
  }));
}

// Pixabay has no random option. With no search term it lists its most popular
// images, up to 500 (50 pages of 10), so random picks one of those pages.
async function pixabay(env: Env, query?: string): Promise<ImageResult[]> {
  const params: Record<string, string> = {
    // Pixabay takes its key as a URL parameter rather than a header
    key: apiKey(env, "PIXABAY_API_KEY"),
    image_type: "photo",
    per_page: "10",
  };
  if (query) params.q = query;
  else params.page = String(Math.floor(Math.random() * 50) + 1);

  const data = await fetchJson("https://pixabay.com/api/", params);
  return (data.hits ?? []).map((photo: Json) => ({
    id: `pixabay-${photo.id}`,
    title: photo.tags ?? "",
    thumbnail: photo.webformatURL ?? "",
    url: photo.largeImageURL ?? "",
    creator: photo.user ?? "",
    source: "Pixabay",
    page_url: photo.pageURL ?? "",
  }));
}

// With no search term, sends random images instead
export async function searchImages(
  env: Env,
  query?: string,
): Promise<SearchResponse> {
  const sources = [
    { name: "Unsplash", search: unsplash },
    { name: "Pixabay", search: pixabay },
  ];
  // Ask both sites at the same time; one failing doesn't stop the other
  const outcomes = await Promise.allSettled(
    sources.map(({ search }) => search(env, query)),
  );

  const lists: ImageResult[][] = [];
  const errors: string[] = [];
  outcomes.forEach((outcome, i) => {
    if (outcome.status === "fulfilled") lists.push(outcome.value);
    else
      errors.push(
        `${sources[i].name}: ${outcome.reason?.message ?? outcome.reason}`,
      );
  });

  // Alternate between the sources: one from each list in turn
  const results: ImageResult[] = [];
  const longest = Math.max(0, ...lists.map((list) => list.length));
  for (let i = 0; i < longest; i++) {
    for (const list of lists) if (list[i]) results.push(list[i]);
  }

  return { results, errors };
}
