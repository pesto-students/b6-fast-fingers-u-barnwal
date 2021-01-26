import React from "react";
import "./css/landing.css";
import { Button } from "react-bootstrap";

// + Image
import imgLogo from "./../images/logo.svg";
import imgPlay from "./../images/icons/play.png";
import imgMan from "./../images/icons/man.png";
import imgTeen from "./../images/icons/teen.png";
import imgToddler from "./../images/icons/toddler.png";

function Landing() {
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
        <input type="text" placeholder="Type your name..." />

        <div className="wrap-difficulty">
          <div className="easy active">
            <img src={imgToddler} alt="" />
            <br />
            <span>Easy</span>
          </div>

          <div className="medium">
            <img src={imgTeen} alt="" />
            <br />
            <span>Medium</span>
          </div>

          <div className="hard">
            <img src={imgMan} alt="" />
            <br />
            <span>Hard</span>
          </div>
        </div>
      </div>

      <div className="btn-play">
        <img src={imgPlay} alt="" />
        <span>Start Game</span>
      </div>
    </div>
  );
}

export default Landing;
