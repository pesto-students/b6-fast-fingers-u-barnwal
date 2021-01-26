import React from "react";
import "./css/game.css";
import { Button } from "react-bootstrap";

// + Image
import imgLogo from "./../images/logo.svg";
import icUser from "./../images/icons/person.png";
import icCross from "./../images/icons/cross.png";

function Landing() {
  return (
    <div className="game">
      <div className="nav">
        <img className="logo" src={imgLogo} alt="" />
        <h5>Fast Fingers</h5>

        <div className="flex-fill"></div>

        <img className="ic" src={icUser} alt="" />
        <h6>Your name</h6>

        <div className="btn-end">
          <img className="ic" src={icCross} alt="" />
          <h6>End Game</h6>
        </div>
      </div>

      <br />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
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

          <div className="col-md-8"></div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
