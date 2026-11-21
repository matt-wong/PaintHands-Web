import { useEffect, useState } from "react";
import AdjustPopup from "./AdjustPopup";
import ConnectorLine from "./ConnectorLine";
import { frameColour } from "./frameColour";
import {
  deleteSavedCopy,
  hasSavedCopy,
  prepareToPin,
  savePastedImage,
} from "./imageStore";
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
  // another copy, so each can have different settings. A Pixabay image is
  // downloaded and saved first (see imageStore.ts), so it appears a moment
  // after the click.
  async function pin(result: ImageResult) {
    const image = await prepareToPin(result);
    setPins((current) => [
      ...current,
      { id: newPinId(), image, adjust: { ...DEFAULT_ADJUSTMENTS } },
    ]);
  }

  // Removes one pin (by the pin's own id, so other copies stay)
  function unpin(pinId: string) {
    const removed = pins.find((p) => p.id === pinId);
    setPins((current) => current.filter((p) => p.id !== pinId));
    if (pinId === selectedId) setSelectedId(null);
    // A saved picture (pasted or Pixabay) is deleted too, once no other pin
    // shows it
    if (
      removed &&
      hasSavedCopy(removed.image) &&
      !pins.some((p) => p.id !== pinId && p.image.id === removed.image.id)
    ) {
      deleteSavedCopy(removed.image.id);
    }
  }

  // Pasting an image anywhere on the page (Cmd+V) pins it
  useEffect(() => {
    async function onPaste(e: ClipboardEvent) {
      // Pasting into the search box (or any text field) works as normal
      if ((e.target as HTMLElement | null)?.closest("input, textarea")) return;
      // The pictures have to be taken from the clipboard straight away; it
      // empties once this function first waits for something
      const pictures = [...(e.clipboardData?.items ?? [])]
        .filter((item) => item.kind === "file" && item.type.startsWith("image/"))
        .map((item) => item.getAsFile())
        .filter((file): file is File => file !== null);
      if (pictures.length === 0) return;
      e.preventDefault();
      for (const picture of pictures) {
        const image = await savePastedImage(picture);
        if (image) pin(image);
      }
    }
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, []);

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
