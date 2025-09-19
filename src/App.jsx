import { useState, useEffect } from "react";
import "./App.css";
import GetArt from "./components/GetArt.jsx";
import GetHeader from "./components/GetHeader.jsx";
import getArtData from "./modules/getArtData.js";

export default function App() {
  // set main variables
  const searchQueries = ["paintings", "drawings"];
  const imgsOnScreen = 4;

  //state variables
  const [numArtNeeded, setnumArtNeeded] = useState(4);
  const [artData, setArtData] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const tempArtData = await getArtData(
        artData,
        numArtNeeded,
        searchQueries
      );

      setArtData(tempArtData);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numArtNeeded]);

  return (
    <>
      <GetHeader
        score={score}
        setScore={setScore}
        highScore={highScore}
        setHighScore={setHighScore}
      ></GetHeader>
      <GetArt
        artData={artData}
        setArtData={setArtData}
        imgsOnScreen={imgsOnScreen}
      />

      {/* testing */}
      <button id="test-btn" onClick={() => setnumArtNeeded((prev) => prev + 4)}>
        Load more
      </button>
    </>
  );
}
