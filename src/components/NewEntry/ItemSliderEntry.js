import React, { useRef } from "react";
import Slider from "react-slick";

const ItemSliderEntry = ({ setInput, input }) => {
  const settings = {
    infinite: false,
    centerMode: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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

  return (
    <div>
      <Slider {...settings}>
        {input.img.map((item, index) => {
          return (
            <div onClick={() => deletePicture(index)}>
              <img src={item} width="100%" height="189"></img>
            </div>
          );
        })}
        <div>
          <div
            className="file-uploader"
            onClick={() => filePickerRef.current.click()}
          >
            <img src="/fixed/AddIcon.svg" />
          </div>
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
