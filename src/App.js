import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useEffect, useState } from "react";
import "./styles.css";
import Dispatch from "./pages/Dispatch";
import Assessment from "./pages/Assessment";
import MyPortfolio from "./pages/MyPortfolio";
import Item from "./pages/Item";
import Intro from "./pages/Intro";
import NewEntry from "./pages/NewEntry";
import { FormStateContext } from "./context/FormStateContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./redux/authSlice";
import SetUp from "./pages/SetUp";

function App() {
  const [state, setState] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  console.log(user);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <FormStateContext.Provider value={{ setState, state }}>
      <BrowserRouter>
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Homepage />} />

              <Route path="/dispatch" element={<Dispatch />} />
              <Route path="/portfolio" element={<MyPortfolio />} />
              <Route path="/portfolio/newentry" element={<NewEntry />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/item/:id" element={<Item />} />
              <Route path="/setup" element={<SetUp />} />
            </>
          ) : (
            <>
              <Route path="/intro" element={<Intro />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </FormStateContext.Provider>
  );
}

export default App;
