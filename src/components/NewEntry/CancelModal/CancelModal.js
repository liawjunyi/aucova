import React from "react";
import { useNavigate } from "react-router-dom";

import "./Modal.css";

const CancelModal = ({ show, onClose, onSave }) => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/portfolio");
  };
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
              <button className="button btn-negative" onClick={redirect}>
                Don't save
              </button>

              <button className="button btn-positive" onClick={onSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CancelModal;
