import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderEntry from "../components/NewEntry/HeaderEntry";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import ItemSlider from "../components/ItemSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LongMenuItem from "../components/LongMenuItem";

function Item() {
  const [items, setItems] = useState([]);

  const jewellery = [];
  const fetchItems = async () => {
    const res = await getDocs(collection(db, "items"));

    res.forEach((doc) => {
      jewellery.push(doc.data());
    });
    setItems([...jewellery]);
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
          <HeaderEntry
            title={item.category}
            leftbutton={<img src="/fixed/Back.svg" />}
          >
            <LongMenuItem deleteEntry={deleteEntry} options={options} />
          </HeaderEntry>
          <ItemSlider img={item.img} />
          <div className="form">
            <div>
              <label>Diamonds / Gem Stones</label>
              <div>{item.type}</div>
            </div>
            <div>
              <label>Description</label>
              <div>{item.description}</div>
            </div>
            <div>
              <label>Location</label>
              <div>{item.location}</div>
            </div>
            <div>
              <label>Purchase Price</label>
              <div>{item.purchase_price}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Item;
