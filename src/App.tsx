import PinnedImages from "./PinnedImages";
import SearchPanel from "./SearchPanel";
import SplitView from "./SplitView";
// TEMPORARY: sample images for styling the pinned area, until pinning works
import { SAMPLE_PINS } from "./samplePins";

// The whole page: the title, then pinned images above and search below, with a
// bar between them that can be dragged to resize
function App() {
  return (
    <main className="container">
      <h1>PaintHands</h1>
      <SplitView
        top={<PinnedImages images={SAMPLE_PINS} />}
        bottom={<SearchPanel />}
      />
    </main>
  );
}

export default App;
