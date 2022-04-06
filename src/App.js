import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "./styles.css";
import Dispatch from "./pages/Dispatch";
import Assessment from "./pages/Assessment";
import MyPortfolio from "./pages/MyPortfolio";
import Item from "./pages/Item";
import NewEntry from "./pages/NewEntry";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/dispatch" element={<Dispatch />} />
        <Route path="/portfolio" element={<MyPortfolio />} />
        <Route path="/portfolio/newentry" element={<NewEntry />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/item/:id" element={<Item />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
