export default function GetScore({ score, highScore }) {
  return (
    <div className="scores">
      Score: {score} | High Score: {highScore}
    </div>
  );
}
