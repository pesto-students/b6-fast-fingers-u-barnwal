import React, { useState, useRef, useEffect } from "react";
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

function Landing({ onStart }) {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState("");

  const errorTimeout = useRef(null);

  const handleStartGame = () => {
    if (name === "") showError("Please enter your name!");
    else if (!difficulty.hasOwnProperty("key"))
      showError("Please choose a difficulty!");
    else
      onStart({
        name: name,
        difficulty: difficulty,
      });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const showError = (message) => {
    setError(message);

    // * auto hide error after 3 seconds
    if (message !== "")
      errorTimeout.current = setTimeout(() => showError(""), 3000);
  };

  useEffect(() => clearTimeout(errorTimeout.current), []);

  return (
    <div className="container-fluid landing">
      <img src={imgLogo} alt="" />

      <h1>Fast Fingers</h1>

      {/* Component */}
      <LabeledHR>The ultimate typing game</LabeledHR>

      <div className="wrap-inputs">
        <TextInput
          placeholder="Type your name..."
          value={name}
          onChange={handleNameChange}
          autoFocus
        />

        {/* Component */}
        <SlideDown className={"my-dropdown-slideup"}>
          {error !== "" ? (
            <div className="txtError mt-3">
              <b>{error}</b>
            </div>
          ) : (
            ""
          )}
        </SlideDown>

        {/* Container */}
        <Difficulties onDifficultyChanged={setDifficulty} />
      </div>

      {/* Component */}
      <Button iconSrc={imgPlay} onClick={handleStartGame} className="btn-play">
        Start Game
      </Button>
    </div>
  );
}

export default Landing;
