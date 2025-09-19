import GetScore from "./GetScore.jsx";

export default function GetHeader({
  score,
  setScore,
  highScore,
  setHighScore,
}) {
  return (
    <div className="header">
      <div className="title">
        <h1>Fine Art Memory</h1>
      </div>
      <GetScore
        score={score}
        setScore={setScore}
        highScore={highScore}
        setHighScore={setHighScore}
      ></GetScore>
      {/* GetButtons */}
    </div>
  );
}
