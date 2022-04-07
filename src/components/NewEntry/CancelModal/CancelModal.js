import React from "react";
import { Link } from "react-router-dom";
import "./Modal.css";

const CancelModal = ({ show, onClose }) => {
  return (
    <>
      {show && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">Save to Private?</div>
              <button className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              Only you can see this. You can come back any time to edit your
              entry.
            </div>
            <div className="modal-footer">
              <Link to="/portfolio">
                <button className="button btn-primary">Don't save</button>
              </Link>

              <button className="button btn-secondary">Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CancelModal;
