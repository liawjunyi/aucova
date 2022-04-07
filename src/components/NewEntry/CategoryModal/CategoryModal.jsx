import React from "react";
import "./Modal.css";

function CategoryModal({ show, onClose, setCategory }) {
  let className = "categorymenu";
  if (show) {
    className += " show";
  } else {
    className += " hide";
  }

  const categories = [
    "Rings",
    "Earrings",
    "Pendants / Necklaces",
    "Bracelets / Bangles",
    "Brooches",
    "Gems",
    "Others",
  ];

  return (
    <div className={className}>
      <div className="categorymenu-header">
        <div className="categorymenu-title">Category</div>
        <button
          className="btn-close"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        ></button>
      </div>

      <ul className="navbar-nav mb-2 mb-lg-0">
        {categories.map((category) => (
          <li
            className="nav-item"
            onClick={() => {
              setCategory(category);
              onClose();
            }}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryModal;
