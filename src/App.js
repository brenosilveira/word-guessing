// CSS
import "./App.css";
// REACT
import { useCallback, useEffect, useState } from "react";

// DATA
import { wordlist } from "./data/words";

// COMPONENTS
import HomeScreen from "./components/HomeScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const initialScore = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordlist);

  const [selectCategory, setSelectCategory] = useState("");
  const [selectWord, setSelectWord] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guess, setGuess] = useState(initialScore);
  const [score, setScore] = useState(0);

  const selectWordAndCategory = useCallback(() => {
    //Select random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // Select random word of category
    const wordCategory =
      words[category][
        Math.floor(Math.random() * Object.keys(words[category]).length)
      ];

    return { category, wordCategory };
  },[words]);

  // START THE GAME
  const startGame = useCallback(() => {
    // clear letters 
    clearLetterStates();

    //select category and word
    const { category, wordCategory } = selectWordAndCategory();

    // config of letters
    let wordLetters = wordCategory.split("");
    wordLetters = wordLetters.map((letter) => letter.toLowerCase());

    //set stages
    setSelectCategory(category);
    setSelectWord(wordCategory);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  },[selectWordAndCategory]);

  // LETTER INPUT
  const letterInput = (letter) => {
    let normalizeLetter = letter.toLowerCase();

    //check letters used
    if( guessedLetters.includes(normalizeLetter) ||
        wrongLetters.includes(normalizeLetter)
    ) {
      return;
    }

    //push guess or remove
    if(letters.includes(normalizeLetter)) {
      setGuessedLetters((guessedLetters) => [...guessedLetters, normalizeLetter])
    } else {
      setWrongLetters((wrongLetters) => [ ...wrongLetters, normalizeLetter])
      
      setGuess((atualGuesses) => atualGuesses -1)
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  };

  //lose condition
  useEffect(() => {
    if(guess <= 0) {
      //reset all states
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guess]);

  //win condition
  useEffect(() => {
    let noRepitLetter = [...new Set(letters)];

    if(noRepitLetter.length === guessedLetters.length) {
      setScore((actualScore) => actualScore += 100)

      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  // RETURN TO START
  const restart = () => {
    setScore(0)
    setGuess(initialScore)

    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <HomeScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          letterInput={letterInput}
          selectCategory={selectCategory}
          selectWord={selectWord}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guess={guess}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver restart={restart} score={score} />}
    </div>
  );
}

export default App;
