import React, { Component } from "react";
import { DifficultyBox } from "../components/Difficulty";
import WordCounter from "../components/WordCounter";
import easy from "./../data/easy.json";
import medium from "./../data/medium.json";
import hard from "./../data/hard.json";

// + Styles
import "./css/landing.css";
import "./css/game.css";

// + Image
import imgLogo from "./../images/logo.svg";
import icUser from "./../images/icons/person.png";
import icCross from "./../images/icons/cross.png";
import imgReload from "./../images/icons/reload.png";

const DIFFICULTY_FACTOR_INCREMENT = 0.01;

class Game extends Component {
  state = {
    dictionary: [],
    levelFactor: 0,
    gameMode: true,
    score: 0,
    scores: [],
  };

  interval = null;

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

  getScoreAsDuration = (score) => {
    let minutes = Math.floor(score / 60);
    let seconds = Math.floor(score % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + " : " + seconds;
  };

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

  handleRestartGame = () => {
    this.setState({ gameMode: true });
  };

  handleWordStarted = () => {
    this.resetScore();
    this.startScore();
  };

  handleWordCompleted = () => {
    this.setState({
      levelFactor: this.state.levelFactor + DIFFICULTY_FACTOR_INCREMENT,
    });
  };

  handleCounterEnd = () => {
    let scores = this.state.scores;
    scores.push(this.state.score);

    this.setState({ gameMode: false, scores });
    this.resetScore();
  };

  componentDidMount() {
    this.prepareDictionary(this.props.difficulty);
  }

  render() {
    console.log("Game", this.state);

    const { gameMode, score, scores } = this.state;
    const maxScore = Math.max.apply(Math, scores);

    return (
      <div className="game">
        <div className="nav">
          <img className="logo" src={imgLogo} alt="" />
          <h5>Fast Fingers</h5>

          <div className="flex-fill"></div>

          <br />
          <br />

          <img className="ic" src={icUser} alt="" />
          <h6>{this.props.user.name}</h6>

          <br />
          <br />

          <div className="btn-end" onClick={this.props.onEnd}>
            <img className="ic" src={icCross} alt="" />
            <h6>End Game</h6>
          </div>
        </div>

        <br />

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 my-4 my-md-0 order-md-12">
              {gameMode && this.state.dictionary.length > 0 ? (
                <WordCounter
                  word={this.getRandomWord()}
                  factor={this.props.difficulty.factor + this.state.levelFactor}
                  onWordStart={this.handleWordStarted}
                  onWordComplete={this.handleWordCompleted}
                  onCounterEnd={this.handleCounterEnd}
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
                  <h3>{this.getScoreAsDuration(scores[scores.length - 1])}</h3>
                  <br />
                  <div onClick={this.handleRestartGame} className="btn-play">
                    <img src={imgReload} alt="" />
                    <span>Play Again</span>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="col-md-4 my-4 my-md-0">
              <div className="wrap-scores">
                <div className="title">Score Board</div>
                <div className="body">
                  <table>
                    <tbody>
                      {scores.map((s, index) => (
                        <tr
                          key={"game" + index}
                          className={s === maxScore ? "best" : ""}
                        >
                          <th>Game {index + 1}</th>
                          <th>:</th>
                          <td>{this.getScoreAsDuration(s)} </td>
                        </tr>
                      ))}
                      {scores.length <= 0 ? (
                        <tr>
                          <td className="text-center" colSpan="3">
                            No games played yet!
                          </td>
                        </tr>
                      ) : (
                        ""
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <br />
              <h4>
                <b>Score:</b> {this.getScoreAsDuration(score)}
              </h4>
              <br />
              <DifficultyBox difficulty={this.props.difficulty} active="true" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
