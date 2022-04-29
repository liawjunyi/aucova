import React from "react";

function Modal({ showUpload, setShowUpload, profileRef, removeProfilePic }) {
  return (
    <>
      <div>
        <div className={`upload-modal ${showUpload ? "show" : "hide"}`} />
        <div className={`upload-modal-content ${showUpload ? "show" : "hide"}`}>
          <div className="upload-modal-body">
            <div
              className="upload-button"
              onClick={() => {
                profileRef.current.click();
                setShowUpload(false);
              }}
            >
              Upload from phone
            </div>
            <div
              className="upload-button"
              onClick={() => {
                removeProfilePic();
                setShowUpload(false);
              }}
            >
              Remove profile picture
            </div>

            <div
              className="cancel-button"
              onClick={() => {
                setShowUpload(false);
              }}
            >
              Cancel
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
