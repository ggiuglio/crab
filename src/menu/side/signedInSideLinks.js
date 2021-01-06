import React from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUser } from "../../store/selectors/genericSelectors";
import { getSelectedProjectId } from "../../store/selectors/projectSelectors";
import { logoutAction } from "../../store/actions/genericActions";
import M from "materialize-css/dist/js/materialize.min.js";
import CustomNavLink from "../../common/customNavLink";

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
        <CustomNavLink to="/projects" code="PJS">Projects</CustomNavLink>
      </li>
    ) : selectedProjectId ? (
      <div>
        <li>
          <CustomNavLink
            to="/projects"
            className="sidenav-close"
            iconType="AWESOME"
            iconName="tasks"
            code="PJS"
          >
            Projects
          </CustomNavLink>
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
                    <CustomNavLink
                      to={`/project/dashboard?project=${selectedProjectId}`}
                      className="sidenav-close"
                      iconType="AWESOME"
                      iconName="grip-horizontal"
                      code="DSB"
                    >
                      Dashboard
                    </CustomNavLink>
                  </li>
                  <li>
                    <CustomNavLink
                      to={`/project?project=${selectedProjectId}`}
                      className="sidenav-close"
                      iconType="AWESOME"
                      iconName="search-dollar"
                      code="QTS"
                    >
                      Quotations
                    </CustomNavLink>
                  </li>
                  <li>
                    <CustomNavLink
                      to={`/project/invoices?project=${selectedProjectId}`}
                      className="sidenav-close"
                      iconType="AWESOME"
                      iconName="file-invoice-dollar"
                      code="INV"
                    >
                      Invoicing
                    </CustomNavLink>
                  </li>
                  <li>
                    <CustomNavLink
                      to={`/project/budget?project=${selectedProjectId}`}
                      className="sidenav-close"
                      iconType="AWESOME"
                      iconName="piggy-bank"
                      code="BDG"
                    >
                      Budget
                    </CustomNavLink>
                  </li>
                  <li>
                    <CustomNavLink
                      to={`/project/analytics?project=${selectedProjectId}`}
                      className="sidenav-close"
                      iconType="AWESOME"
                      iconName="chart-line"
                      code="ADA"
                    >
                      Advanced Analytics
                    </CustomNavLink>
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
        <CustomNavLink
          to="/"
          className="sidenav-close"
          iconType="AWESOME"
          iconName="users"
          code="ADM"
        >
          Administration
        </CustomNavLink>
      </li>
      <li className="indigo lighten-2">
        <a href="#!">
          <FontAwesomeIcon icon="user-circle" fixedWidth /> {user.email}
        </a>
      </li>
      <li>
        <CustomNavLink
          to="/login"
          onClick={() => logout()}
          className="sidenav-close"
          iconType="AWESOME"
          iconName="sign-out-alt"
        >
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

export default connect(mapStateToProps, mapDispatchToProps)(SignedInSideLinks);
