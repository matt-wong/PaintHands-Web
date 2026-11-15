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

// A line joining the settings popup to the pinned image it's editing, from
// edge to edge. Either end can move (dragging the popup, scrolling the pins,
// dragging the split bar, resizing the window), so while it's showing it
// measures both every frame and moves the line to match.
function ConnectorLine({ colour }: Props) {
  const line = useRef<SVGLineElement>(null);

  useEffect(() => {
    let request = 0;

    function update() {
      request = requestAnimationFrame(update);
      const el = line.current;
      const popup = document.querySelector(".adjust-popup");
      const pin = document.querySelector(".pinned-row figure.selected .frame");
      const row = document.querySelector(".pinned-row");
      if (!el || !popup || !pin || !row) return;

      const popupBox = popup.getBoundingClientRect();
      // Only the part of the pin that's visible in the row; if it's scrolled
      // out of sight, or the popup is on top of it, there's no line
      const pinBox = overlap(pin.getBoundingClientRect(), row.getBoundingClientRect());
      if (!pinBox || overlap(popupBox, pinBox)) {
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
    </svg>
  );
}

export default ConnectorLine;
