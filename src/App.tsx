import { useEffect, useState } from "react";
import PinnedImages from "./PinnedImages";
import SearchPanel from "./SearchPanel";
import SplitView from "./SplitView";
import { loadPins, newPinId, savePins } from "./pinStore";
import {
  DEFAULT_ADJUSTMENTS,
  type ImageResult,
  type PinnedImage,
} from "./types";

// The whole page: the title, then pinned images above and search below, with a
// bar between them that can be dragged to resize
function App() {
  // The pinned images, starting with the ones saved last time
  const [pins, setPins] = useState<PinnedImage[]>(loadPins);

  // Save the pins whenever they change
  useEffect(() => savePins(pins), [pins]);

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
  }

  return (
    <main className="container">
      <h1>PaintHands</h1>
      <SplitView
        top={<PinnedImages pins={pins} onUnpin={unpin} />}
        bottom={<SearchPanel onPin={pin} />}
      />
    </main>
  );
}

export default App;
