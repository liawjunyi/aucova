import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";

import AddIcon from "@mui/icons-material/Add";
const ItemSliderEntry = ({ imageFiles, selectedImage }) => {
  const settings = {
    infinite: false,
    centerMode: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  console.log(imageFiles);
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
  useEffect(() => {
    selectedImage(imageFiles);
  }, [imageFiles]);

  return (
    <div>
      <Slider {...settings}>
        {imageFiles.map((item) => {
          return (
            <div>
              <img src={item} width="100%" height="150"></img>
            </div>
          );
        })}
        <div
          className="file-uploader"
          onClick={() => filePickerRef.current.click()}
        >
          <AddIcon fontSize="large" />
        </div>
      </Slider>

      <input
        type="file"
        ref={filePickerRef}
        multiple
        hidden
        onChange={addImageToPost}
      />
    </div>
  );
};

export default ItemSliderEntry;
