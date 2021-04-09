import React from "react";

const Footer = ({isPrintMode}) => {
  return (
    <footer className="page-footer" style={isPrintMode ? {display: "none"} : {}}>
        <div className="container center">
          <img className="responsive-img logo-footer" src={process.env.PUBLIC_URL + '/img/sintesi_logo.jpg'} alt="logo" />
        </div>
    </footer>
  );
};

export default Footer;
