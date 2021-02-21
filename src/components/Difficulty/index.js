import React from "react";

// + Images
import imgMan from "./../../images/icons/man.png";
import imgTeen from "./../../images/icons/teen.png";
import imgToddler from "./../../images/icons/toddler.png";

function Difficulty({ difficulty, active = false, onClick = () => {} }) {
  let getClasses = () => {
    return "box-difficulty " + difficulty.key + (active ? " active" : "");
  };

  let getImage = () => {
    switch (difficulty.key) {
      case "easy":
        return imgToddler;
      case "medium":
        return imgTeen;
      case "hard":
        return imgMan;
      default:
        return "";
    }
  };

  return (
    <div onClick={() => onClick(difficulty)} className={getClasses()}>
      <img src={getImage()} alt="" />
      <br />
      <span>{difficulty.label}</span>
    </div>
  );
}

export default Difficulty;
