import React, { Component } from "react";
import { DifficultyBox } from "../components/Difficulty";

// + Styles
import "./css/landing.css";
import "./css/game.css";

// + Image
import imgLogo from "./../images/logo.svg";
import icUser from "./../images/icons/person.png";
import icCross from "./../images/icons/cross.png";
import WordCounter from "../components/WordCounter";

class Game extends Component {
  render() {
    console.log("Game", this.props);

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
              <WordCounter word="test" factor={this.props.difficulty.factor} />
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
