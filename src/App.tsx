import { useState } from "react";
import type { ImageResult, SearchResponse } from "./types";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ImageResult[]>([]);
  // "Searching...", an error, or empty when there's nothing to say
  const [status, setStatus] = useState("");
  // Whether the search panel at the bottom is open to show its results
  const [expanded, setExpanded] = useState(false);

  // Without a search term, the server sends random images
  async function loadImages(text?: string) {
    setStatus("Searching...");
    setResults([]);
    setExpanded(true);
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

  return (
    <main className="container">
      {/* The top of the page scrolls on its own; pinned images can go here */}
      <div className="board">
        <h1>PaintHands</h1>
        <p className="hint">Search below, or press Random, to find images.</p>
      </div>

      {/* Search sits at the bottom: the header is always showing, and the
          results open beneath it */}
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
          <button
            type="button"
            className="search-toggle"
            aria-expanded={expanded}
            aria-label={expanded ? "Hide results" : "Show results"}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "▾" : "▴"}
          </button>
        </form>

        {expanded && (
          <div className="search-body">
            {status && <p className="hint">{status}</p>}
            <div className="results">
              {results.map((img) => (
                <figure key={img.id}>
                  <img src={img.thumbnail} alt={img.title} loading="lazy" />
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
        )}
      </section>
    </main>
  );
}

export default App;
