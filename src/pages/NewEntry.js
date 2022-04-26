import React, { useEffect, useState, useRef, createRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NewEntry2 from "../components/NewEntry/NewEntry2";
import NewEntry3 from "../components/NewEntry/NewEntry3";
import LongMenuEntry from "../components/NewEntry/LongMenuEntry";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { FormContext } from "../context/FormContext";
import CancelModal from "../components/NewEntry/CancelModal/CancelModal";
import { getStorage, ref } from "firebase/storage";

function NewEntry() {
  const [show, setShow] = useState(false);
  const [state, setState] = useState(1);
  const [input, setInput] = useState({
    category: "",
    title: null,
    img: [],
    type: [],
    description: "",
    location: "",
    purchase_price: {
      currency: "",
      value: "",
    },
    receipts: [],
    certificate: {
      type: "",
      img: [],
    },
    insurance: {
      name: "",
      value: "",
    },
    inheritance: {
      name: "",
      comments: "",
    },
  });
  const [categoryClicked, setCategoryClicked] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);

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

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ ...input });
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

  const categories = [
    "Rings",
    "Earrings",
    "Pendants",
    "Bracelets",
    "Brooches",
    "Gems",
    "Others",
  ];

  const categoryRefs = useRef([]);
  categoryRefs.current = categories.map(
    (_, i) => categoryRefs.current[i] ?? createRef()
  );
  console.log(categoryRefs.current);
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
  console.log(input);
  return (
    <div>
      <FormContext.Provider
        value={{
          input,
          setInput,
          setImageFiles,
          setShow,
        }}
      >
        <CancelModal
          show={show}
          onClose={() => setShow(false)}
          onSave={handleSubmit}
        />
        <form>
          {state === 1 && (
            <>
              <Header
                title="New Entry"
                leftButton={<img src="/fixed/Vector.png" />}
                handleLeftButton={(e) => {
                  e.preventDefault();
                  console.log("sdfsd");
                  setShow(true);
                }}
              />
              <div>What will you add to your porfolio today?</div>

              <div className="categories-container">
                {categories.map((category, index) => {
                  return (
                    <>
                      <div
                        className="category"
                        onClick={(e) => {
                          categoryRefs.current[index].current.click();
                          setState(2);
                        }}
                      >
                        <img src={`/categories/${category}.svg`}></img>
                      </div>
                      <input
                        type="radio"
                        value={category}
                        ref={categoryRefs.current[index]}
                        hidden
                        onChange={categoryOnClick}
                      />
                    </>
                  );
                })}
              </div>
            </>
          )}
          {state === 2 && (
            <>
              <Header
                title="New Entry"
                leftButton={<img src="/fixed/Back.svg" />}
                handleLeftButton={() => {
                  if (state === 2) {
                    setState(1);
                  } else {
                    setShow(true);
                  }
                }}
                rightButton={<img src="/fixed/Next.svg" />}
                handleRightButton={() => setState(3)}
              />
              <NewEntry2
                input={input}
                setInput={setInput}
                category={categoryClicked}
                selectedImage={selectedImage}
                imageFiles={imageFiles}
              />
            </>
          )}
          {state === 3 && (
            <>
              <Header
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
