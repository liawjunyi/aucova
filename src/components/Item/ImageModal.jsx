import React, { useEffect } from "react";

function ImageModal({ show, onClose, img }) {
  useEffect(() => {}, [img]);
  return (
    <>
      {show && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <button className="btn-close" onClick={onClose}></button>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={img} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ImageModal;
