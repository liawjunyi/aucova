import React from "react";
import Slider from "react-slick";

const ItemSlider = (props) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings}>
        <div>
          <img src={props.img} width="100%" height="150"></img>
        </div>
      </Slider>
    </div>
  );
};

export default ItemSlider;
