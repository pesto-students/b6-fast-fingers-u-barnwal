import React, { Component } from "react";
import imgMan from "./../images/icons/man.png";
import imgTeen from "./../images/icons/teen.png";
import imgToddler from "./../images/icons/toddler.png";

function DifficultyBox({ type, active = false, onClick = null }) {
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
    <div onClick={onClick} className={getClasses()}>
      <img src={getImage()} alt="" />
      <br />
      <span>{getLabel()}</span>
    </div>
  );
}

class Difficulty extends Component {
  state = {
    selectedType: this.props.defaultDifficulty,
  };

  handleDifficultySelect = (selectedType) => {
    this.setState({ selectedType });
    this.props.onDifficultyChanged(selectedType);
  };

  render() {
    const { selectedType } = this.state;
    return (
      <div className="wrap-difficulty">
        <DifficultyBox
          type="easy"
          active={selectedType === "easy"}
          onClick={() => this.handleDifficultySelect("easy")}
        />
        <DifficultyBox
          type="medium"
          active={selectedType === "medium"}
          onClick={() => this.handleDifficultySelect("medium")}
        />
        <DifficultyBox
          type="hard"
          active={selectedType === "hard"}
          onClick={() => this.handleDifficultySelect("hard")}
        />
      </div>
    );
  }
}

export default Difficulty;
