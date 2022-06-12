import "./Game.css";

const Game = ({letterInput}) => {
  return (
    <div>
        <h1>Game Start Here!</h1>
        <button onClick={letterInput}> final game! </button>
    </div>
  )
}

export default Game