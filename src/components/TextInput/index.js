import React from "react";

// TODO: handle onChange here only

function TextInput({ type = "text", ...props }) {
  return <input type={type} {...props} />;
}

export default TextInput;
