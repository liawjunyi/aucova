import React, { useState } from "react";
import Header from "../components/Header";
import MenuButton from "../components/MenuButton";
import Menu from "../components/Menu";

function SetUp() {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState(0);
  const [username, setUsername] = useState("");
  const handleMouseDown = () => {
    setVisible(!visible);
  };
  return (
    <>
      <Header
        title="AUCOVA"
        leftButton={<MenuButton handleMouseDown={handleMouseDown} />}
      />
      <Menu menuVisibility={visible} handleMouseDown={handleMouseDown} />
      <div className="setup-container">
        <div className="intro-header setup">
          <h2>Profile Creation</h2>
          <div className="setup-profile">
            <img src="/fixed/DefaultProfile.svg" alt="" />
          </div>
          <p style={{ textDecoration: "underline" }}>Upload profile picture</p>
        </div>
        <div className="auth">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <h6>
          Usernames can only use letters, numbers, underscores and periods.
        </h6>
        <button className="intro-button btn-positive">
          <h5>
            <b>Save Changes</b>
          </h5>
        </button>
      </div>
    </>
  );
}

export default SetUp;
