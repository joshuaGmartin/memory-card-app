import handleGameReset from "../modules/handleGameReset";

export default function GetHeader({
  searchQueries,
  setArtData,
  score,
  highScore,
  setNumArtNeeded,
  setScore,
  setIsGameOver,
}) {
  return (
    <div className="header">
      <div className="title">
        <h1>Fine Art Memory</h1>
      </div>
      <div className="score-instruction-container">
        <div className="scores">
          Score: {score} | High Score: {highScore}
        </div>{" "}
        <i>Don't click an artwork more than once!</i>
      </div>
      <div className="header-buttons">
        <button
          id="header-reset-button"
          onClick={() => {
            // setIsGameOver(true);
            handleGameReset(
              searchQueries,
              setArtData,
              setNumArtNeeded,
              setScore,
              setIsGameOver,
              true
            );
          }}
        >
          Reset
        </button>

        <button
          id="gitHub-repo-link"
          onClick={() =>
            window.open(
              "https://github.com/joshuaGmartin/memory-card-app",
              "_blank",
              "noopener,noreferrer"
            )
          }
        >
          Source
        </button>
        <button
          id="gitHub-repo-link"
          onClick={() =>
            window.open(
              "https://github.com/joshuaGmartin",
              "_blank",
              "noopener,noreferrer"
            )
          }
        >
          GitHub
        </button>
      </div>
    </div>
  );
}
