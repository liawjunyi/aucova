import React from "react";

function ForgotPasswordSuccess({ setState }) {
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
      <div className="password-reset-success-textBox">
        <h5>
          Email sent! Please check your email inbox for instructions to reset
          your password.
        </h5>
      </div>
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
    </>
  );
}

export default ForgotPasswordSuccess;
