import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import LogoImg from "../Images/charmander.png";

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt="logoImg"
            src={LogoImg}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          React PokeApp
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
