import "./GameOver.css"

const GameOver = ({restart}) => {
  return (
    <div>
        <h1>Final Game</h1>
        <button onClick={restart}>Restart</button>
    </div>
  )
}

export default GameOver