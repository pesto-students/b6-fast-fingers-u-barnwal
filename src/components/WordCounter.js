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
    text: "",
    // index: 0,
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

  handleTextChanged = (e) => {
    let text = e.target.value;

    // * cannot delete anything
    if (text.length < this.state.text.length) return;

    let index = text.length - 1;

    if (text[index].toLowerCase() === this.state.letters[index].name) {
      let letter = this.state.letters[index];
      letter.state = true;

      this.setState({
        text: e.target.value,
        letters: this.state.letters,
      });
    } else {
      let letter = this.state.letters[index];
      letter.state = false;

      this.setState({
        letters: this.state.letters,
      });
    }
  };

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
            <span
              className={
                l.state + (l.key === this.state.text.length ? " active" : "")
              }
              key={l.key}
            >
              {l.name}
            </span>
          ))}
        </div>
        <input
          type="text"
          value={this.state.text}
          onChange={this.handleTextChanged}
        />
      </div>
    );
  }
}

export default WordCounter;
