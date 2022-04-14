import React, { useState, useContext } from "react";
import CategoryModal from "./CategoryModal/CategoryModal";
import ItemSliderEntry from "./ItemSliderEntry";
import Select from "react-select";
import UploadModal from "./UploadModal/UploadModal";
import UploadModal2 from "./UploadModal/UploadModal2";
import { FormContext } from "../../context/FormContext";
import {
  options_type,
  options_currency,
  options_certificate,
  typeStyle,
  currencyStyle,
  certificateStyle,
} from "./SelectStyles";

function NewEntry3({ imageFiles, selectedImage, category, setCategory }) {
  const [show, setShow] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showUpload2, setShowUpload2] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const {
    input,
    setInput,
    receipts,
    setReceipts,
    certificate,
    setCertificate,
    setCertificateType,
    setInsurer,
    setInsuredValue,
    setInheritanceName,
    setAdditionalComments,
  } = useContext(FormContext);
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

  const openUpload = (e) => {
    e.preventDefault();
    setShowUpload(true);
  };
  const openUpload2 = (e) => {
    e.preventDefault();

    setShowUpload2(true);
  };
  const deleteCertificate = (removeIndex) => {
    setCertificate(() => {
      return certificate.filter((item, index) => index !== removeIndex);
    });
  };
  const deleteReceipts = (removeIndex) => {
    setReceipts(() => {
      return receipts.filter((item, index) => index !== removeIndex);
    });
  };
  return (
    <div>
      <UploadModal showUpload={showUpload} setShowUpload={setShowUpload} />
      <UploadModal2 showUpload2={showUpload2} setShowUpload2={setShowUpload2} />
      <ItemSliderEntry imageFiles={imageFiles} selectedImage={selectedImage} />
      <p>Tap photos to delete or replace</p>
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
              placeholder="Eg. “The Blue Souffle” or “Diamond Ring”"
            />
          </label>
        </div>
        <div className="form-container">
          <label>
            Diamonds / Gem Stones
            <Select
              styles={typeStyle}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Eg. Diamond, Ruby, Sapphire"
              options={options_type}
              onChange={(item) => {
                input.type.includes(item.label)
                  ? console.log("item already selected")
                  : setInput((prev) => {
                      return {
                        ...prev,
                        type: [...prev.type, item.label],
                      };
                    });
              }}
            />
            <div className="selected-type">
              {input.type.map((type, index) => {
                return (
                  <span
                    style={{
                      marginRight: "10px",

                      border: "1px solid #B3995B",
                      borderTopRightRadius: "50px",
                      borderTopLeftRadius: "50px",
                      borderBottomRightRadius: "50px",
                      borderBottomLeftRadius: "50px",
                    }}
                  >
                    {type}
                    <img
                      src="/fixed/CloseButton.svg"
                      onClick={() =>
                        setInput((prev) => {
                          const array = [...prev.type];
                          array.splice(index, 1);
                          return {
                            ...prev,
                            type: array,
                          };
                        })
                      }
                    />
                  </span>
                );
              })}
            </div>
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
              placeholder="Eg. Birthday present to myself"
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
              placeholder="Eg. Home, bank, safe"
            />
          </label>
        </div>
        <div className="form-container">
          <label>
            Purchase Price
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Select
                styles={currencyStyle}
                className="basic-single"
                classNamePrefix="select"
                placeholder="SGD $"
                options={options_currency}
                onChange={(currency) => {
                  setInput((prev) => {
                    return {
                      ...prev,
                      purchase_price: {
                        ...prev.purchase_price,
                        currency: currency.label,
                      },
                    };
                  });
                }}
              />
              <span style={{ margin: "5px" }}></span>
              <input
                autocomplete="off"
                name="purchase_price"
                type="number"
                onChange={handleInputChange}
                value={input.purchase_price.value}
              />
            </div>
          </label>
        </div>

        <div className="form-container">
          <label>Receipts & Documents</label>
          <p>upload documents and receipts</p>
          <div>
            <button className="upload-btn" onClick={openUpload}>
              Upload
            </button>
          </div>

          <div>
            {receipts.map((photo, index) => (
              <div key={{ index }} style={{ margin: "10px" }}>
                <img src="/fixed/document.svg" />
                <span style={{ marginLeft: "10px" }}>{photo.filepath}</span>
                <img
                  src="/fixed/CloseButton.svg"
                  className="picture-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteReceipts(index);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="form-container">
          <label>Certificate Type</label>
          <Select
            styles={certificateStyle}
            options={options_certificate}
            className="basic-single"
            classNamePrefix="select"
            placeholder="If any"
            onChange={(item) => {
              setCertificateType(item.label);
            }}
          />
          <div>
            <label>Certificate</label>
            <p>Upload a photo or digital copy of your item's certificate</p>
            <div>
              <button className="upload-btn" onClick={openUpload2}>
                Upload
              </button>
              <div>
                {certificate.map((photo, index) => (
                  <div key={{ index }} style={{ margin: "10px" }}>
                    <img src="/fixed/document.svg" />
                    <span style={{ marginLeft: "10px" }}>{photo.filepath}</span>
                    <img
                      src="/fixed/CloseButton.svg"
                      className="picture-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteCertificate(index);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* start of footer accordion */}
        <div className="form-footer">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
                onClick={(e) => {
                  e.preventDefault();
                  setExpanded(!expanded);
                }}
              >
                <img src={expanded ? "/fixed/Minus.svg" : "/fixed/Plus.svg"} />
                <span>Insurance Details</span>
              </button>
              <div
                id="collapseOne"
                class="accordion-collapse collapse"
                aria-labelledby="headingOne"
              >
                <div class="accordion-body">
                  <div className="form-container">
                    <label>
                      Insurance Details
                      <input
                        autoComplete="off"
                        name="location"
                        type="text"
                        onChange={handleInputChange}
                        value={input.location}
                        placeholder="Insurer"
                      />
                      <input
                        autoComplete="off"
                        name="location"
                        type="text"
                        onChange={handleInputChange}
                        value={input.location}
                        placeholder="Insured Value"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
                onClick={(e) => {
                  e.preventDefault();
                  setExpanded2(!expanded2);
                }}
              >
                <img src={expanded2 ? "/fixed/Minus.svg" : "/fixed/Plus.svg"} />
                <span>Inheritance Planning</span>
              </button>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
              >
                <div class="accordion-body">
                  <div className="form-container">
                    <label>
                      Inheritance Planning
                      <input
                        autocomplete="off"
                        name="location"
                        type="text"
                        value={input.location}
                        placeholder="Recipient's Name"
                      />
                      <label>
                        Notes
                        <input type="text" placeholder="Additional Comments" />
                      </label>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewEntry3;
