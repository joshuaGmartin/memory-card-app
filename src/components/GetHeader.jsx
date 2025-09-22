import GetScore from "./GetScore.jsx";

export default function GetHeader({ score, highScore }) {
  return (
    <div className="header">
      <div className="title">
        <h1>Fine Art Memory</h1>
      </div>
      <div className="score-instruction-container">
        <GetScore score={score} highScore={highScore}></GetScore>
        {/* <span>Don't click an art work more than once!</span> */}
      </div>
      {/* GetButtons */}
    </div>
  );
}
