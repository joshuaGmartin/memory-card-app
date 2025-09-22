import GetScore from "./GetScore.jsx";

export default function GetHeader({ score, highScore }) {
  return (
    <div className="header">
      <div className="title">
        <h1>Fine Art Memory</h1>
      </div>
      <GetScore score={score} highScore={highScore}></GetScore>
      {/* GetButtons */}
    </div>
  );
}
