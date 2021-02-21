import React from "react";

// + Resources
import imgGame from "./../../../../images/icons/gamepad.png";

function Paused() {
  return (
    <div className="pause">
      <img src={imgGame} alt="" />
      <br />
      <br />
      <h3>
        <b>Game Paused</b>
      </h3>
      <br />
      <h6>
        <b>
          Press <kbd>SPACE</kbd> to unpause!
        </b>
      </h6>
    </div>
  );
}

export default Paused;
