import React, { useState } from "react";
import Landing from "./pages/Landing/";
import Game from "./pages/Game/";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState({});

  const handleGameStart = ({ name, difficulty }) => {
    setName(name);
    setDifficulty(difficulty);
    setGameStarted(true);
  };

  const handleGameEnd = () => {
    setName("");
    setDifficulty({});
    setGameStarted(false);
  };

  return (
    <main>
      {gameStarted ? (
        <Game user={{ name }} difficulty={difficulty} onEnd={handleGameEnd} />
      ) : (
        <Landing onStart={handleGameStart} />
      )}
    </main>
  );
}

export default App;
