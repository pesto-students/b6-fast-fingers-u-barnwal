import React, { Component } from "react";
import Landing from "./pages/Landing";
import Game from "./pages/Game";

class App extends Component {
  state = {
    gameStarted: false,
    name: "",
    difficulty: "",
  };

  handleGameStart = ({ name, difficulty }) => {
    this.setState({ gameStarted: true, name, difficulty });
  };

  render() {
    return (
      <main>
        {this.state.gameStarted ? (
          <Game
            user={{ name: this.state.name, difficulty: this.state.difficulty }}
          />
        ) : (
          <Landing onStart={this.handleGameStart} />
        )}
      </main>
    );
  }
}

export default App;
