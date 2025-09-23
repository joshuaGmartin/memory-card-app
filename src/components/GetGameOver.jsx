import handleGameReset from "../modules/handleGameReset";

export default function GetGameOver({
  setNumArtNeeded,
  setScore,
  setIsGameOver,
}) {
  return (
    <div className="game-over-overlay-container">
      <div className="game-over-overlay">
        <h1>Game Over</h1>
        <button
          className="game-reset-button"
          onClick={() =>
            handleGameReset(setNumArtNeeded, setScore, setIsGameOver)
          }
        >
          Try Again?
        </button>
      </div>
    </div>
  );
}
