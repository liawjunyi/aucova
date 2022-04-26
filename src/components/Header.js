import React from "react";

export default function Header({
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
        <div className="navbar-title mx-auto mt-1">{title}</div>
        <button className="roundButton" onClick={handleRightButton}>
          {rightButton}
        </button>
      </div>
    </nav>
  );
}
