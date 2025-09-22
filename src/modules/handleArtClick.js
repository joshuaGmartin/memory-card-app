export default function handleArtClick(
  clickedArtData,
  artData,
  setArtData,
  setScore,
  setIsGameOver
) {
  // check for game over
  if (clickedArtData.clicked) {
    setIsGameOver(true);
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
