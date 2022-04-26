import React, { useState } from "react";
import Header from "../components/Header";
import MenuButton from "../components/MenuButton";
import Menu from "../components/Menu";
import LogIn from "../components/Login/LogIn";
import SignUp from "../components/Login/SignUp";
import ForgotPassword from "../components/Login/ForgotPassword";

function Intro() {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState(0);
  const handleMouseDown = () => {
    setVisible(!visible);
  };
  return (
    <div>
      <Header
        title="AUCOVA"
        leftButton={<MenuButton handleMouseDown={handleMouseDown} />}
      />
      <Menu menuVisibility={visible} handleMouseDown={handleMouseDown} />

      <div className="intro-container">
        {state === 0 && (
          <>
            <div className="intro-header">
              <div
                style={{
                  height: "20vh",
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img src="/Logo.svg" alt="" />
              </div>

              <h2>Welcome to AUCOVA</h2>
              <h5>Jewellery Asset Management</h5>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "24px auto 40px",
              }}
            >
              <img src="/fixed/Line.svg" alt="" />
            </div>
            <h5>
              AUCOVA is the foremost Jewellery Asset Management system for
              Jewellery Collectors.
            </h5>
            <br />
            <h5>
              Providing the platform and services to assist in managing,
              maintaining, acquiring and trading Jewellery assets.
            </h5>
            <br />
            <h5>
              AUCOVA fully unlocks the value of the world’s most beautiful
              asset.
            </h5>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "196px",
              }}
            >
              <div className="intro-footer">
                <button
                  className="intro-button btn-positive"
                  onClick={() => setState(1)}
                >
                  <h5>
                    <b>Log In</b>
                  </h5>
                </button>
                <button
                  className="intro-button btn-positive"
                  onClick={() => setState(2)}
                >
                  <h5>
                    <b>Sign Up</b>
                  </h5>
                </button>
              </div>
            </div>
          </>
        )}
        {state === 1 && <LogIn setState={setState} />}
        {state === 2 && <SignUp setState={setState} />}
        {state === 3 && <ForgotPassword setState={setState} />}
      </div>
    </div>
  );
}

export default Intro;
