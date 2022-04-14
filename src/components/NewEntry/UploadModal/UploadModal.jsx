import React, { useContext, useEffect, useRef } from "react";
import "./UploadModal.css";
import { usePhotoGallery } from "../../../hooks/usePhotoGallery";
import { FormContext } from "../../../context/FormContext";

function UploadModal({ showUpload, setShowUpload }) {
  const { setReceipts } = useContext(FormContext);
  const fileUploadRef = useRef(null);
  const uploadFile = (e) => {
    const formData = new FormData();

    formData.append("File", e.target.files[0]);
    console.log(...formData);
    setReceipts((prev) => [
      ...prev,
      {
        filepath: e.target.files[0].name,
        webviewPath: formData,
      },
    ]);
    setShowUpload(false);
  };
  const { takePhoto, photos } = usePhotoGallery();
  useEffect(() => {
    if (photos) {
      setReceipts((prev) => {
        console.log(photos);
        const fileName = new Date().getTime() + ".jpeg";
        return [
          ...prev,
          {
            filepath: fileName,
            webviewPath: photos.webPath,
          },
        ];
      });
    }
  }, [photos]);

  return (
    <>
      <div>
        <div className={`upload-modal ${showUpload ? "show" : "hide"}`} />
        <div className={`upload-modal-content ${showUpload ? "show" : "hide"}`}>
          <div className="upload-modal-body">
            <div
              className="upload-button"
              onClick={() => {
                takePhoto();

                setShowUpload(false);
              }}
            >
              Take a photo
            </div>
            <div
              className="upload-button"
              onClick={() => fileUploadRef.current.click()}
            >
              Upload from phone
            </div>
            <input
              type="file"
              onChange={uploadFile}
              hidden
              ref={fileUploadRef}
            />
            <div
              className="cancel-button"
              onClick={(e) => {
                e.preventDefault();
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

export default UploadModal;
