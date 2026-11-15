import PinnedImages from "./PinnedImages";
import SearchPanel from "./SearchPanel";
import SplitView from "./SplitView";

// The whole page: the title, then pinned images above and search below, with a
// bar between them that can be dragged to resize
function App() {
  return (
    <main className="container">
      <h1>PaintHands</h1>
      <SplitView top={<PinnedImages />} bottom={<SearchPanel />} />
    </main>
  );
}

export default App;
