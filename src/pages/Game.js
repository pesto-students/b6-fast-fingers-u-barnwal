import React, { Component } from "react";
import "./css/game.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// + Image
import imgLogo from "./../images/logo.svg";
import icUser from "./../images/icons/person.png";
import icCross from "./../images/icons/cross.png";

class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="nav">
          <img className="logo" src={imgLogo} alt="" />
          <h5>Fast Fingers</h5>

          <div className="flex-fill"></div>

          <img className="ic" src={icUser} alt="" />
          <h6>{this.props.user.name}</h6>

          <div className="btn-end" onClick={this.props.onEnd}>
            <img className="ic" src={icCross} alt="" />
            <h6>End Game</h6>
          </div>
        </div>

        <br />

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 my-4 my-md-0 order-md-12">
              <div className="wrap-counter">
                <div className="counter">
                  <CircularProgressbar value={150} maxValue="200" text={50} />
                </div>
                <div className="word">
                  <span className="true">W</span>
                  <span className="true">i</span>
                  <span className="active false">n</span>
                  dow
                </div>
                <input type="text" />
              </div>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
