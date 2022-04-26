import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

function LogIn({ setState }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
          })
        );
        if (auth) {
          navigate("/");
        }
      })
      .catch((err) => alert(err.message));
  };
  return (
    <>
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
          </div>
          <div className="forgot-password">
            <h5 onClick={() => setState(3)}>Forgot Password</h5>
          </div>

          <button className="intro-button btn-positive" onClick={() => logIn()}>
            <h5>
              <b>Log In</b>
            </h5>
          </button>
          <div className="auth-footer">
            <span>Not a member yet?</span>
            <span
              style={{
                textDecoration: "underline",
                color: "var(--primary)",
                paddingLeft: "5px",
              }}
              onClick={() => setState(2)}
            >
              Sign up
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
