export default function GetScore({ score, setScore, highScore, setHighScore }) {
  return (
    <div className="scores">
      {score}
      {highScore}
    </div>
  );
}
