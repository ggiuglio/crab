import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignedOutSideLinks = () => {
  return (
    <div>
      <li>
        <NavLink to="/signup" className="sidenav-close">
          <FontAwesomeIcon icon="user-plus" fixedWidth /> Signup
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" className="sidenav-close">
          <FontAwesomeIcon icon="sign-in-alt" fixedWidth /> Login
        </NavLink>
      </li>
    </div>
  );
};

export default SignedOutSideLinks;
