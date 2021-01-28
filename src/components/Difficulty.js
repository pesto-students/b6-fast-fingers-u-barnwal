import React, { Component } from "react";

// + Images
import imgMan from "./../images/icons/man.png";
import imgTeen from "./../images/icons/teen.png";
import imgToddler from "./../images/icons/toddler.png";

const difficulties = {
  easy: {
    key: "easy",
    label: "Easy",
    factor: 1,
  },
  medium: {
    key: "medium",
    label: "Medium",
    factor: 1.5,
  },
  hard: {
    key: "hard",
    label: "Hard",
    factor: 2,
  },
};

function DifficultyBox({ difficulty, active = false, onClick = () => {} }) {
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

class Difficulty extends Component {
  state = {
    selected: {},
  };

  handleDifficultySelect = (selected) => {
    this.setState({ selected });
    this.props.onDifficultyChanged(selected);
  };

  render() {
    const { selected } = this.state;

    return (
      <div className="wrap-difficulty">
        <DifficultyBox
          difficulty={difficulties.easy}
          active={selected.key === "easy"}
          onClick={this.handleDifficultySelect}
        />
        <DifficultyBox
          difficulty={difficulties.medium}
          active={selected.key === "medium"}
          onClick={this.handleDifficultySelect}
        />
        <DifficultyBox
          difficulty={difficulties.hard}
          active={selected.key === "hard"}
          onClick={this.handleDifficultySelect}
        />
      </div>
    );
  }
}

export { Difficulty, DifficultyBox };
