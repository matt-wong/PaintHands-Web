import AdjustedImage from "./AdjustedImage";
import { frameColour } from "./frameColour";
import type { PinnedImage } from "./types";

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
