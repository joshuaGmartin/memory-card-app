export default function GetScore({ score, highScore }) {
  return (
    <div className="scores">
      <span>Score: {score}</span>
      <span>|</span>
      <span>High Score: {highScore}</span>
    </div>
  );
}
