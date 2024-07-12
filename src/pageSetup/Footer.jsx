import { MDBFooter } from "mdb-react-ui-kit";
import React from "react";

const Footer = () => {
    const date = new Date().getFullYear();
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-left text-white">
      <div
        className="text-center p-3"
        style={{ backgroundColor: "#ef5350"}}
      >
        &copy; {date} Copyright:{" "}
        <a className="text-white text-decoration-none" href="https://aspasija.com/">
          Aspasija Cvetkoska
        </a>
      </div>
    </MDBFooter>
  );
};

export default Footer;
