import React, { useState } from "react";
import Difficulty from "../../../../components/Difficulty";

// + Resources
import { difficulties } from "../../../../constants";

// + Components

function Difficulties({ onDifficultyChanged }) {
  const [selected, setSelected] = useState({});

  const handleDifficultySelect = (selected) => {
    setSelected(selected);
    onDifficultyChanged(selected);
  };

  return (
    <div className="wrap-difficulty">
      {Object.keys(difficulties).map((k) => {
        const difficulty = difficulties[k];
        return (
          <Difficulty
            key={difficulty.key}
            difficulty={difficulty}
            active={selected.key === difficulty.key}
            onClick={handleDifficultySelect}
          />
        );
      })}
    </div>
  );
}

export default Difficulties;
