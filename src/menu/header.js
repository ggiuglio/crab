import React from "react";
import Menu from "./menu.js";
import Title from "./title.js";

const Header = () => {
  return (
    <nav className="nav-wrapper indigo">
      <div className="container">
        <Title></Title>
        <Menu></Menu>
      </div>
    </nav>
  );
};

export default Header;
