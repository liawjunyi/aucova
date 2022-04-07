import Accordion from "react-bootstrap/Accordion";
import { AccordionSummary } from "@mui/material";

import React, { useState } from "react";
import CategoryModal from "./CategoryModal/CategoryModal";
import ItemSliderEntry from "./ItemSliderEntry";

function NewEntry3({
  imageFiles,
  selectedImage,
  setInput,
  input,
  category,
  setCategory,
}) {
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
        <div className="accordion" onClick={() => setShow(true)}>
          <div className="accordion-item">
            <div className="accordion-header">
              <div className="accordion-button collapsed">
                <strong>{category}</strong>
              </div>
            </div>
          </div>
        </div>
        <CategoryModal
          show={show}
          onClose={() => setShow(false)}
          setCategory={setCategory}
        />
      </div>
      <div className="form">
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
            Diamonds / Gem Stones
            <input
              name="type"
              type="text"
              onChange={handleInputChange}
              value={input.type}
            />
          </label>
        </div>
        <div>
          <label>
            Description
            <input
              name="description"
              type="text"
              onChange={handleInputChange}
              value={input.description}
            />
          </label>
        </div>
        <div>
          <label>
            Location
            <input
              name="location"
              type="text"
              onChange={handleInputChange}
              value={input.location}
            />
          </label>
        </div>
        <div>
          <label>
            Purchase Price
            <input
              name="purchase_price"
              type="number"
              onChange={handleInputChange}
              value={input.purchase_price}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default NewEntry3;
