import React from "react";
import "./Modal.css";

function CategoryModal({ show, onClose }) {
  let className = "categorymenu";
  if (show) {
    className += " show";
  } else {
    className += " hide";
  }

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

      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        <li className="nav-item">Rings</li>
        <li className="nav-item">Earrings</li>
        <li className="nav-item">Bracelets/Bangles</li>
        <li className="nav-item">
          <a className="nav-link " href="#">
            Brooches
          </a>
        </li>
      </ul>
    </div>
  );
}

export default CategoryModal;
