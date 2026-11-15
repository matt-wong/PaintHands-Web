import AdjustedImage from "./AdjustedImage";
import type { PinnedImage } from "./types";

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
  pins: PinnedImage[];
  // The pin whose settings are open in the popup, if any
  selectedId: string | null;
  onSelect: (id: string) => void;
  onUnpin: (id: string) => void;
};

// The top of the page, showing the pinned images. Clicking one opens its
// settings.
function PinnedImages({ pins, selectedId, onSelect, onUnpin }: Props) {
  if (pins.length === 0) {
    return (
      <section className="pinned">
        <p className="hint">Click a search result to pin it here.</p>
      </section>
    );
  }

  return (
    <section className="pinned">
      <div className="pinned-row">
        {/* Keyed by the pin's own id, since the same image can be pinned twice */}
        {pins.map(({ id, image: img, adjust }) => (
          <figure key={id} className={id === selectedId ? "selected" : undefined}>
            <button
              type="button"
              className="unpin"
              aria-label="Unpin"
              title="Unpin"
              onClick={() => onUnpin(id)}
            >
              ×
            </button>
            {/* The frame wraps the photo, so the settings change only the
                photo. Its colour comes from the pin's id, so two copies of a
                photo can differ. */}
            <div
              className="frame"
              style={{ borderColor: frameColour(id) }}
              title="Click to adjust"
              onClick={() => onSelect(id)}
            >
              {/* The larger version, since pinned images are shown big */}
              <AdjustedImage
                src={img.url}
                alt={img.title}
                adjust={adjust}
              />
            </div>
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
