import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUser, getQuotation  } from "../../store/selectors/selector";
import { logoutAction } from "../../store/actions/actionsCreator";
import M from "materialize-css/dist/js/materialize.min.js";

const SignedInSideLinks = ({ user, quotation, logout }) => {
  React.useEffect(() => {
    if(quotation) {
      let collapsible = document.querySelector(".collapsible");
      M.Collapsible.init(collapsible, {accordion: false});
    }
  });

  /**TODO
   * change quotation check with selected project check for side menu
   */
  const projectLinks = quotation ? (
    <div>
      <li>
        <NavLink to="#" className="sidenav-close">
          <FontAwesomeIcon icon="tasks" fixedWidth /> Projects
        </NavLink>
      </li>
      <li className="no-padding">
        <ul className="collapsible collapsible-accordion">
          <li>
            <a className="collapsible-header">
              Operations
              <i className="material-icons">arrow_drop_down</i>
            </a>
            <div className="collapsible-body">
              <ul>
                <li>
                  <NavLink to="/dashboard" className="sidenav-close">
                    <FontAwesomeIcon icon="grip-horizontal" fixedWidth />{" "}
                    DashBoard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/quotations" className="sidenav-close">
                    <FontAwesomeIcon icon="search-dollar" fixedWidth />{" "}
                    Quotations
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/invoice" className="sidenav-close">
                    <FontAwesomeIcon icon="file-invoice-dollar" fixedWidth />{" "}
                    Invoicing
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/budget" className="sidenav-close">
                    <FontAwesomeIcon icon="piggy-bank" fixedWidth /> Budget
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" className="sidenav-close">
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
        <NavLink to="#" className="sidenav-close">
          <FontAwesomeIcon icon="users" fixedWidth /> Administration
        </NavLink>
      </li>
      <li className="indigo lighten-2">
        <a>
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
    quotation: getQuotation(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignedInSideLinks);
