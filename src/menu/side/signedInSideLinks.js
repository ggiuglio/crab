import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logoutAction } from "../../store/actions/actionsCreator";

const SignedInSideLinks = ({ logout }) => {
  return (
    <div>
      <li>
        <NavLink to="/projects" className="sidenav-close">
        <FontAwesomeIcon icon="tasks" fixedWidth /> Projects
        </NavLink>
      </li>
      <li>
        <NavLink to="/budget" className="sidenav-close">
        <FontAwesomeIcon icon="piggy-bank" fixedWidth /> Budget
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" onClick={() => logout()} className="sidenav-close">
        <FontAwesomeIcon icon="sign-out-alt" fixedWidth /> Log Out
        </NavLink>
      </li>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAction()),
  };
};

export default connect(null, mapDispatchToProps)(SignedInSideLinks);
