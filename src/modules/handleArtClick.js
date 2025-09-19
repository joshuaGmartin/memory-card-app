export default function handleArtClick(clickedArtData, artData, setArtData) {
  if (clickedArtData.clicked) alert("game over");

  setArtData(
    artData.map((thisArtDataMap) => {
      if (thisArtDataMap.image_id === clickedArtData.image_id) {
        return { ...thisArtDataMap, clicked: true };
      } else return thisArtDataMap;
    })
  );

  //   console.table(artData);
}
