import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

import ItemSlider from "../components/ItemSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LongMenuItem from "../components/LongMenuItem";
import axios from "axios";

function Item() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const res = await axios
      .get("http://localhost:3000/items")
      .catch((err) => console.log(err.message));
    console.log(res.data);
    setItems(res.data);
  };

  useEffect(() => {
    console.log("test");
    fetchItems();
  }, []);

  const id = parseInt(useParams().id);

  const options = [
    "Edit",
    "Delete",
    "Publish To:",
    "Private Only",
    "Public View",
    "Marketplace",
  ];

  const deleteItem = async () => {
    await axios
      .delete("http://localhost:3000/items/" + id)
      .then(() => console.log("can"))
      .catch((err) => {
        console.log(err.message);
      });
  };
  let navigate = useNavigate();
  const deleteEntry = () => {
    setItems(items.filter((item) => item.id !== id));
    deleteItem();
    navigate("/portfolio");
  };

  const item = items.find((item) => item.id === id);

  return (
    <>
      {items.length > 0 && (
        <>
          <Header title={item.title}>
            <LongMenuItem deleteEntry={deleteEntry} options={options} />
          </Header>
          <ItemSlider img={item.img} />
          <div>{item.title}</div>
        </>
      )}
    </>
  );
}

export default Item;
