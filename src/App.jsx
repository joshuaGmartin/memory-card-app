import { useState, useEffect } from "react";
import "./App.css";
import GetArt from "./components/GetArt.jsx";
import GetHeader from "./components/GetHeader.jsx";
import GetGameOver from "./components/GetGameOver.jsx";
import getArtData from "./modules/getArtData.js";

export default function App() {
  // set main variables
  const searchQueries = ["paintings", "drawings"];
  const imgsOnScreen = 4;

  //state variables
  const [numArtNeeded, setNumArtNeeded] = useState(4);
  const [artData, setArtData] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // if more art needed, get more art
  useEffect(() => {
    //handle game over reset
    const thisArtData = isGameOver ? [] : artData;
    const thisNumArtNeeded = isGameOver ? 4 : numArtNeeded;

    async function fetchData() {
      const tempArtData = await getArtData(
        thisArtData,
        thisNumArtNeeded,
        searchQueries
      );

      setArtData(tempArtData);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numArtNeeded, isGameOver]);

  // every time artData changes, check for level clear
  useEffect(() => {
    const unclickedArt = artData.filter((art) => !art.clicked);
    if (unclickedArt.length === 0 && artData.length > 0) {
      setNumArtNeeded((prev) => prev + 4);
    }
  }, [artData]);

  // check if update high score
  useEffect(() => {
    if (highScore < score) {
      setHighScore(score);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  return (
    <>
      <GetHeader score={score} highScore={highScore}></GetHeader>
      <div className="game-section">
        {artData.every((art) => art.clicked) ? null : ( // change to artData.length === score ?
          <GetArt
            artData={artData}
            setArtData={setArtData}
            imgsOnScreen={imgsOnScreen}
            setScore={setScore}
            isGameOver={isGameOver}
            setIsGameOver={setIsGameOver}
          />
        )}
        {isGameOver ? (
          <GetGameOver
            setArtData={setArtData}
            setNumArtNeeded={setNumArtNeeded}
            setScore={setScore}
            setIsGameOver={setIsGameOver}
          ></GetGameOver>
        ) : null}
      </div>
    </>
  );
}
