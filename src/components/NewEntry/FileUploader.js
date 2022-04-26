import React, { useRef } from "react";

function FileUploader({ selectedImage, imageFiles, setInput, input }) {
  const filePickerRef = useRef(null);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setInput((prev) => {
        return {
          ...prev,
          img: [...prev.img, readerEvent.target.result],
        };
      });
    };
  };

  const deletePicture = (removeIndex) => {
    setInput((prev) => {
      return {
        ...prev,
        img: input.img.filter((item, index) => index !== removeIndex),
      };
    });
  };
  console.log(imageFiles);
  return (
    <div>
      <div className="picture-header">Upload Pictures</div>
      {input.img.length > 0 ? (
        <>
          <div className="picture-container">
            {input.img.map((img, index) => {
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
            <div style={{ height: "110px", width: "110px", margin: "0 37px" }}>
              <div
                className="file-uploader"
                onClick={() => filePickerRef.current.click()}
              >
                <img src="/fixed/AddIcon.svg" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div style={{ height: "110px", width: "110px", margin: "0 37px" }}>
          <div
            className="file-uploader"
            onClick={() => filePickerRef.current.click()}
          >
            <img src="/fixed/AddIcon.svg" />
          </div>
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
