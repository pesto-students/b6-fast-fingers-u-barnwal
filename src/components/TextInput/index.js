import React from "react";

function TextInput({ type = "text", ...props }) {
  return <input type={type} {...props} />;
}

export default TextInput;
