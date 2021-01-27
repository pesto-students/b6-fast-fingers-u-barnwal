import React from "react";
import imgMan from "./../images/icons/man.png";
import imgTeen from "./../images/icons/teen.png";
import imgToddler from "./../images/icons/toddler.png";

function DifficultyBox({ type, active = false }) {
  let getClasses = () => {
    return type + (active ? " active" : "");
  };

  let getLabel = () => {
    return type.toUpperCase();
  };

  let getImage = () => {
    switch (type) {
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
    <div className={getClasses()}>
      <img src={getImage()} alt="" />
      <br />
      <span>{getLabel()}</span>
    </div>
  );
}

function Difficulty() {
  return (
    <div className="wrap-difficulty">
      <DifficultyBox type="easy" active="true" />

      <DifficultyBox type="medium" />

      <DifficultyBox type="hard" />
    </div>
  );
}

export default Difficulty;
