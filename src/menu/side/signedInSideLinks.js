import React from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUser } from "../../store/selectors/genericSelectors";
import { getSelectedProjectId } from "../../store/selectors/projectSelectors";
import { logoutAction } from "../../store/actions/genericActions";
import M from "materialize-css/dist/js/materialize.min.js";
import CustomNavLink from "../../common/customNavLink";
import { setProjectMenuAction } from "../../store/actions/genericActions";
import { getProjectMenu } from "../../store/selectors/genericSelectors";

const SignedInSideLinks = ({
  user,
  selectedProjectId,
  logout,
  projectMenu,
  setProjectMenuAction,
}) => {
  React.useEffect(() => {
    if (selectedProjectId) {
      let collapsible = document.querySelector(".collapsible");
      M.Collapsible.init(collapsible, { accordion: false });
    }
  }, [selectedProjectId]);

  const setProjectMenu = (e, par) => {
    setProjectMenuAction(par.code);
  };

  const projectLinks =
    useLocation().pathname === "/new-project" ? (
      <li>
        <CustomNavLink to="/projects" code="PJS">
          Projects
        </CustomNavLink>
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
                  <li className={projectMenu === "DSB" ? "active" : ""}>
                    <CustomNavLink
                      to={`/project?project=${selectedProjectId}`}
                      className="sidenav-close"
                      iconType="AWESOME"
                      iconName="grip-horizontal"
                      code="DSB"
                      onClick={setProjectMenu}
                    >
                      Dashboard
                    </CustomNavLink>
                  </li>
                  <li className={projectMenu === "QTS" ? "active" : ""}>
                    <CustomNavLink
                      to={`/project/quotations?project=${selectedProjectId}`}
                      className="sidenav-close"
                      iconType="AWESOME"
                      iconName="search-dollar"
                      code="QTS"
                      onClick={setProjectMenu}
                    >
                      Quotations
                    </CustomNavLink>
                  </li>
                  <li className={projectMenu === "INV" ? "active" : ""}>
                    <CustomNavLink
                      to={`/project/invoices?project=${selectedProjectId}`}
                      className="sidenav-close"
                      iconType="AWESOME"
                      iconName="file-invoice-dollar"
                      code="INV"
                      onClick={setProjectMenu}
                    >
                      Invoicing
                    </CustomNavLink>
                  </li>
                  <li className={projectMenu === "BDG" ? "active" : ""}>
                    <CustomNavLink
                      to={`/project/budget?project=${selectedProjectId}`}
                      className="sidenav-close"
                      iconType="AWESOME"
                      iconName="piggy-bank"
                      code="BDG"
                      onClick={setProjectMenu}
                    >
                      Budget
                    </CustomNavLink>
                  </li>
                  <li className={projectMenu === "SET" ? "active" : ""}>
                    <CustomNavLink
                      to={`/project/settings?project=${selectedProjectId}`}
                      className="sidenav-close"
                      iconType="AWESOME"
                      iconName="sliders-h"
                      code="SET"
                      onClick={setProjectMenu}
                    >
                      Settings
                    </CustomNavLink>
                  </li>
                  <li className={projectMenu === "ADA" ? "active" : ""}>
                    <CustomNavLink
                      to={`/project/analytics?project=${selectedProjectId}`}
                      className="sidenav-close"
                      iconType="AWESOME"
                      iconName="chart-line"
                      code="ADA"
                      onClick={setProjectMenu}
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
    projectMenu: getProjectMenu(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAction()),
    setProjectMenuAction: (code) => dispatch(setProjectMenuAction(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignedInSideLinks);
