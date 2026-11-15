import { DEFAULT_ADJUSTMENTS, type PinnedImage } from "./types";

// All saving and loading of pins happens in this file, so moving them from the
// browser to a server later only means changing this file.

// The name the pins are saved under in the browser's storage (localStorage).
// They stay in this browser on this computer until browsing data is cleared.
const STORAGE_KEY = "painthands-pins";

// A unique id for a new pin. randomUUID only exists on secure (https or
// localhost) pages, so there's a fallback for others.
export function newPinId(): string {
  return (
    crypto.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(36).slice(2)}`
  );
}

// The pins saved last time, or none
export function loadPins(): PinnedImage[] {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(saved)) return [];
    return (
      saved
        // Skip anything that isn't a proper pin (e.g. damaged data)
        .filter((pin) => typeof pin?.image?.id === "string")
        // Give older pins any setting added since they were saved (a new
        // slider, say), at its "unchanged" value
        .map((pin) => ({
          // Pins saved before pins had their own ids get one now
          id: typeof pin.id === "string" ? pin.id : newPinId(),
          image: pin.image,
          adjust: { ...DEFAULT_ADJUSTMENTS, ...pin.adjust },
        }))
    );
  } catch {
    // Storage is blocked (e.g. a private window) or the data can't be read
    return [];
  }
}

export function savePins(pins: PinnedImage[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pins));
  } catch (err) {
    // Storage is blocked or full; the pins still work until the page reloads
    console.warn("Couldn't save the pinned images:", err);
  }
}
