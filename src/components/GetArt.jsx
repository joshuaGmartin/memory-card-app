import selectRenderArt from "../modules/selectRenderArt.js";
import handleArtClick from "../modules/handleArtClick.js";

export default function GetArt({ artData, setArtData, imgsOnScreen }) {
  if (!artData.length) return null; // GetArt called with init empty artData

  const selectedArt = selectRenderArt(artData, imgsOnScreen);

  return (
    <div className="art-cards">
      {selectedArt.map((thisSelectedArtMap) => {
        return (
          <div className="art-card" key={thisSelectedArtMap.image_id}>
            <img
              key={thisSelectedArtMap.image_id}
              src={thisSelectedArtMap.url}
              onClick={() => {
                handleArtClick(thisSelectedArtMap, artData, setArtData);
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
