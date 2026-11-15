// Colours for the frames around pinned images: peach, coral, mustard
const FRAME_COLOURS = ["#E7A56C", "#D77659", "#D2A53D"];

// Picks a frame colour that looks random, but is always the same for the same
// pin, so frames don't change colour every time the page redraws
export function frameColour(id: string): string {
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  return FRAME_COLOURS[Math.abs(hash) % FRAME_COLOURS.length];
}
