import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUser, getSelectedProjectId } from "../../store/selectors/selector";
import { logoutAction } from "../../store/actions/actionsCreator";
import M from "materialize-css/dist/js/materialize.min.js";

const SignedInSideLinks = ({ user, selectedProjectId, logout }) => {
  React.useEffect(() => {
    if (selectedProjectId) {
      let collapsible = document.querySelector(".collapsible");
      M.Collapsible.init(collapsible, { accordion: false });
    }
  }, [selectedProjectId]);

  const projectLinks =
    useLocation().pathname === "/new-project" ? (
      <li>
        <NavLink to="/projects">Projects</NavLink>
      </li>
    ) : selectedProjectId ? (
      <div>
        <li>
          <NavLink to="/projects" className="sidenav-close">
            <FontAwesomeIcon icon="tasks" fixedWidth /> Projects
          </NavLink>
        </li>
        <li className="no-padding">
          <ul className="collapsible collapsible-accordion">
            <li>
              <a href="#!" className="collapsible-header">
                Operations
                <i className="material-icons">arrow_drop_down</i>
              </a>
              <div className="collapsible-body">
                <ul>
                  <li>
                    <NavLink
                      to={`/project/dashboard?project=${selectedProjectId}`}
                      className="sidenav-close"
                    >
                      <FontAwesomeIcon icon="grip-horizontal" fixedWidth />{" "}
                      DashBoard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/project/quotations?project=${selectedProjectId}`}
                      className="sidenav-close"
                    >
                      <FontAwesomeIcon icon="search-dollar" fixedWidth />{" "}
                      Quotations
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/project/invoices?project=${selectedProjectId}`}
                      className="sidenav-close"
                    >
                      <FontAwesomeIcon icon="file-invoice-dollar" fixedWidth />{" "}
                      Invoicing
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/project/budget?project=${selectedProjectId}`}
                      className="sidenav-close"
                    >
                      <FontAwesomeIcon icon="piggy-bank" fixedWidth /> Budget
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/project/analytics?project=${selectedProjectId}`}
                      className="sidenav-close"
                    >
                      <FontAwesomeIcon icon="chart-line" fixedWidth /> Advanced
                      Analytics
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </li>
        <li></li>
      </div>
    ) : null;

  return (
    <div>
      {projectLinks}
      <li>
        <NavLink to="/" className="sidenav-close">
          <FontAwesomeIcon icon="users" fixedWidth /> Administration
        </NavLink>
      </li>
      <li className="indigo lighten-2">
        <a href="#!">
          <FontAwesomeIcon icon="user-circle" fixedWidth /> {user.email}
        </a>
      </li>
      <li>
        <NavLink to="/login" onClick={() => logout()} className="sidenav-close">
          <FontAwesomeIcon icon="sign-out-alt" fixedWidth /> Log Out
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

export default connect(mapStateToProps, mapDispatchToProps)(SignedInSideLinks);
