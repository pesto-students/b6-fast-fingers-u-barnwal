import React, { useRef, useState, useEffect } from "react";
import { getScoreAsDuration } from "../../utils";

// + Styles
import "./../Landing/css/landing.css";
import "./css/game.css";

// + Components
import WordCounter from "../../components/WordCounter";
import Button from "../../components/Button";

// + Values
import { difficulties, DIFFICULTY_FACTOR_INCREMENT } from "../../constants";
import easy from "../../data/easy.json";
import medium from "../../data/medium.json";
import hard from "../../data/hard.json";

// + Resources
import imgReload from "./../../images/icons/reload.png";
import Difficulty from "../../components/Difficulty";
import Paused from "./containers/Paused";
import TopNav from "./containers/TopNav";
import ScoreBoard from "./containers/ScoreBoard";

function Game({ user, difficulty: selectedDifficulty, onEnd }) {
  const scoreInterval = useRef(null);

  const [dictionary, setDictionary] = useState([]);
  const [levelFactor, setLevelFactor] = useState(0);
  const [gameMode, setGameMode] = useState(true);
  const [score, setScore] = useState(0);
  const [scores, setScores] = useState([]);
  const [difficulty, setDifficulty] = useState(selectedDifficulty);
  const [paused, setPaused] = useState(false);

  const prepareDictionary = (difficulty) => {
    switch (difficulty.key) {
      case "easy":
        setDictionary(easy);
        break;
      case "medium":
        setDictionary(medium);
        break;
      case "hard":
        setDictionary(hard);
        break;
      default:
    }
  };

  const getRandomWord = () =>
    dictionary[Math.floor(Math.random() * dictionary.length)];

  const startScore = () => {
    scoreInterval.current = setInterval(
      () => setScore((score) => score + 1),
      1000
    );
  };

  const resetScore = () => {
    setScore(0);
    clearInterval(scoreInterval.current);
  };

  const incrementDifficultyFactor = () => {
    setLevelFactor(levelFactor + DIFFICULTY_FACTOR_INCREMENT);

    let easyTotalFactor = difficulties.easy.factor + levelFactor;

    switch (difficulty.key) {
      case "easy":
        if (easyTotalFactor >= difficulties.medium.factor) {
          setDifficulty(difficulties.medium);
          prepareDictionary(difficulties.medium);
        }

        break;
      case "medium":
        if (easyTotalFactor >= difficulties.hard.factor) {
          setDifficulty(difficulties.hard);
          prepareDictionary(difficulties.hard);
        }
        break;
      case "hard":
      default:
    }
  };

  const handleRestartGame = () => {
    setGameMode(true);
  };

  const handleGamePause = () => {
    clearInterval(scoreInterval.current);
    setPaused(true);
  };

  const handleGameUnpause = () => {
    startScore();
    setPaused(false);
  };

  const handleWordStarted = () => {
    resetScore();
    startScore();
  };

  const handleWordCompleted = () => {
    incrementDifficultyFactor();
  };

  const handleCounterEnd = () => {
    scores.push(score);

    setGameMode(false);
    setScores(scores);

    resetScore();
  };

  useEffect(() => prepareDictionary(selectedDifficulty), []);

  const maxScore = Math.max.apply(Math, scores);

  return (
    <div className="game">
      <TopNav userName={user.name} onEnd={onEnd} />

      <br />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 my-4 my-md-0 order-md-12">
            {gameMode && dictionary.length > 0 ? (
              <WordCounter
                paused={paused}
                word={getRandomWord()}
                factor={difficulty.factor + levelFactor}
                onWordStart={handleWordStarted}
                onWordComplete={handleWordCompleted}
                onCounterEnd={handleCounterEnd}
                onPause={handleGamePause}
                onUnpause={handleGameUnpause}
              />
            ) : (
              "No data in dictionary!"
            )}
            {!gameMode ? (
              <div
                className={
                  "wrap-game-over" +
                  (scores[scores.length - 1] === maxScore ? " best" : "")
                }
              >
                <h2 className="title">Game Over!</h2>
                <br />
                <h4>You scored</h4>
                <h3>{getScoreAsDuration(scores[scores.length - 1])}</h3>
                <br />

                <Button
                  iconSrc={imgReload}
                  onClick={handleRestartGame}
                  className="btn-play"
                >
                  Play Again
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="col-md-4 my-4 my-md-0">
            <ScoreBoard scores={scores} maxScore={maxScore} />

            <br />

            <h4 className="text-center">
              <b>Score: {getScoreAsDuration(score)}</b>
            </h4>

            <br />
            <Difficulty difficulty={difficulty} active="true" />
            <br />

            <h6>
              <b>
                <span role="img">ℹ️</span> &nbsp; Press <kbd>SPACE</kbd> to
                pause!
              </b>
            </h6>
          </div>
        </div>
      </div>

      {paused && <Paused />}
    </div>
  );
}

export default Game;
