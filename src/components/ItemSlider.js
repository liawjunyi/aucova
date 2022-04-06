import React from "react";
import Slider from "react-slick";

const ItemSlider = ({ img }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings}>
        {img.map((item) => {
          return (
            <div>
              <img src={item} width="100%" height="150"></img>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ItemSlider;
