import { useRef, useState } from "react";
import type { Adjustments } from "./types";

// The popup's width in pixels
const WIDTH = 260;

// The sliders: which setting each one changes, and its range
const SLIDERS: {
  key: keyof Adjustments;
  label: string;
  min: number;
  max: number;
  unit: string;
}[] = [
  { key: "brightness", label: "Brightness", min: 0, max: 200, unit: "%" },
  { key: "contrast", label: "Contrast", min: 0, max: 200, unit: "%" },
  { key: "saturation", label: "Saturation", min: 0, max: 200, unit: "%" },
  { key: "hue", label: "Hue", min: -180, max: 180, unit: "°" },
];

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

type Props = {
  adjust: Adjustments;
  onChange: (adjust: Adjustments) => void;
  onClose: () => void;
};

// A floating panel with a slider for each setting of one pinned image. It can
// be dragged around by its top bar.
function AdjustPopup({ adjust, onChange, onClose }: Props) {
  // Where the popup's top-left corner is, in pixels from the window's corner.
  // It starts near the top right.
  const [position, setPosition] = useState(() => ({
    x: Math.max(16, window.innerWidth - WIDTH - 24),
    y: 80,
  }));
  // Where on the bar it was grabbed, so it doesn't jump under the pointer
  const grab = useRef({ x: 0, y: 0 });

  return (
    <div
      className="adjust-popup"
      style={{ left: position.x, top: position.y, width: WIDTH }}
    >
      <header
        className="adjust-popup-bar"
        onPointerDown={(e) => {
          // Pressing the close button is a click, not the start of a drag
          if ((e.target as HTMLElement).closest("button")) return;
          // Stops the drag selecting text on the page
          e.preventDefault();
          grab.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
          };
          // Keeps the moves coming to the bar until the button is let go
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
          // Keeps enough of the bar inside the window to grab it again
          setPosition({
            x: clamp(e.clientX - grab.current.x, 60 - WIDTH, window.innerWidth - 60),
            y: clamp(e.clientY - grab.current.y, 0, window.innerHeight - 40),
          });
        }}
      >
        <span>Adjust</span>
        <button
          type="button"
          className="adjust-close"
          aria-label="Close"
          title="Close"
          onClick={onClose}
        >
          ×
        </button>
      </header>

      {SLIDERS.map(({ key, label, min, max, unit }) => (
        <label key={key} className="adjust-slider">
          <span>{label}</span>
          <span>
            {adjust[key]}
            {unit}
          </span>
          <input
            type="range"
            min={min}
            max={max}
            value={adjust[key]}
            onChange={(e) =>
              onChange({ ...adjust, [key]: Number(e.target.value) })
            }
          />
        </label>
      ))}
    </div>
  );
}

export default AdjustPopup;
