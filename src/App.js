import React, { Component } from "react";
import Landing from "./pages/Landing/index";
import Game from "./pages/Game/index";

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
    // console.log("App:", this.state);

    return (
      <main>
        {this.state.gameStarted ? (
          <Game
            user={{ name: this.state.name }}
            difficulty={this.state.difficulty}
            onEnd={this.handleGameEnd}
          />
        ) : (
          <Landing onStart={this.handleGameStart} />
        )}
      </main>
    );
  }
}

export default App;
