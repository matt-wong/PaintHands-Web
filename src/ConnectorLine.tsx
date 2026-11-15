import { useEffect, useRef } from "react";

type Box = { left: number; top: number; right: number; bottom: number };

// The part two boxes have in common, or null if they don't touch
function overlap(a: Box, b: Box): Box | null {
  const box = {
    left: Math.max(a.left, b.left),
    top: Math.max(a.top, b.top),
    right: Math.min(a.right, b.right),
    bottom: Math.min(a.bottom, b.bottom),
  };
  return box.right > box.left && box.bottom > box.top ? box : null;
}

// Where a line from the box's centre towards (x, y) crosses the box's edge
function edgeTowards(box: Box, x: number, y: number) {
  const centreX = (box.left + box.right) / 2;
  const centreY = (box.top + box.bottom) / 2;
  const dx = x - centreX;
  const dy = y - centreY;
  const scale = Math.min(
    dx ? (box.right - box.left) / 2 / Math.abs(dx) : Infinity,
    dy ? (box.bottom - box.top) / 2 / Math.abs(dy) : Infinity,
  );
  return { x: centreX + dx * scale, y: centreY + dy * scale };
}

type Props = {
  colour: string;
};

// How far the arrow sits from the popup's side, and its size, in pixels
const ARROW_GAP = 8;
const ARROW_LENGTH = 12;
const ARROW_HALF_HEIGHT = 10;

// A line joining the settings popup to the pinned image it's editing, from
// edge to edge. When the image is scrolled out of sight, the line is swapped
// for an arrow on that side of the popup, pointing the way to it.
// Either end can move (dragging the popup, scrolling the pins, dragging the
// split bar, resizing the window), so while it's showing it measures both
// every frame and redraws to match.
function ConnectorLine({ colour }: Props) {
  const line = useRef<SVGLineElement>(null);
  const arrow = useRef<SVGPolygonElement>(null);

  useEffect(() => {
    let request = 0;

    function update() {
      request = requestAnimationFrame(update);
      const el = line.current;
      const arrowEl = arrow.current;
      const popup = document.querySelector(".adjust-popup");
      const pin = document.querySelector(".pinned-row figure.selected .frame");
      const row = document.querySelector(".pinned-row");
      if (!el || !arrowEl || !popup || !pin || !row) return;

      const popupBox = popup.getBoundingClientRect();
      const pinFull = pin.getBoundingClientRect();
      const rowBox = row.getBoundingClientRect();
      // Only the part of the pin that's visible in the row
      const pinBox = overlap(pinFull, rowBox);

      // Scrolled out of sight: hide the line, and point the arrow its way
      if (!pinBox) {
        el.style.display = "none";
        const side =
          pinFull.right <= rowBox.left ? "left"
          : pinFull.left >= rowBox.right ? "right"
          : null;
        if (!side) {
          arrowEl.style.display = "none";
          return;
        }
        const middle = (popupBox.top + popupBox.bottom) / 2;
        // The arrow's point, and the x where its flat back is
        const tip =
          side === "left"
            ? popupBox.left - ARROW_GAP - ARROW_LENGTH
            : popupBox.right + ARROW_GAP + ARROW_LENGTH;
        const back = side === "left" ? tip + ARROW_LENGTH : tip - ARROW_LENGTH;
        arrowEl.setAttribute(
          "points",
          `${tip},${middle} ${back},${middle - ARROW_HALF_HEIGHT} ${back},${middle + ARROW_HALF_HEIGHT}`,
        );
        arrowEl.style.display = "";
        return;
      }
      arrowEl.style.display = "none";

      // The popup is on top of the pin: nothing to join
      if (overlap(popupBox, pinBox)) {
        el.style.display = "none";
        return;
      }

      const from = edgeTowards(
        popupBox,
        (pinBox.left + pinBox.right) / 2,
        (pinBox.top + pinBox.bottom) / 2,
      );
      const to = edgeTowards(
        pinBox,
        (popupBox.left + popupBox.right) / 2,
        (popupBox.top + popupBox.bottom) / 2,
      );
      el.style.display = "";
      el.setAttribute("x1", String(from.x));
      el.setAttribute("y1", String(from.y));
      el.setAttribute("x2", String(to.x));
      el.setAttribute("y2", String(to.y));
    }

    update();
    return () => cancelAnimationFrame(request);
  }, []);

  return (
    <svg className="connector" aria-hidden="true">
      <line ref={line} stroke={colour} style={{ display: "none" }} />
      <polygon ref={arrow} fill={colour} style={{ display: "none" }} />
    </svg>
  );
}

export default ConnectorLine;
