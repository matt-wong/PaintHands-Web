import { useState } from "react";
import type { ImageResult, SearchResponse } from "./types";

type Props = {
  // Adds a pin for a result (each click adds another)
  onPin: (image: ImageResult) => void;
};

// Search box, Search and Random along the top, results underneath. Clicking a
// result pins it.
function SearchPanel({ onPin }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ImageResult[]>([]);
  // "Searching...", an error, or empty when there's nothing to say
  const [status, setStatus] = useState("");

  // Without a search term, the server sends random images
  async function loadImages(text?: string) {
    setStatus("Searching...");
    setResults([]);
    try {
      // The server (worker/search.ts) calls Unsplash and Pixabay (10 each) and
      // alternates them
      const res = await fetch(
        text ? `/api/search?q=${encodeURIComponent(text)}` : "/api/search",
      );
      if (!res.ok) throw new Error(`the server returned ${res.status}`);
      const data: SearchResponse = await res.json();
      setResults(data.results);
      setStatus(
        data.errors.join(" · ") ||
          (data.results.length ? "" : "No images found."),
      );
    } catch (err) {
      setStatus(`Search failed: ${err instanceof Error ? err.message : err}`);
    }
  }

  // Before the first search there's nothing to show, so say what to do
  const message =
    status || (results.length ? "" : "Search, or press Random, to find images.");

  return (
    <section className="search-panel">
      <form
        className="search-header"
        onSubmit={(e) => {
          e.preventDefault();
          if (query.trim()) loadImages(query);
        }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search images..."
        />
        <button type="submit">Search</button>
        <button type="button" onClick={() => loadImages()}>
          Random
        </button>
      </form>

      <div className="search-body">
        {message && <p className="hint">{message}</p>}
        <div className="results">
          {results.map((img) => (
            <figure key={img.id}>
              <img
                src={img.thumbnail}
                alt={img.title}
                loading="lazy"
                title="Click to pin"
                onClick={() => onPin(img)}
              />
              {/* Credit the photographer and link back to the image's page */}
              <footer>
                <a href={img.page_url} target="_blank" rel="noreferrer">
                  {img.creator ? `${img.creator} · ` : ""}
                  {img.source}
                </a>
              </footer>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SearchPanel;
