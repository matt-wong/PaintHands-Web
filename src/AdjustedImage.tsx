import { useState } from "react";
import { useImageSrc } from "./imageStore";
import type { Adjustments, ImageResult } from "./types";

type Props = {
  image: ImageResult;
  adjust: Adjustments;
};

// Shows an image with its settings applied, without changing the image itself
function AdjustedImage({ image, adjust }: Props) {
  // The larger version for web images, or the saved picture for saved ones
  const src = useImageSrc(image);
  // The address that failed to load, if one did. A new address gets a fresh try.
  const [failedSrc, setFailedSrc] = useState<string>();

  // If the picture can't be loaded, say so and show its description. The
  // browser's own stand-in puts the description on one line, which can make
  // the pin very wide; this wraps it to fit instead.
  if (src === null || (src !== undefined && src === failedSrc)) {
    return (
      <div className="image-failed">
        <strong>Couldn't load this image</strong>
        {image.title}
      </div>
    );
  }

  const filter = [
    `brightness(${adjust.brightness}%)`,
    `contrast(${adjust.contrast}%)`,
    `saturate(${adjust.saturation}%)`,
    `hue-rotate(${adjust.hue}deg)`,
  ].join(" ");

  return (
    <img
      src={src}
      // No description while a saved picture loads, so it doesn't flash up
      alt={src ? image.title : ""}
      style={{ filter }}
      onError={() => setFailedSrc(src)}
    />
  );
}

export default AdjustedImage;
