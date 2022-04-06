import Accordion from "react-bootstrap/Accordion";
import React, { useState } from "react";
import CategoryModal from "./CategoryModal/CategoryModal";
import ItemSliderEntry from "./ItemSliderEntry";

function NewEntry3({ imageFiles, selectedImage, setInput, input, category }) {
  const [show, setShow] = useState(false);
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    console.log(input);
  };
  return (
    <div>
      <ItemSliderEntry imageFiles={imageFiles} selectedImage={selectedImage} />
      <div>
        <Accordion style={{ width: "100%" }} onClick={() => setShow(true)}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <strong>{category}</strong>
            </Accordion.Header>
          </Accordion.Item>
        </Accordion>
        <CategoryModal show={show} onClose={() => setShow(false)} />
      </div>
      <div>
        <label>
          Title of Piece
          <input
            name="title"
            type="text"
            onChange={handleInputChange}
            value={input.title}
          />
        </label>
      </div>
      <div>
        <label>
          Description
          <textarea
            name="description"
            type="text"
            onChange={handleInputChange}
            value={input.description}
          />
        </label>
      </div>
    </div>
  );
}

export default NewEntry3;
