import "./HomeScreen.css";

const HomeScreen = ({startGame}) => {
  return (
    <div className="initial">
      <h1>Word Guessing</h1>
      <h2>Are you ready?</h2>

      <button onClick={startGame}>Start</button>
    </div>
  );
};

export default HomeScreen;
