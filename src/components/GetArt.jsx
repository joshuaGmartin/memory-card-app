import { useState, useEffect } from "react";
import selectRenderArt from "../modules/selectRenderArt.js";
import handleArtClick from "../modules/handleArtClick.js";

export default function GetArt({
  artData,
  setArtData,
  imgsOnScreen,
  setScore,
  isGameOver,
  setIsGameOver,
}) {
  const [selectedArt, setSelectedArt] = useState([]);

  useEffect(() => {
    // no update selectedArt if gameOver screen
    if (!isGameOver) {
      setSelectedArt(selectRenderArt(artData, imgsOnScreen));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artData]);

  // check for init
  if (!artData.length) return null;

  return (
    <div className="art-cards">
      {selectedArt.map((thisSelectedArtMap) => {
        return (
          <div className="art-card" key={thisSelectedArtMap.image_id}>
            <img
              key={thisSelectedArtMap.image_id}
              src={thisSelectedArtMap.url}
              onClick={() => {
                handleArtClick(
                  thisSelectedArtMap,
                  artData,
                  setArtData,
                  setScore,
                  setIsGameOver
                );
              }}
            />
            <div className="art-card-info">
              <b>
                {thisSelectedArtMap.title}, {thisSelectedArtMap.date_end}
              </b>{" "}
              <br></br>
              <i>{thisSelectedArtMap.artist_title}</i>
            </div>
          </div>
        );
      })}
    </div>
  );
}
