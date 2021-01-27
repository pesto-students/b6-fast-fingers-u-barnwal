import React, { Component } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

class WordCounter extends Component {
  state = {
    letters: this.props.word.split("").map((c, i) => {
      return { name: c, key: i, active: false, state: "" };
    }),
  };

  render() {
    console.log(this.state);
    return (
      <div className="wrap-counter">
        <div className="counter">
          <CircularProgressbar value={150} maxValue="200" text={50} />
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
