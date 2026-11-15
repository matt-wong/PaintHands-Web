import type { ImageResult } from "./types";

// Colours for the frames around pinned images: peach, coral, mustard
const FRAME_COLOURS = ["#E7A56C", "#D77659", "#D2A53D"];

// Picks a frame colour that looks random, but is always the same for the same
// image, so frames don't change colour every time the page redraws
function frameColour(id: string): string {
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  return FRAME_COLOURS[Math.abs(hash) % FRAME_COLOURS.length];
}

type Props = {
  images: ImageResult[];
};

// The top of the page, showing the pinned images
function PinnedImages({ images }: Props) {
  if (images.length === 0) {
    return (
      <section className="pinned">
        <p className="hint">Pinned images will appear here.</p>
      </section>
    );
  }

  return (
    <section className="pinned">
      <div className="pinned-row">
        {images.map((img) => (
          <figure key={img.id}>
            {/* The larger version, since pinned images are shown big */}
            <img
              src={img.url}
              alt={img.title}
              style={{ borderColor: frameColour(img.id) }}
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
    </section>
  );
}

export default PinnedImages;
