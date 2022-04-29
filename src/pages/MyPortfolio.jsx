import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Accordion } from "react-bootstrap";
import Tabs from "../components/Tabs";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Menu from "../components/Menu";
import MenuButton from "../components/MenuButton";
import CategoryModal from "../components/NewEntry/CategoryModal/CategoryModal";

function MyPortfolio() {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  const [filteredItems, setFilteredItems] = useState([]);

  const fetchItems = async () => {
    await onSnapshot(collection(db, "items"), (res) => {
      res.forEach((doc) => {
        console.log(doc.data());
        setItems((prev) => [...prev, doc.data()]);
        setFilteredItems((prev) => [...prev, doc.data()]);
      });
    });
  };

  const setFilter = (cat) => {
    switch (cat) {
      case "Rings":
        setFilteredItems(items.filter((item) => item.category === "Rings"));
        break;
      case "Earrings":
        setFilteredItems(items.filter((item) => item.category === "Earrings"));
        break;
      case "Pendants / Necklaces":
        setFilteredItems(
          items.filter((item) => item.category === "Pendants / Necklaces")
        );
        break;
      case "Bracelets / Bangles":
        setFilteredItems(
          items.filter((item) => item.category === "Bracelets / Bangles")
        );
        break;
      case "Brooches":
        setFilteredItems(items.filter((item) => item.category === "Brooches"));
        break;
      case "Gems":
        setFilteredItems(items.filter((item) => item.category === "Gems"));
        break;
      case "Others":
        setFilteredItems(items.filter((item) => item.category === "Others"));
        break;
      default:
        setFilteredItems(items);
        break;
    }
  };
  const handleMouseDown = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    fetchItems();
  }, []);
  console.log(items);

  const categories = [
    "View all",
    "Rings",
    "Earrings",
    "Pendants / Necklaces",
    "Bracelets / Bangles",
    "Brooches",
    "Gems",
    "Others",
  ];
  return (
    <div>
      <CategoryModal
        show={show}
        onClose={() => setShow(false)}
        setInput={setFilter}
        header="View by Categories"
        categories={categories}
      />
      {items.length > 0 && (
        <>
          <Header
            title="My Portfolio"
            leftButton={<MenuButton handleMouseDown={handleMouseDown} />}
          />
          <Menu menuVisibility={visible} handleMouseDown={handleMouseDown} />
          <div className="flex-column ">
            <div className="d-flex justify-content-center">
              <Avatar
                style={{
                  justifyContent: "center",
                  display: "flex",
                  margin: "none",
                }}
                alt="Remy Sharp"
                src="/jewelleryProfilePic.jpg"
                sx={{ width: 100, height: 100 }}
              />
            </div>

            <h1 className=" d-flex justify-content-center">
              The Duchess of Bling
            </h1>
          </div>
          <Accordion style={{ width: "100%" }}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <strong>Total Value</strong>
              </Accordion.Header>
              <Accordion.Body className="flex-column">
                <div className="d-flex justify-content-between">
                  <p>Total No. of Pieces</p>
                  <p>10</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Assessed</p>
                  <p>4</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Assessed Replacement Value</p>
                  <p>S$</p>
                  <p>30000</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p>Total Assessed Value</p>
                  <p>S$</p>
                  <p>30000</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p>Value Unknown</p>
                  <p>6</p>
                </div>
                <Link
                  className="d-flex justify-content-center"
                  to="/assessment"
                >
                  Request for assessment
                </Link>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Tabs items={filteredItems} setShow={setShow} />
          <div className={`item-container ${items.length > 0 ? "active" : ""}`}>
            <div>
              <div
                className={`item-container-text ${
                  items.length > 0 ? "active" : ""
                }`}
              >
                Create your Jewellery Portfolio now
              </div>
              <div
                className={`item-container-body ${
                  items.length > 0 ? "active" : ""
                }`}
              ></div>
            </div>
          </div>
          <Link to="/portfolio/newentry">
            <Fab className="item-container button" aria-label="add">
              <AddIcon />
            </Fab>
          </Link>
        </>
      )}
    </div>
  );
}

export default MyPortfolio;
