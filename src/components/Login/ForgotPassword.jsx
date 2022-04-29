import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";

function ForgotPassword({ setState }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => setState(4))
      .catch((err) => alert(err.message));
  };
  return (
    <>
      <div className="intro-header">
        <div
          style={{
            height: "15vh",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src="/LogoSmall.svg" alt="" />
        </div>

        <h2>Welcome to AUCOVA</h2>
        <h5>Jewellery Asset Management</h5>
      </div>
      <div className="password-reset">
        <b>Password Reset</b>
      </div>
      <div className="password-reset-textBox">
        <h5>
          Please enter the email address linked to your account to reset your
          password.
        </h5>
      </div>
      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <div className="auth">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="forgot-password"></div>
          <button className="intro-button btn-positive">
            <h5>
              <b>Reset Password</b>
            </h5>
          </button>
        </form>
        <div className="auth-footer">
          <span>Back to </span>
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
    </>
  );
}

export default ForgotPassword;
