import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { updateDoc, getDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import ItemSlider from "../components/ItemSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LongMenuItem from "../components/LongMenuItem";
import Header from "../components/Header";
import LongMenuEntry from "../components/NewEntry/LongMenuEntry";

import NewEntry3 from "../components/NewEntry/NewEntry3";
import CancelModal from "../components/NewEntry/CancelModal/CancelModal";
import ImageModal from "../components/Item/ImageModal";

function Item() {
  const [item, setItem] = useState(null);
  const [showEdit, setShowEdit] = useState(0);
  const [show, setShow] = useState(false);
  const [showImg, setShowImg] = useState(false);

  const [img, setImg] = useState();
  const id = useParams().id;

  const fetchItems = async () => {
    const res = await getDoc(doc(db, "items", id));
    setItem(res.data());

    console.log(res);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const options = [
    "Edit",
    "Delete",
    "Publish To:",
    "Private Only",
    "Public View",
    "Marketplace",
  ];

  const editEntry = () => {
    setShowEdit(1);
  };

  const onClose = () => {
    setShowImg(false);
  };
  console.log(item);

  let navigate = useNavigate();
  const deleteEntry = async () => {
    await deleteDoc(doc(db, "items", id));
    navigate("/portfolio");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateDoc(doc(db, "items", id), {
      ...item,
    });

    navigate("/portfolio");
  };

  return (
    <>
      {showEdit === 0 && Boolean(item) && (
        <>
          <Header
            title={item.category}
            leftButton={<img src="/fixed/Back.svg" />}
            handleLeftButton={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            rightButton={
              <LongMenuItem
                deleteEntry={deleteEntry}
                editEntry={editEntry}
                options={options}
              />
            }
          ></Header>
          <ItemSlider img={item?.img} />
          <div className="detail-title">
            <div>{item.title}</div>
          </div>
          <div className="form">
            <div className="form-container">
              <label>Diamonds / Gem Stones</label>
              <div>
                {item.type.length > 0 ? (
                  item.type.map((type) => (
                    <div
                      style={{
                        display: "inline-block",
                        marginTop: "14px",
                        marginBottom: "14px",
                        marginRight: "10px",
                        border: "2px solid #B3995B",
                        borderRadius: "26px",
                        padding: "5px 12px 5px 12px",
                        width: "fit-content",
                      }}
                    >
                      {type}
                    </div>
                  ))
                ) : (
                  <div>None</div>
                )}
              </div>
            </div>
            <div className="form-container">
              <label>Description</label>
              <div>{item.description || "None"}</div>
            </div>
            <div className="form-container">
              <label>Location</label>
              <div>{item.location || "None"}</div>
            </div>
            <div className="form-container">
              <label>Purchase Price</label>
              <p>Historical Value</p>
              <div>
                {item.purchase_price.currency}
                {item.purchase_price?.value || "None"}
              </div>
            </div>
            <ImageModal show={showImg} onClose={onClose} img={img}></ImageModal>
            <div className="form-container">
              <label>Receipts & Documents</label>

              {item.receipts.map((receipt, index) => {
                console.log(receipt);
                return (
                  <div key={{ index }} style={{ margin: "10px" }}>
                    <img src="/fixed/document.svg" />
                    <span
                      style={{
                        marginLeft: "10px",
                        textDecoration: "underline",
                      }}
                      onClick={() => {
                        setShowImg(true);
                        setImg(receipt.webPath);
                      }}
                    >
                      {receipt.filePath}
                    </span>
                  </div>
                );
              }) || <div>None</div>}
            </div>
            <div className="form-container">
              <label>Certificate Type</label>
              <div>{item.certificate.type}</div>
              <div style={{ margin: "20px 10px" }}>
                <label>Certificate</label>
                {item.certificate.img.map((cert, index) => {
                  console.log(cert.filePath);
                  return (
                    <div
                      key={{ index }}
                      style={{ margin: "10px", textDecoration: "underline" }}
                    >
                      <img src="/fixed/document.svg" />
                      <span
                        style={{ marginLeft: "10px" }}
                        onClick={() => {
                          setShowImg(true);
                          setImg(cert.webPath);
                        }}
                      >
                        {cert.filePath}
                      </span>
                    </div>
                  );
                }) || <div>None</div>}
              </div>
            </div>
            <div className="form-container">
              <label>Insurance</label>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ marginTop: "20px" }}>
                  <p>Insurer</p>
                  <div
                    style={{
                      border: "1px solid black",
                      borderWidth: "0 0 1px 0",
                    }}
                  >
                    {item.insurance.name || "None"}
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <p>Insured Value</p>
                    <div
                      style={{
                        border: "1px solid black",
                        borderWidth: "0 0 1px 0",
                      }}
                    >
                      {item.insurance.value || "None"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-container">
              <label>Inheritance Planning</label>
              <p>{`For: ${item.inheritance.name || "None"}`}</p>
              <div style={{ margin: "20px 10px" }}>
                <label>Notes</label>
                <div
                  style={{
                    border: "1px solid black",
                    borderWidth: "0 0 1px 0",
                  }}
                >
                  {item.inheritance.comments || "None"}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {showEdit === 1 && (
        <>
          <CancelModal
            show={show}
            onClose={() => setShow(false)}
            onSave={handleSubmit}
          />
          <Header
            title="Add Details"
            leftButton={<img src="/fixed/Vector.png" />}
            handleLeftButton={(e) => {
              e.preventDefault();

              setShow(true);
            }}
            rightButton={<LongMenuEntry options={options} />}
          />
          <NewEntry3 input={item} imageFiles={item.img} setInput={setItem} />
          <button className="saveBtn" onClick={handleSubmit} type="submit">
            Save(Private)
          </button>
        </>
      )}
    </>
  );
}

export default Item;
