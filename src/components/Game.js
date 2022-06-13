import { useState, useRef } from "react";
import "./Game.css";

const Game = ({
  letterInput,
  selectCategory,
  selectWord,
  letters,
  guessedLetters,
  wrongLetters,
  guess,
  score,
}) => {
  let [letter, setLetter] = useState('');
  let letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    letterInput(letter)
    setLetter("");
    letterInputRef.current.focus();
  }
  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Guess the word</h1>
      <h3 className="tip">
        tip about answer: <span>{selectCategory}</span>
      </h3>
      <p>you still have {guess} tried</p>
      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Try to guess a letter of the word:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Used Letters</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
      </div>
    </div>
  );
};

export default Game;
