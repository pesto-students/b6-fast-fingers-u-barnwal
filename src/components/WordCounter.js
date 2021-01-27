import React, { Component } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

// + Styles
import "react-circular-progressbar/dist/styles.css";

const MIN_TIME_COUNTER = 2;

class WordCounter extends Component {
  state = {
    letters: [],
    tick: 0,
    max: 0,
  };

  timer = null;

  componentDidMount() {
    let letters = this.props.word.split("").map((c, i) => {
      return { name: c, key: i, active: false, state: "" };
    });

    let tick = Math.max(
      Math.ceil(letters.length / this.props.factor),
      MIN_TIME_COUNTER
    );

    this.setState({
      letters,
      tick,
      max: tick,
    });

    this.timer = setInterval(() => {
      if (this.state.tick <= 0) this.handleCounterEnd();
      else this.setState({ tick: this.state.tick - 1 });
    }, 1000);
  }

  handleWordCompleted = () => {};

  handleCounterEnd = () => {
    clearInterval(this.timer);
  };

  render() {
    console.log("WordCounter", this.state);

    return (
      <div className="wrap-counter">
        <div className="counter">
          <CircularProgressbar
            maxValue={this.state.max}
            value={this.state.tick}
            text={this.state.tick !== 0 ? this.state.tick : "Boo!"}
          />
        </div>
        <div className="word">
          {this.state.letters.map((l) => (
            <span className={l.state + (l.active ? " active" : "")} key={l.key}>
              {l.name}
            </span>
          ))}
        </div>
        <input type="text" />
      </div>
    );
  }
}

export default WordCounter;
