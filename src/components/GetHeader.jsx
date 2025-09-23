export default function GetHeader({ score, highScore }) {
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
