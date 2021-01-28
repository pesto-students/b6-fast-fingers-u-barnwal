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
  };

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

  handleWordCompleted = () => {
    this.setState({
      levelFactor: this.state.levelFactor + DIFFICULTY_FACTOR_INCREMENT,
    });
  };

  handleCounterEnd = () => {
    clearInterval(this.timer);
  };

  componentDidMount() {
    this.prepareDictionary(this.props.difficulty);
  }

  render() {
    console.log("Game", this.state);

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
              {this.state.gameMode && this.state.dictionary.length > 0 ? (
                <WordCounter
                  word={this.getRandomWord()}
                  factor={this.props.difficulty.factor + this.state.levelFactor}
                  onWordComplete={this.handleWordCompleted}
                  onCounterEnd={this.handleCounterEnd}
                />
              ) : (
                ""
              )}
              {!this.state.gameMode ? (
                <div className="wrap-game-over best">
                  <h2 className="title">Game Over!</h2>
                  <br />
                  <h4>You scored</h4>
                  <h3>00 : 00</h3>
                  <br />
                  <div onClick={this.handleStartGame} className="btn-play">
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
                      <tr>
                        <th>Game 1</th>
                        <th>:</th>
                        <td>00:00 </td>
                      </tr>

                      <tr>
                        <th>Game 2</th>
                        <th>:</th>
                        <td>00:00 </td>
                      </tr>

                      <tr className="best">
                        <th>Game 3</th>
                        <th>:</th>
                        <td>00:00 </td>
                      </tr>

                      <tr>
                        <th>Game 4</th>
                        <th>:</th>
                        <td>00:00 </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
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
