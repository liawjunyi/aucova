import React from "react";
import Header from "../components/Header";
import Accordion from "react-bootstrap/Accordion";
import Tabs from "../components/Tabs";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

function MyPortfolio() {
  return (
    <div>
      <Header title="My Portfolio" />

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

        <h1 className=" d-flex justify-content-center">The Duchess of Bling</h1>
      </div>

      <Accordion style={{ width: "100%" }} defaultActiveKey="0">
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
            <Link className="d-flex justify-content-center" to="/assessment">
              Request for assessment
            </Link>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Tabs />
    </div>
  );
}

export default MyPortfolio;
