import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAction } from "../store/actions/actionsCreator";

const SignedInLinks = ({ logout }) => {
  return (
    <div>
      <li>
        <NavLink to="/projects">Projects</NavLink>
      </li>
      <li>
        <NavLink to="/budget">Budget</NavLink>
      </li>
      <li>
        <NavLink to="#" className="btn btn-floating indigo darken-4 z-depth-0">
          CM
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" onClick={() => logout()}>Log Out</NavLink>
      </li>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAction()),
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
