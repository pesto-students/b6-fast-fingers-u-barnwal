import React, { Component } from "react";
import { Difficulty } from "../../components/Difficulty";
import { SlideDown } from "react-slidedown";

// + Styles
import "react-slidedown/lib/slidedown.css";
import "./css/landing.css";

// + Image
import imgLogo from "./../../images/logo.svg";
import imgPlay from "./../../images/icons/play.png";
import LabeledHR from "../../components/LabeledHR";
import Button from "../../components/Button";
import Difficulties from "./containers/Difficulties";
import TextInput from "../../components/TextInput";

class Landing extends Component {
  state = {
    name: "",
    difficulty: {},
    error: "",
  };

  timeout = null;

  handleStartGame = () => {
    if (this.state.name === "") this.showError("Please enter your name!");
    else if (!this.state.difficulty.hasOwnProperty("key"))
      this.showError("Please choose a difficulty!");
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
    if (message !== "")
      this.timeout = setTimeout(() => this.showError(""), 3000);
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return (
      <div className="container-fluid landing">
        <img src={imgLogo} alt="" />

        <h1>Fast Fingers</h1>

        {/* Component */}
        <LabeledHR>The ultimate typing game</LabeledHR>

        <div className="wrap-inputs">
          <TextInput
            placeholder="Type your name..."
            value={this.state.name}
            onChange={this.handleNameChange}
            autoFocus
          />

          {/* Component */}
          <SlideDown className={"my-dropdown-slideup"}>
            {this.state.error !== "" ? (
              <div className="txtError mt-3">
                <b>{this.state.error}</b>
              </div>
            ) : (
              ""
            )}
          </SlideDown>

          {/* Container */}
          <Difficulties onDifficultyChanged={this.handleDifficultyChanged} />
        </div>

        {/* Component */}
        <Button
          iconSrc={imgPlay}
          onClick={this.handleStartGame}
          className="btn-play"
        >
          Start Game
        </Button>
      </div>
    );
  }
}

export default Landing;
