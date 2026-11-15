import { useEffect, useState } from "react";
import AdjustPopup from "./AdjustPopup";
import ConnectorLine from "./ConnectorLine";
import { frameColour } from "./frameColour";
import PinnedImages from "./PinnedImages";
import SearchPanel from "./SearchPanel";
import SplitView from "./SplitView";
import { loadPins, newPinId, savePins } from "./pinStore";
import {
  DEFAULT_ADJUSTMENTS,
  type Adjustments,
  type ImageResult,
  type PinnedImage,
} from "./types";

// The whole page: the title, then pinned images above and search below, with a
// bar between them that can be dragged to resize
function App() {
  // The pinned images, starting with the ones saved last time
  const [pins, setPins] = useState<PinnedImage[]>(loadPins);

  // Save the pins whenever they change (including every slider move)
  useEffect(() => savePins(pins), [pins]);

  // The pin whose settings are open in the popup, if any
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = pins.find((p) => p.id === selectedId);

  // Adds a new pin for a search result. Pinning the same image again adds
  // another copy, so each can have different settings.
  function pin(image: ImageResult) {
    setPins((current) => [
      ...current,
      { id: newPinId(), image, adjust: { ...DEFAULT_ADJUSTMENTS } },
    ]);
  }

  // Removes one pin (by the pin's own id, so other copies stay)
  function unpin(pinId: string) {
    setPins((current) => current.filter((p) => p.id !== pinId));
    if (pinId === selectedId) setSelectedId(null);
  }

  // Changes one pin's settings (from the popup's sliders)
  function updateAdjust(pinId: string, adjust: Adjustments) {
    setPins((current) =>
      current.map((p) => (p.id === pinId ? { ...p, adjust } : p)),
    );
  }

  return (
    <main className="container">
      <h1>PaintHands</h1>
      <SplitView
        top={
          <PinnedImages
            pins={pins}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onUnpin={unpin}
          />
        }
        bottom={<SearchPanel onPin={pin} />}
      />
      {selected && (
        <>
          {/* Joins the popup to the pin it's editing, in the pin's colour */}
          <ConnectorLine colour={frameColour(selected.id)} />
          <AdjustPopup
            adjust={selected.adjust}
            onChange={(adjust) => updateAdjust(selected.id, adjust)}
            onClose={() => setSelectedId(null)}
          />
        </>
      )}
    </main>
  );
}

export default App;
