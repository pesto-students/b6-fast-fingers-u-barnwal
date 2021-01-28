import React, { Component } from "react";
import Landing from "./pages/Landing";
import Game from "./pages/Game";

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

class App extends Component {
  state = {
    gameStarted: false,
    name: "",
    difficulty: {},
  };

  handleGameStart = ({ name, difficulty }) => {
    this.setState({ gameStarted: true, name, difficulty });
  };

  handleGameEnd = () => {
    this.setState({ gameStarted: false, name: "", difficulty: {} });
  };

  render() {
    console.log("App:", this.state);

    return (
      <main>
        {this.state.gameStarted ? (
          <Game
            user={{ name: this.state.name }}
            difficulty={this.state.difficulty}
            onEnd={this.handleGameEnd}
          />
        ) : (
          <Landing onStart={this.handleGameStart} difficulties={difficulties} />
        )}
      </main>
    );
  }
}

export default App;
