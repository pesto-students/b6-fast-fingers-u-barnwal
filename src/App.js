import React from "react";
import "./css/App.css";

// + Image
import imgLogo from "./images/logo.svg";

function App() {
  return (
    <main>
      <div className="landing">
        <img src={imgLogo} alt="" />

        <h1>Fast Fingers</h1>

        <div className="labeled-hr">
          <div></div>
          <span>The ultimate typing game</span>
          <div></div>
        </div>

        <div className="wrap-inputs">
          <input type="text" placeholder="Type your name..." />
        </div>
      </div>

      <div className="game"></div>
    </main>
  );
}

export default App;
