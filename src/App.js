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

  const [selectCategory, setSelectCategory] = useState("");
  const [selectWord, setSelectWord] = useState("");
  const [letters, setLetters] = useState([]);

  const selectWordAndCategory = () => {
    //Select random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    // Select random word of category
    const wordCategory = words[category][Math.floor(Math.random() * Object.keys(words[category]).length)]

    return {category, wordCategory}
  }

  // START THE GAME
  const startGame = () => {
    //select category and word
    const {category, wordCategory} = selectWordAndCategory()

    // config of letters
    let wordLetters = wordCategory.split("")
    wordLetters = wordLetters.map((letter) => letter.toLowerCase())

    //set stages
    setSelectCategory(category);
    setSelectWord(wordCategory);
    setLetters(wordLetters);

    console.log(selectCategory)
    console.log(selectWord)
    console.log(letters)

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
