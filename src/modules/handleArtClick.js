export default function handleArtClick(
  clickedArtData,
  artData,
  setArtData,
  setScore
) {
  // check for mistake
  if (clickedArtData.clicked) {
    alert("game over"); // overlay with stats and reset button?
    return;
  }

  setScore((prev) => prev + 1);
  setArtData(
    artData.map((thisArtDataMap) => {
      if (thisArtDataMap.image_id === clickedArtData.image_id) {
        return { ...thisArtDataMap, clicked: true };
      } else return thisArtDataMap;
    })
  );
}
