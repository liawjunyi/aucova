import React, { useState } from "react";
import Menu from "../components/Menu";
import MenuButton from "../components/MenuButton";

export default function Header(props) {
  const [visible, setVisible] = useState(false);
  const handleMouseDown = () => {
    setVisible(!visible);
  };

  return (
    <nav className=" navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <MenuButton handleMouseDown={handleMouseDown} />
        <a className="navbar-brand mx-auto" href="#">
          {props.title}
        </a>
        <Menu menuVisibility={visible} handleMouseDown={handleMouseDown} />
        {props.children}
      </div>
    </nav>
  );
}
