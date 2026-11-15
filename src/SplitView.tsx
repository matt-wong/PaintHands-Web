import { useRef, useState, type ReactNode } from "react";

// How far the bar can go, as a share of the height (keeps both panes usable)
const MIN_PERCENT = 10;
const MAX_PERCENT = 85;

function clamp(percent: number): number {
  return Math.min(MAX_PERCENT, Math.max(MIN_PERCENT, percent));
}

type Props = {
  top: ReactNode;
  bottom: ReactNode;
};

// Two panes stacked on top of each other, with a bar between them that can be
// dragged up and down. With the bar selected (Tab to it), the arrow keys move
// it too; double-clicking it puts it back in the middle.
function SplitView({ top, bottom }: Props) {
  // How much of the height the top pane gets, in percent
  const [topPercent, setTopPercent] = useState(50);
  const area = useRef<HTMLDivElement>(null);

  // Puts the bar wherever the pointer is
  function dragTo(pointerY: number) {
    const box = area.current?.getBoundingClientRect();
    if (!box) return;
    setTopPercent(clamp(((pointerY - box.top) / box.height) * 100));
  }

  return (
    <div className="split" ref={area}>
      <div className="split-pane" style={{ flex: `0 0 ${topPercent}%` }}>
        {top}
      </div>

      <div
        className="splitter"
        role="separator"
        aria-orientation="horizontal"
        aria-label="Drag to resize"
        aria-valuenow={Math.round(topPercent)}
        aria-valuemin={MIN_PERCENT}
        aria-valuemax={MAX_PERCENT}
        tabIndex={0}
        onPointerDown={(e) => {
          // Stops the drag selecting text on the page
          e.preventDefault();
          // Keeps the moves coming to the bar even when the pointer leaves it,
          // until the button is let go
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) dragTo(e.clientY);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp") setTopPercent((p) => clamp(p - 5));
          if (e.key === "ArrowDown") setTopPercent((p) => clamp(p + 5));
        }}
        onDoubleClick={() => setTopPercent(50)}
      />

      <div className="split-pane split-bottom">{bottom}</div>
    </div>
  );
}

export default SplitView;
