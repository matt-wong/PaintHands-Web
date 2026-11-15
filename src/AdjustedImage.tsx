import { useImageSrc } from "./imageStore";
import type { Adjustments, ImageResult } from "./types";

type Props = {
  image: ImageResult;
  adjust: Adjustments;
};

// Shows an image with its settings applied, without changing the image itself
function AdjustedImage({ image, adjust }: Props) {
  // The larger version for web images, or the saved picture for pasted ones
  const src = useImageSrc(image);

  const filter = [
    `brightness(${adjust.brightness}%)`,
    `contrast(${adjust.contrast}%)`,
    `saturate(${adjust.saturation}%)`,
    `hue-rotate(${adjust.hue}deg)`,
  ].join(" ");

  return <img src={src} alt={image.title} style={{ filter }} />;
}

export default AdjustedImage;
