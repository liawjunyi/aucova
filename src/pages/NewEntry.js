import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeaderEntry from "../components/NewEntry/HeaderEntry";
import NewEntry2 from "../components/NewEntry/NewEntry2";
import NewEntry3 from "../components/NewEntry/NewEntry3";
import LongMenuEntry from "../components/NewEntry/LongMenuEntry";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { FormContext } from "../context/FormContext";
import CancelModal from "../components/NewEntry/CancelModal/CancelModal";

function NewEntry() {
  const [state, setState] = useState(1);
  const [show, setShow] = useState(false);

  const [input, setInput] = useState({
    category: "",
    title: "",
    img: "",
    type: [],
    description: "",
    location: "",
    purchase_price: {
      currency: "",
      value: "",
    },
  });
  const [categoryClicked, setCategoryClicked] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [certificate, setCertificate] = useState([]);
  const [certificateType, setCertificateType] = useState(null);
  const [insurer, setInsurer] = useState(null);
  const [insuredValue, setInsuredValue] = useState(null);
  const [inheritanceName, setInheritanceName] = useState(null);
  const [additionalComments, setAdditionalComments] = useState(null);
  useEffect(() => {
    setInput((prev) => {
      return {
        ...prev,
        img: imageFiles,
      };
    });
  }, [imageFiles]);

  const selectedImage = (image) => {
    setImageFiles(image);
  };

  console.log(receipts);
  console.log(certificate);
  console.log(certificateType);
  const handleClose = () => setShow(false);
  const handleSave = () => {
    //   save as draft function
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "items"), {
      ...input,
    }).then((document) =>
      updateDoc(doc(db, "items", document.id), {
        id: document.id,
      })
    );
    navigate("/portfolio");
  };

  const options = [
    "Save(private)",
    "Publish To:",
    "Public View",
    "Marketplace",
  ];

  const ringsRef = useRef(null);
  const earringsRef = useRef(null);
  const pendantsRef = useRef(null);
  const braceletsRef = useRef(null);
  const broochesRef = useRef(null);
  const othersRef = useRef(null);

  const categoryOnClick = (e) => {
    setCategoryClicked(e.target.value);
  };

  useEffect(() => {
    setInput((prev) => {
      return {
        ...prev,
        category: categoryClicked,
      };
    });
  }, [categoryClicked]);

  return (
    <div>
      <CancelModal show={show} onClose={() => setShow(false)} />
      <FormContext.Provider
        value={{
          input,
          setInput,
          setReceipts,
          receipts,
          certificate,
          setCertificate,
          setCertificateType,
          setInsurer,
          setInsuredValue,
          setInheritanceName,
          setAdditionalComments,
        }}
      >
        <form>
          {state === 1 && (
            <>
              <HeaderEntry
                title="New Entry"
                leftButton={<img src="/fixed/Vector.png" />}
                handleLeftButton={(e) => {
                  e.preventDefault();

                  setShow(true);
                }}
              />
              <div>What will you add to your porfolio today?</div>

              <div className="categories-container">
                <div
                  className="category"
                  onClick={(e) => {
                    ringsRef.current.click();
                    setState(2);
                  }}
                >
                  <img src="/categories/rings.svg"></img>
                </div>
                <div
                  className="category"
                  onClick={(e) => {
                    earringsRef.current.click();
                    setState(2);
                  }}
                >
                  <img src="/categories/earrings.svg"></img>
                </div>
                <div
                  className="category"
                  onClick={(e) => {
                    pendantsRef.current.click();
                    setState(2);
                  }}
                >
                  <img src="/categories/pendants.svg"></img>
                </div>
                <div
                  className="category"
                  onClick={(e) => {
                    braceletsRef.current.click();
                    setState(2);
                  }}
                >
                  <img src="/categories/bracelets.svg"></img>
                </div>
                <div
                  className="category"
                  onClick={(e) => {
                    broochesRef.current.click();
                    setState(2);
                  }}
                >
                  <img src="/categories/brooches.svg"></img>
                </div>
                <div
                  className="category"
                  onClick={(e) => {
                    othersRef.current.click();
                    setState(2);
                  }}
                >
                  <img src="/categories/others.svg"></img>
                </div>
                <input
                  type="radio"
                  value="Rings"
                  ref={ringsRef}
                  hidden
                  onChange={categoryOnClick}
                />
                <input
                  type="radio"
                  value="Earrings"
                  ref={earringsRef}
                  hidden
                  onChange={categoryOnClick}
                />
                <input
                  type="radio"
                  value="Pendants"
                  ref={pendantsRef}
                  hidden
                  onChange={categoryOnClick}
                />
                <input
                  type="radio"
                  value="Bracelets"
                  ref={braceletsRef}
                  hidden
                  onChange={categoryOnClick}
                />
                <input
                  type="radio"
                  value="Brooches"
                  ref={broochesRef}
                  hidden
                  onChange={categoryOnClick}
                />
                <input
                  type="radio"
                  value="Others"
                  ref={othersRef}
                  hidden
                  onChange={categoryOnClick}
                />
              </div>
            </>
          )}
          {state === 2 && (
            <>
              <HeaderEntry
                title="New Entry"
                leftButton="Back"
                handleLeftButton={() => {
                  if (state === 2) {
                    setState(1);
                  } else {
                    setShow(true);
                  }
                }}
                rightButton="next"
                handleRightButton={() => setState(3)}
              />
              <NewEntry2
                category={categoryClicked}
                selectedImage={selectedImage}
                imageFiles={imageFiles}
              />
            </>
          )}
          {state === 3 && (
            <>
              <HeaderEntry
                title="Add Details"
                leftButton={<img src="/fixed/Vector.png" />}
                handleLeftButton={(e) => {
                  e.preventDefault();

                  setShow(true);
                }}
                rightButton={<LongMenuEntry options={options} />}
              />
              <NewEntry3
                imageFiles={imageFiles}
                selectedImage={selectedImage}
                setInput={setInput}
                input={input}
                category={categoryClicked}
                setCategory={setCategoryClicked}
              />
              <button className="saveBtn" onClick={handleSubmit} type="submit">
                Save(Private)
              </button>
            </>
          )}
        </form>
      </FormContext.Provider>
    </div>
  );
}

export default NewEntry;
