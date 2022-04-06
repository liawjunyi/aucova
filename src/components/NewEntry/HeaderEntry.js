import React from "react";

export default function HeaderEntry({
  title,
  rightButton,
  handleRightButton,
  leftButton,
  handleLeftButton,
}) {
  return (
    <nav className=" navbar navbar-expand-lg navbar-light">
      <div className="container">
        <button className="roundButton" onClick={handleLeftButton}>
          {leftButton}
        </button>
        <h1 className="navbar-brand mx-auto">{title}</h1>
        <button className="roundButton" onClick={handleRightButton}>
          {rightButton}
        </button>
      </div>
    </nav>
  );
}
