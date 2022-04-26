import { useState } from "react";
import Header from "../components/Header";
import Carousell from "../components/Carousell";
import Search from "../components/Search";
import MenuButton from "../components/MenuButton";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";

export default function Homepage() {
  const [visible, setVisible] = useState(false);
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
      <Search />

      <Carousell />

      <Link className="position-absolute end-0" to="/dispatch">
        Read More
      </Link>
    </div>
  );
}
