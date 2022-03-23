import React from "react";
import Slider from "react-slick";
import items from "../db.json";

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
        {items.map((item, index) => (
          <div key={index}>
            <img src={item.img} width="100%" height="150"></img>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ItemSlider;
