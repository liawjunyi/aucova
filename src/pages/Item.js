import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import ItemSlider from "../components/ItemSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LongMenuItem from "../components/LongMenuItem";
import axios from "axios";

function Item() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const res = await getDocs(collection(db, "items"));
    console.log(res.docs);
    res.forEach((doc) => {
      console.log(doc.data());
    });
  };

  useEffect(() => {
    fetchItems();
  }, []);
  console.log(items);

  const id = useParams().id;

  const options = [
    "Edit",
    "Delete",
    "Publish To:",
    "Private Only",
    "Public View",
    "Marketplace",
  ];

  const deleteItem = async () => {
    await deleteDoc(doc(db, "items", id));
  };
  let navigate = useNavigate();
  const deleteEntry = () => {
    setItems(items.filter((item) => item.id !== id));
    deleteItem();
    navigate("/portfolio");
  };

  const item = items.find((item) => item.id == id);

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
