import React, { useState, useRef, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

// + Styles
import "react-circular-progressbar/dist/styles.css";
import TextInput from "./TextInput";

const MIN_TIME_COUNTER = 2;

function WordCounter({
  paused,
  word,
  factor,
  onWordStart,
  onWordComplete,
  onCounterEnd,
  onPause,
  onUnpause,
}) {
  const timer = useRef(null);

  const [letters, setLetters] = useState([]);
  const [tick, setTick] = useState(0);
  const [max, setMax] = useState(0);
  const [text, setText] = useState("");

  // state = {
  //   letters: [],
  //   tick: 0,
  //   max: 0,
  //   text: "",
  // };

  const handleTextChanged = (e) => {
    const inputText = e.target.value;

    // ? is game paused
    if (paused) return;

    // * cannot delete anything
    if (inputText.length < text.length) return;

    // * not accepting anything if the word is already complete
    if (inputText.length > letters.length) return;

    let index = inputText.length - 1;

    if (inputText[index].toLowerCase() === letters[index].name) {
      let letter = letters[index];
      letter.state = true;

      setText(e.target.value);
      setLetters(letters);

      if (inputText.length === letters.length) handleWordComplete();
    } else {
      let letter = letters[index];
      letter.state = false;

      setLetters(letters);
    }
  };

  const handleTextKeyUp = (e) => {
    if (e.key === " ") {
      if (paused) {
        startTimerTick();
        onUnpause();
      } else {
        clearInterval(timer.current);
        onPause();
      }
    }
  };

  const handleWordComplete = () => {
    clearInterval(timer.current);
    onWordComplete();
  };

  const handleCounterEnd = () => {
    clearInterval(timer.current);
    onCounterEnd();
  };

  const initialize = () => {
    let initLetters = word.split("").map((c, i) => {
      return { name: c, key: i, active: false, state: "" };
    });

    let initTick = Math.max(
      Math.ceil(initLetters.length / factor),
      MIN_TIME_COUNTER
    );

    console.log("initTick", initTick);

    setLetters(initLetters);
    setTick(initTick);
    setMax(initTick);
    setText("");

    console.log("tick", tick);

    startTimerTick();
  };

  const startTimerTick = () => {
    console.log("startTimerTick", tick);
    timer.current = setInterval(() => {
      console.log("startTimerTick", tick);
      if (tick <= 0) handleCounterEnd();
      else setTick((tick) => tick - 1);
    }, 1000);
  };

  useEffect(() => {
    initialize();
    onWordStart();

    return () => clearInterval(timer.current);
  }, []);

  useEffect(() => initialize(), [factor]);

  return (
    <div className="wrap-counter">
      <div className="counter">
        <CircularProgressbar
          maxValue={max}
          value={tick}
          text={tick !== 0 ? tick : "Boo!"}
        />
      </div>
      <div className="word">
        {letters.map((l) => (
          <span
            className={l.state + (l.key === text.length ? " active" : "")}
            key={l.key}
          >
            {l.name}
          </span>
        ))}
      </div>

      <TextInput
        value={text}
        onChange={handleTextChanged}
        onKeyUp={handleTextKeyUp}
        autoFocus
      />
    </div>
  );
}

export default WordCounter;
