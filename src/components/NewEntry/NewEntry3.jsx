import React, { useEffect, useState } from "react";
import CategoryModal from "./CategoryModal/CategoryModal";
import ItemSliderEntry from "./ItemSliderEntry";
import Select from "react-select";
import UploadModal from "./UploadModal/UploadModal";
import { storage } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";
import {
  options_type,
  options_currency,
  options_certificate,
  typeStyle,
  currencyStyle,
  certificateStyle,
} from "./SelectStyles";

function NewEntry3({ imageFiles, input, setInput }) {
  const [show, setShow] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadClicked, setUploadClicked] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(false);

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

    setUploadClicked(e.target.name);
    setShowUpload(true);
  };

  const deleteCertificate = (removeIndex, fileName) => {
    setInput((prev) => {
      return {
        ...prev,
        certificate: {
          ...prev.certificate,
          img: input.certificate.img.filter(
            (item, index) => index !== removeIndex
          ),
        },
      };
    });
    const certificateRef = ref(storage, `certificate/${fileName}`);
    deleteObject(certificateRef);
  };

  const deleteReceipts = (removeIndex, fileName) => {
    setInput((prev) => {
      return {
        ...prev,
        receipts: input.receipts.filter((item, index) => index !== removeIndex),
      };
    });
    const receiptsRef = ref(storage, `receipts/${fileName}`);
    deleteObject(receiptsRef);
  };
  console.log(input.receipts);
  console.log(input);

  const categories = [
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
      <UploadModal
        showUpload={showUpload}
        setShowUpload={setShowUpload}
        uploadClicked={uploadClicked}
        setInput={setInput}
        input={input}
      />

      <ItemSliderEntry
        imageFiles={imageFiles}
        setInput={setInput}
        input={input}
      />
      <p style={{ margin: "0 50px 15px" }}>Tap photos to delete or replace</p>
      <div>
        <div className="accordion" onClick={() => setShow(true)}>
          <div className="accordion-item">
            <div className="accordion-header">
              <div className="accordion-button collapsed ">
                <div>{input.category}</div>
              </div>
            </div>
          </div>
        </div>
        <CategoryModal
          show={show}
          onClose={() => setShow(false)}
          setInput={setInput}
          header="category"
          categories={categories}
        />
      </div>
      <div className="compulsory-text ">
        <p>* indicates compulsory field, all others optional.</p>
      </div>
      <div className="form">
        <div className="form-container">
          <label>
            Title of Piece
            <div className="asterisk">*</div>
            <input
              autocomplete="off"
              required="required"
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
            <p>Input type of stone and select from the list</p>
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
                  <div
                    style={{
                      display: "inline-block",
                      marginTop: "14px",
                      marginRight: "10px",
                      border: "2px solid #B3995B",
                      borderRadius: "26px",
                      padding: "5px 12px 5px 12px",
                      width: "fit-content",
                    }}
                  >
                    {type}

                    <img
                      style={{ margin: "0 0 4px 5px" }}
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
                  </div>
                );
              })}
            </div>
          </label>
        </div>
        <div className="form-container">
          <label>
            Description
            <textarea
              autoComplete="off"
              rows="4"
              name="description"
              type="text"
              onChange={handleInputChange}
              value={input.description}
              placeholder="Eg. “Birthday present to myself”, “Gift from
              Grandma”, or any other details you want to
              include for yourself."
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
            <p>Historical Value</p>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Select
                styles={currencyStyle}
                className="basic-single"
                value={options_currency.filter(
                  (option) => option.label === input.purchase_price.currency
                )}
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
                autoComplete="off"
                name="purchase_price"
                type="number"
                onKeyDown={(e) => {
                  if (["e", "+", "-"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  setInput((prev) => {
                    return {
                      ...prev,
                      purchase_price: {
                        ...prev.purchase_price,
                        value: e.target.value,
                      },
                    };
                  });
                }}
                value={input.purchase_price.value}
              />
            </div>
          </label>
        </div>

        {/*--------------------------- Receipts & Documents ----------------------------*/}
        <div className="form-container">
          <label>
            Receipts & Documents
            <p>Upload receipts or any other relevant documents.</p>
            <div>
              <button
                className="upload-btn"
                onClick={(e) => openUpload(e)}
                name="upload"
              >
                Upload
              </button>
            </div>
          </label>

          <div>
            {input.receipts.map((receipt, index) => (
              <div key={{ index }} style={{ margin: "10px" }}>
                <img src="/fixed/document.svg" />
                <span style={{ marginLeft: "10px" }}>{receipt.filePath}</span>

                <img
                  src="/fixed/CloseButton.svg"
                  className="picture-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteReceipts(index, receipt.filePath);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        {/*--------------------------- Certificate ----------------------------*/}
        <div className="form-container">
          <label>Certificate Type</label>
          <Select
            styles={certificateStyle}
            value={options_certificate.filter(
              (option) => option.label === input.certificate.type
            )}
            options={options_certificate}
            className="basic-single"
            classNamePrefix="select"
            placeholder="If any"
            onChange={(item) => {
              setInput((prev) => {
                return {
                  ...prev,
                  certificate: {
                    ...prev.certificate,
                    type: item.label,
                  },
                };
              });
            }}
          />
          <div style={{ margin: "20px 10px" }}>
            <label>Certificate</label>
            <p>
              Upload a photo or digital copy of your item’s certificate. (Files
              accepted: .jpg, .png, .pdf, .doc)
            </p>
            <div>
              <button
                className="upload-btn"
                name="upload1"
                onClick={(e) => openUpload(e)}
              >
                Upload
              </button>
              <div>
                {input.certificate.img.map((cert, index) => (
                  <div key={{ index }} style={{ margin: "10px" }}>
                    <img src="/fixed/document.svg" />
                    <span style={{ marginLeft: "10px" }}>{cert.filePath}</span>
                    <img
                      src="/fixed/CloseButton.svg"
                      className="picture-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteCertificate(index, cert.filePath);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/*------------------ start of footer accordion --------------------------- */}
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
                        name="name"
                        type="text"
                        onChange={(e) =>
                          setInput((prev) => {
                            console.log({ ...prev.insurance });
                            return {
                              ...prev,
                              insurance: {
                                ...prev.insurance,
                                name: e.target.value,
                              },
                            };
                          })
                        }
                        value={input.insurance.name}
                        placeholder="Insurer"
                      />
                      <input
                        name="value"
                        type="number"
                        onKeyDown={(e) => {
                          if (["e", "+", "-"].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) =>
                          setInput((prev) => {
                            console.log({ ...prev.insurance });
                            return {
                              ...prev,
                              insurance: {
                                ...prev.insurance,
                                value: e.target.value,
                              },
                            };
                          })
                        }
                        value={input.insurance.value}
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
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <span
                          style={{ paddingTop: "19px", marginRight: "10px" }}
                        >
                          For:
                        </span>
                        <input
                          autocomplete="off"
                          name="name"
                          type="text"
                          onChange={(e) =>
                            setInput((prev) => {
                              return {
                                ...prev,
                                inheritance: {
                                  ...prev.inheritance,
                                  name: e.target.value,
                                },
                              };
                            })
                          }
                          value={input.inheritance.name}
                          placeholder="Recipient's Name"
                        />
                      </div>
                      <div style={{ margin: "20px 10px" }}>
                        <label>
                          Notes
                          <input
                            type="text"
                            name="comments"
                            placeholder="Additional Comments"
                            value={input.inheritance.comments}
                            onChange={(e) =>
                              setInput((prev) => {
                                return {
                                  ...prev,
                                  inheritance: {
                                    ...prev.inheritance,
                                    comments: e.target.value,
                                  },
                                };
                              })
                            }
                          />
                        </label>
                      </div>
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
