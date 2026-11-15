import type { Adjustments } from "./types";

type Props = {
  src: string;
  alt: string;
  adjust: Adjustments;
};

// Shows an image with its settings applied, without changing the image itself
function AdjustedImage({ src, alt, adjust }: Props) {
  const filter = [
    `brightness(${adjust.brightness}%)`,
    `contrast(${adjust.contrast}%)`,
    `saturate(${adjust.saturation}%)`,
    `hue-rotate(${adjust.hue}deg)`,
  ].join(" ");

  return <img src={src} alt={alt} style={{ filter }} />;
}

export default AdjustedImage;
