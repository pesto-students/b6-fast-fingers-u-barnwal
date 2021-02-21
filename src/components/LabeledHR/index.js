import React from "react";

function LabeledHR({ children }) {
  return (
    <div className="labeled-hr">
      <div></div>
      <span>{children}</span>
      <div></div>
    </div>
  );
}

export default LabeledHR;
