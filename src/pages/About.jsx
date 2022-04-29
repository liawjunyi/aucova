import Menu from "../components/Menu";
import React, { useState } from "react";
import Header from "../components/Header";
import MenuButton from "../components/MenuButton";

function About() {
  const [visible, setVisible] = useState(false);
  const handleMouseDown = () => {
    setVisible(!visible);
  };
  return (
    <>
      <Header
        title="AUCOVA"
        leftButton={<MenuButton handleMouseDown={handleMouseDown} />}
      />
      <Menu menuVisibility={visible} handleMouseDown={handleMouseDown} />
      <div className="about-container">
        <div className="about-header">
          <h2>About Aucova</h2>
        </div>
        <h5>
          AUCOVA is the foremost Jewellery Asset Management system for Jewellery
          Collectors.
        </h5>
        <br />
        <h5>
          Providing the platform and services to assist in managing,
          maintaining, acquiring and trading Jewellery assets.
        </h5>
        <br />
        <h5>
          AUCOVA fully unlocks the value of the world’s most beautiful asset.
        </h5>
        <div className="about-header">
          <h2>Experts & Partners</h2>
        </div>
        <h5>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa dui
          nisl, diam nunc rutrum tortor sagittis, pellentesque in. Id ligula
          diam non varius montes. Eu urna eu, nascetur laoreet. Vel habitant id
          risus amet. Commodo nisl faucibus morbi non lorem tristique lorem
          pretium. Mattis aliquet.
        </h5>
        <div style={{ margin: "90px" }}></div>
        <h5>Terms & Conditions</h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa dui
          nisl, diam nunc rutrum tortor sagittis, pellentesque in. Id ligula
          diam non varius montes. Eu urna eu, nascetur laoreet. Vel habitant id
          risus amet. Commodo nisl faucibus morbi non lorem tristique lorem
          pretium. Mattis aliquet.
        </p>
        <h5>Data & Privacy</h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa dui
          nisl, diam nunc rutrum tortor sagittis, pellentesque in. Id ligula
          diam non varius montes. Eu urna eu, nascetur laoreet. Vel habitant id
          risus amet. Commodo nisl faucibus morbi non lorem tristique lorem
          pretium. Mattis aliquet.
        </p>
      </div>
    </>
  );
}

export default About;
