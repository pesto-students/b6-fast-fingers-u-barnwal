import React, { Component } from "react";
import { getScoreAsDuration } from "../../utils";

// + Styles
import "./../Landing/css/landing.css";
import "./css/game.css";

// + Components
import WordCounter from "../../components/WordCounter";
import Button from "../../components/Button";

// + Resources
import { difficulties } from "../../constants";
import easy from "../../data/easy.json";
import medium from "../../data/medium.json";
import hard from "../../data/hard.json";

import imgReload from "./../../images/icons/reload.png";
import Difficulty from "../../components/Difficulty";
import Paused from "./containers/Paused";
import TopNav from "./containers/TopNav";
import ScoreBoard from "./containers/ScoreBoard";

const DIFFICULTY_FACTOR_INCREMENT = 0.01;

class Game extends Component {
  state = {
    dictionary: [],
    levelFactor: 0,
    gameMode: true,
    score: 0,
    scores: [],
    difficulty: {},
    paused: false,
  };

  interval = null;

  constructor(props) {
    super(props);
    this.state.difficulty = this.props.difficulty;
  }

  prepareDictionary = (difficulty) => {
    switch (difficulty.key) {
      case "easy":
        this.setState({ dictionary: easy });
        break;
      case "medium":
        this.setState({ dictionary: medium });
        break;
      case "hard":
        this.setState({ dictionary: hard });
        break;
      default:
    }
  };

  getRandomWord = () =>
    this.state.dictionary[
      Math.floor(Math.random() * this.state.dictionary.length)
    ];

  startScore = () => {
    this.interval = setInterval(
      () => this.setState({ score: this.state.score + 1 }),
      1000
    );
  };

  resetScore = () => {
    this.setState({ score: 0 });
    clearInterval(this.interval);
  };

  incrementDifficultyFactor = () => {
    this.setState({
      levelFactor: this.state.levelFactor + DIFFICULTY_FACTOR_INCREMENT,
    });

    let easyTotalFactor = difficulties.easy.factor + this.state.levelFactor;

    switch (this.state.difficulty.key) {
      case "easy":
        if (easyTotalFactor >= difficulties.medium.factor) {
          this.setState({
            difficulty: difficulties.medium,
          });
          this.prepareDictionary(difficulties.medium);
        }

        break;
      case "medium":
        if (easyTotalFactor >= difficulties.hard.factor) {
          this.setState({
            difficulty: difficulties.hard,
          });
          this.prepareDictionary(difficulties.hard);
        }
        break;
      case "hard":
      default:
    }
  };

  handleRestartGame = () => {
    this.setState({ gameMode: true });
  };

  handleGamePause = () => {
    clearInterval(this.interval);
    this.setState({ paused: true });
  };

  handleGameUnpause = () => {
    this.startScore();
    this.setState({ paused: false });
  };

  handleWordStarted = () => {
    this.resetScore();
    this.startScore();
  };

  handleWordCompleted = () => {
    this.incrementDifficultyFactor();
  };

  handleCounterEnd = () => {
    let scores = this.state.scores;
    scores.push(this.state.score);

    this.setState({ gameMode: false, scores });
    this.resetScore();
  };

  componentDidMount() {
    this.prepareDictionary(this.state.difficulty);
  }

  render() {
    // console.log("Game", this.state);

    const { gameMode, score, scores, paused } = this.state;
    const maxScore = Math.max.apply(Math, scores);

    return (
      <div className="game">
        <TopNav userName={this.props.user.name} onEnd={this.props.onEnd} />

        <br />

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 my-4 my-md-0 order-md-12">
              {gameMode && this.state.dictionary.length > 0 ? (
                <WordCounter
                  paused={paused}
                  word={this.getRandomWord()}
                  factor={this.state.difficulty.factor + this.state.levelFactor}
                  onWordStart={this.handleWordStarted}
                  onWordComplete={this.handleWordCompleted}
                  onCounterEnd={this.handleCounterEnd}
                  onPause={this.handleGamePause}
                  onUnpause={this.handleGameUnpause}
                />
              ) : (
                ""
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
                    onClick={this.handleRestartGame}
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
              <Difficulty difficulty={this.state.difficulty} active="true" />
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
}

export default Game;
