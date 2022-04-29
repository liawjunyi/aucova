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
import { AuthContext } from "./context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import SetUp from "./pages/SetUp";
import Settings from "./pages/Settings";
import About from "./pages/About";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [state, setState] = useState(1);
  const [user, setUser] = useLocalStorage("user", null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user");
        setUser({
          email: user.email,
          uid: user.uid,
        });
      } else {
        console.log("else");
        setUser(null);
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <FormStateContext.Provider value={{ setState, state }}>
        <BrowserRouter>
          <Routes>
            {user ? (
              <>
                <Route path="/" element={<Homepage />} />
                <Route path="/about" element={<About />} />
                <Route path="/dispatch" element={<Dispatch />} />
                <Route path="/portfolio" element={<MyPortfolio />} />
                <Route path="/portfolio/newentry" element={<NewEntry />} />
                <Route path="/assessment" element={<Assessment />} />
                <Route path="/item/:id" element={<Item />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/setup" element={<SetUp />} />
              </>
            ) : (
              <>
                <Route path="/intro" element={<Intro />} />
                <Route path="*" element={<Navigate to="/intro" />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </FormStateContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
