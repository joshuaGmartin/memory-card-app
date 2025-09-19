import selectRenderArt from "../modules/selectRenderArt.js";

export default function GetArt({ artData, setArtData, numDesiredImgs }) {
  if (!artData.length) return null; // GetArt called with init empty artData

  const selectedArt = selectRenderArt(artData, numDesiredImgs);

  return (
    <>
      {selectedArt.map((thisSelectedArtMap) => {
        return (
          <div className="art-card" key={thisSelectedArtMap.image_id}>
            <img
              key={thisSelectedArtMap.image_id}
              src={thisSelectedArtMap.url}
              onClick={() => {
                // probably good to move all this to a clickHandler
                setArtData(
                  artData.map((thisArtDataMap) => {
                    if (
                      thisArtDataMap.image_id === thisSelectedArtMap.image_id
                    ) {
                      return { ...thisArtDataMap, clicked: true };
                    } else return thisArtDataMap;
                  })
                );

                // temp; for testing
                if (thisSelectedArtMap.clicked) alert("game over");
                console.table(artData);
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
    </>
  );
}
