import type { ImageResult } from "./types";

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
            <img src={img.url} alt={img.title} />
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
