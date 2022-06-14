import "./GameOver.css"

const GameOver = ({restart, score}) => {
  return (
    <div>
        <h1>Final Game</h1>
        <h2>your rating was: <span>{score}</span></h2>
        <button onClick={restart}>Restart</button>
    </div>
  )
}

export default GameOver