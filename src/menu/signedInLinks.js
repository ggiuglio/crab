import React from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { getUser, getSelectedProjectId } from "../store/selectors/selector";
import { logoutAction } from "../store/actions/actionsCreator";
import M from "materialize-css/dist/js/materialize.min.js";
import CustomNavLink from "../common/customNavLink";

const SignedInLinks = ({ user, selectedProjectId, logout }) => {
  React.useEffect(() => {
    let userTooltip = document.querySelector(".tooltipped");
    M.Tooltip.init(userTooltip);
    if (selectedProjectId) {
      let dropdown = document.querySelector(".dropdown-trigger");
      M.Dropdown.init(dropdown, { coverTrigger: false });
    }
  });

  const projectLinks =
    useLocation().pathname === "/new-project" ? (
      <li>
        <CustomNavLink to="/projects" code="PJS">Projects</CustomNavLink>
      </li>
    ) : selectedProjectId ? (
      <div className="inline">
        <li>
          <CustomNavLink to="/projects" code="PJS">Projects</CustomNavLink>
        </li>
        <li>
          <a
            href="#!"
            className="dropdown-trigger"
            data-target="menu-project-dd"
          >
            Operations
          </a>
        </li>
      </div>
    ) : null;
  return (
    <div>
      {projectLinks}
      <li>
        <CustomNavLink to="#" code="ADM">Administration</CustomNavLink>
      </li>
      <li>
        <a
          href="#!"
          className="btn btn-floating indigo darken-4 z-depth-0 tooltipped"
          data-position="bottom"
          data-tooltip={user.email}
        >
          CM
        </a>
      </li>
      <li>
        <CustomNavLink to="/login" onClick={() => logout()}>
          Log Out
        </CustomNavLink>
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
