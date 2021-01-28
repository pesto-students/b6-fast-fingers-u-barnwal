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
  };

  timer = null;

  handleTextChanged = (e) => {
    let text = e.target.value;

    // ? is game paused
    if (this.props.paused) return;

    // * cannot delete anything
    if (text.length < this.state.text.length) return;

    // * not accepting anything if the word is already complete
    if (text.length > this.state.letters.length) return;

    let index = text.length - 1;

    if (text[index].toLowerCase() === this.state.letters[index].name) {
      let letter = this.state.letters[index];
      letter.state = true;

      this.setState({
        text: e.target.value,
        letters: this.state.letters,
      });

      if (text.length === this.state.letters.length) this.handleWordComplete();
    } else {
      let letter = this.state.letters[index];
      letter.state = false;

      this.setState({
        letters: this.state.letters,
      });
    }
  };

  handleTextKeyUp = (e) => {
    if (e.key === " ") {
      if (this.props.paused) {
        this.props.onUnpause();
        this.startTimerTick();
      } else {
        this.props.onPause();
        clearInterval(this.timer);
      }
    }
  };

  handleWordComplete = () => {
    clearInterval(this.timer);

    this.props.onWordComplete();
  };

  handleCounterEnd = () => {
    clearInterval(this.timer);

    this.props.onCounterEnd();
  };

  initialize() {
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
      text: "",
    });

    this.startTimerTick();
  }

  startTimerTick = () => {
    this.timer = setInterval(() => {
      if (this.state.tick <= 0) this.handleCounterEnd();
      else this.setState({ tick: this.state.tick - 1 });
    }, 1000);
  };

  componentDidMount() {
    this.initialize();

    this.props.onWordStart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.factor !== this.props.factor) {
      this.initialize();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    // console.log("WordCounter", this.state);

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
          onKeyUp={this.handleTextKeyUp}
          autoFocus
        />
      </div>
    );
  }
}

export default WordCounter;
