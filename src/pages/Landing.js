import React, { Component } from "react";
import "./css/landing.css";
import Difficulty from "../components/Difficulty";

// + Image
import imgLogo from "./../images/logo.svg";
import imgPlay from "./../images/icons/play.png";

class Landing extends Component {
  state = {
    name: "",
    difficulty: "easy",
    error: "",
  };

  handleStartGame = () => {
    if (this.state.name === "") this.showError("Please enter your name!");
    else
      this.props.onStart({
        name: this.state.name,
        difficulty: this.state.difficulty,
      });
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleDifficultyChanged = (difficulty) => {
    this.setState({ difficulty });
  };

  showError = (message) => {
    this.setState({ error: message });
    if (message !== "") setTimeout(() => this.showError(""), 3000);
  };

  render() {
    return (
      <div className="landing">
        <img src={imgLogo} alt="" />

        <h1>Fast Fingers</h1>

        <div className="labeled-hr">
          <div></div>
          <span>The ultimate typing game</span>
          <div></div>
        </div>

        <div className="wrap-inputs">
          <input
            type="text"
            placeholder="Type your name..."
            value={this.state.name}
            onChange={this.handleNameChange}
          />

          {this.state.error !== "" ? (
            <div className="mt-3">
              <b>Please enter your name!</b>
            </div>
          ) : (
            ""
          )}

          <Difficulty
            defaultDifficulty={this.state.difficulty}
            onDifficultyChanged={this.handleDifficultyChanged}
          />
        </div>

        <div onClick={this.handleStartGame} className="btn-play">
          <img src={imgPlay} alt="" />
          <span>Start Game</span>
        </div>
      </div>
    );
  }
}

export default Landing;
