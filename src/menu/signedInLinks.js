import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getUser, getSelectedProjectId } from "../store/selectors/selector";
import { logoutAction } from "../store/actions/actionsCreator";
import M from "materialize-css/dist/js/materialize.min.js";

const SignedInLinks = ({ user, selectedProjectId, logout }) => {
  React.useEffect(() => {
    let userTooltip = document.querySelector(".tooltipped");
    M.Tooltip.init(userTooltip);
    if (selectedProjectId) {
      let dropdown = document.querySelector(".dropdown-trigger");
      M.Dropdown.init(dropdown, { coverTrigger: false });
    }
  });

  const projectLinks = selectedProjectId ? (
    <div className="inline">
      <li>
        <NavLink to="/projects">Projects</NavLink>
      </li>
      <li>
        <a href="#" className="dropdown-trigger" data-target="menu-project-dd">
          Operations
        </a>
      </li>
    </div>
  ) : null;
  return (
    <div>
      {projectLinks}
      <li>
        <NavLink to="#">Administration</NavLink>
      </li>
      <li>
        <a
          className="btn btn-floating indigo darken-4 z-depth-0 tooltipped"
          data-position="bottom"
          data-tooltip={user.email}
        >
          CM
        </a>
      </li>
      <li>
        <NavLink to="/login" onClick={() => logout()}>
          Log Out
        </NavLink>
      </li>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: getUser(state),
    selectedProjectId: getSelectedProjectId(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);
