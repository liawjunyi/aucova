import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

function SignUp({ setState }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const register = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/setup");
        })
        .catch((err) => alert(err.message));
    } else {
      alert("please ensure password matches");
    }
  };

  return (
    <div>
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
      ></div>
      <div className="auth-container">
        <div className="auth">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="forgot-password"></div>
        <button
          className="intro-button btn-positive"
          onClick={() => register()}
        >
          <h5>
            <b>Sign Up</b>
          </h5>
        </button>
        <div className="auth-footer">
          <span>Already a member? </span>
          <span
            style={{
              textDecoration: "underline",
              color: "var(--primary)",
              paddingLeft: "5px",
            }}
            onClick={() => setState(1)}
          >
            Log In
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
