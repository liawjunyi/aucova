import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import items from "../db.json";
import ItemSlider from "../components/ItemSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LongMenu from "../components/LongMenu";

function Item() {
  const { id } = useParams();

  const item = items.find((item) => item.id == id);
  return (
    <>
      <Header title={item.title}>
        <LongMenu />
      </Header>
      <ItemSlider img={item.img} />
    </>
  );
}

export default Item;
