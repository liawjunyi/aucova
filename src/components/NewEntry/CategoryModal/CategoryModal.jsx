import React from "react";
import "./Modal.css";

function CategoryModal({ show, onClose, setInput, header, categories }) {
  return (
    <div className={`categorymenu ${show ? "show" : "hide"}`}>
      <div className="categorymenu-header">
        <div className="categorymenu-title">{header}</div>
        <button
          className="btn-close"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        ></button>
      </div>
      {/* setInput((prev) => {
                return { ...prev, category: cat };
              }); */}
      <ul className="navbar-nav mb-2 mb-lg-0">
        {categories.map((cat) => {
          return (
            <li
              className="nav-item"
              onClick={() => {
                setInput(cat);
                onClose();
              }}
              value={cat}
            >
              {cat}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CategoryModal;
