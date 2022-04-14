import React, { useState, useRef, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";

function FileUploader({
  orientation,
  selectedImage,
  filePickerFunc,
  imageFiles,
}) {
  const filePickerRef = useRef(null);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      selectedImage((prev) => [...prev, readerEvent.target.result]);
    };
  };

  const deletePicture = (removeIndex) => {
    selectedImage(() => {
      return imageFiles.filter((item, index) => index !== removeIndex);
    });
  };
  // useEffect(() => {
  //   selectedImage(selectedFile);

  // }, [selectedFile]);

  return (
    <div>
      <div className="picture-header">Upload Pictures</div>
      {imageFiles ? (
        <>
          <div className="picture-container">
            {imageFiles.map((img, index) => {
              return (
                <div className="picture-container-item">
                  <img height="125px" width="150px" src={img} alt="file" />

                  <img
                    src="/fixed/CloseButton.svg"
                    className="picture-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      deletePicture(index);
                    }}
                  />
                </div>
              );
            })}

            <div
              className="file-uploader"
              onClick={() => filePickerRef.current.click()}
            >
              <AddIcon fontSize="large" />
            </div>
          </div>
        </>
      ) : (
        <div
          className="file-uploader"
          onClick={() => filePickerRef.current.click()}
        >
          <AddIcon fontSize="large" />
        </div>
      )}

      <input
        type="file"
        ref={filePickerRef}
        multiple
        hidden
        onChange={addImageToPost}
      />
    </div>
  );
}

export default FileUploader;
