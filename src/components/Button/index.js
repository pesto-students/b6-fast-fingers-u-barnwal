import React from "react";

function Button({ children, iconSrc = "", ...props }) {
  return (
    <div {...props}>
      {iconSrc !== "" ? <img src={iconSrc} alt="" /> : ""}
      <span>{children}</span>
    </div>
  );
}

export default Button;
