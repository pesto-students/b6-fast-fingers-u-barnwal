import React from "react";

import imgLogo from "./../../../../images/logo.svg";
import icUser from "./../../../../images/icons/person.png";
import icCross from "./../../../../images/icons/cross.png";

function TopNav({ userName, onEnd }) {
  return (
    <div className="nav">
      <img className="logo" src={imgLogo} alt="" />
      <h5>Fast Fingers</h5>

      <div className="flex-fill"></div>

      <br />
      <br />

      <img className="ic" src={icUser} alt="" />
      <h6>{userName}</h6>

      <br />
      <br />

      <div className="btn-end" onClick={onEnd}>
        <img className="ic" src={icCross} alt="" />
        <h6>End Game</h6>
      </div>
    </div>
  );
}

export default TopNav;
