import { useState, useEffect } from "react";
import "./App.css";
import GetArt from "./components/GetArt.jsx";
import getArtData from "./modules/getArtData.js";

export default function App() {
  const searchQueries = ["paintings", "drawings"];
  const [numDesiredImgs, setNumDesiredImgs] = useState(4);
  const [artData, setArtData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const tempArtData = await getArtData(
        artData,
        numDesiredImgs,
        searchQueries
      );

      setArtData(tempArtData);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numDesiredImgs]);

  return (
    <>
      <GetArt
        artData={artData}
        setArtData={setArtData}
        numDesiredImgs={numDesiredImgs}
      />
      <button
        id="test-btn"
        onClick={() => setNumDesiredImgs((prev) => prev + 4)}
      >
        Load more
      </button>
    </>
  );
}
