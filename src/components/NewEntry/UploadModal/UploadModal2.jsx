import React, { useContext, useEffect, useRef } from "react";
import "./UploadModal.css";
import { usePhotoGallery } from "../../../hooks/usePhotoGallery";
import { FormContext } from "../../../context/FormContext";

function UploadModal({ showUpload2, setShowUpload2 }) {
  const { setCertificate } = useContext(FormContext);
  const fileUploadRef = useRef(null);
  const uploadFile = (e) => {
    const formData = new FormData();

    formData.append("File", e.target.files[0]);
    console.log(...formData);
    setCertificate((prev) => [
      ...prev,
      {
        filepath: e.target.files[0].name,
        webviewPath: formData,
      },
    ]);
    setShowUpload2(false);
  };
  const { takePhoto, photos } = usePhotoGallery();
  useEffect(() => {
    if (photos) {
      setCertificate((prev) => {
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
        <div className={`upload-modal ${showUpload2 ? "show" : "hide"}`} />
        <div
          className={`upload-modal-content ${showUpload2 ? "show" : "hide"}`}
        >
          <div className="upload-modal-body">
            <div
              className="upload-button"
              onClick={() => {
                takePhoto();

                setShowUpload2(false);
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
                setShowUpload2(false);
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
