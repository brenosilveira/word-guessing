// CSS
import "./App.css";
// REACT
import { useCallback, useEffect, useState } from "react";

// DATA
import { wordlist } from "./data/words"

// COMPONENTS
import HomeScreen from "./components/HomeScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  {id:1, name: "start"},
  {id:2, name: "game"},
  {id:3, name: "end"},
]

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordlist)

  // START THE GAME
  const startGame = () => {
    setGameStage(stages[1].name)
  }

  // LETTER INPUT
  const letterInput = () => {
    setGameStage(stages[2].name)
  }

  // RETURN TO START
  const restart = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === "start" && <HomeScreen startGame={startGame}/>}
      {gameStage === "game" && <Game letterInput={letterInput}/>}
      {gameStage === "end" && <GameOver restart={restart}/>}
    </div>
  );
}

export default App;
