import React from "react";

const Footer = () => {
  return (
    <footer className="page-footer">
        <div className="container center">
          <img className="responsive-img logo-footer" src={process.env.PUBLIC_URL + '/img/sintesi_logo.jpg'} alt="logo" />
        </div>
    </footer>
  );
};

export default Footer;
