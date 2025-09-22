import getArtData from "./getArtData";

export default function handleGameReset(
  searchQueries,
  setArtData,
  setNumArtNeeded,
  setScore,
  setIsGameOver,
  noWait = false
) {
  if (noWait) {
    //handle game over reset

    async function fetchData() {
      const tempArtData = await getArtData([], 4, searchQueries);

      setArtData(tempArtData);
    }

    fetchData();
  }

  setNumArtNeeded(4);
  setScore(0);
  setIsGameOver(false);
}
