import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LongMenuEntry from "./LongMenuEntry";
import { Link } from "react-router-dom";

export default function HeaderEntry(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleSave = () => {
    //   save as draft function
  };
  const cancelEntry = () => {
    setShow(true);
  };
  const options = [
    "Save(private)",
    "Publish To:",
    "Public View",
    "Marketplace",
  ];
  return (
    <nav className=" navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <button onClick={cancelEntry}>x</button>
        <h1 className="navbar-brand mx-auto">{props.title}</h1>
        <button onClick={props.handleNext}>Next</button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body>Save as draft and come back later?</Modal.Body>
        <Modal.Footer>
          <Link to="/portfolio">
            <Button variant="secondary">Don't save</Button>
          </Link>

          <Button variant="primary" onClick={handleSave}>
            Save As Draft
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
}
