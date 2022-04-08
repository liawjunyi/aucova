import React, { useState, useRef } from "react";
import CategoryModal from "./CategoryModal/CategoryModal";
import ItemSliderEntry from "./ItemSliderEntry";
import Select from "react-select";

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

  const options = [
    { value: "Diamonds", label: "Diamonds" },
    { value: "Ruby", label: "Ruby" },
    { value: "Sapphire", label: "Sapphire" },
    { value: "Ruby", label: "Ruby" },
    { value: "Ruby", label: "Ruby" },
  ];
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
        <div className="form-container">
          <label>
            Title of Piece
            <input
              autocomplete="off"
              name="title"
              type="text"
              onChange={handleInputChange}
              value={input.title}
            />
          </label>
        </div>
        <div className="form-container">
          <label>
            Diamonds / Gem Stones
            <Select
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Eg. Diamond, Ruby, Sapphire"
              options={options}
              onChange={(item) =>
                setInput((prev) => {
                  return {
                    ...prev,
                    type: item.label,
                  };
                })
              }
            />
            <p>{input.type}</p>
          </label>
        </div>
        <div className="form-container">
          <label>
            Description
            <input
              autocomplete="off"
              name="description"
              type="text"
              onChange={handleInputChange}
              value={input.description}
            />
          </label>
        </div>
        <div className="form-container">
          <label>
            Location
            <input
              autocomplete="off"
              name="location"
              type="text"
              onChange={handleInputChange}
              value={input.location}
            />
          </label>
        </div>
        <div className="form-container">
          <label>
            Purchase Price
            <input
              autocomplete="off"
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
