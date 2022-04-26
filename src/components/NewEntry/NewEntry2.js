import React from "react";
import FileUploader from "./FileUploader";

function NewEntry2({
  category,
  selectedImage,
  filePickerFunc,
  imageFiles,
  setInput,
  input,
}) {
  const renderSwitch = () => {
    switch (category) {
      case "rings":
        return <img src="/categories/rings.svg" />;
      case "earrings":
        return <img src="/categories/earrings.svg" />;
      case "pendants":
        return <img src="/categories/pendants.svg" />;
      case "bracelets":
        return <img src="/categories/bracelets.svg" />;
      case "brooches":
        return <img src="/categories/brooches.svg" />;
      case "others":
        return <img src="/categories/others.svg" />;
    }
  };

  return (
    <>
      <div>
        {renderSwitch()}
        <div>
          <p>Please upload at least 5 photos</p>
          <p>Views: Top, bottom, two sides and as worn</p>
        </div>
      </div>
      <FileUploader
        input={input}
        setInput={setInput}
        selectedImage={selectedImage}
        filePickerFunc={filePickerFunc}
        imageFiles={imageFiles}
      />
    </>
  );
}

export default NewEntry2;
