import React from "react";
import { connect } from "react-redux";
import { history } from "../App";
import { getSelectedProjectId } from "../store/selectors/projectSelectors";
import CustomNavLink from "../common/customNavLink";
import { setProjectMenuAction } from "../store/actions/genericActions";
import { getProjectMenu } from "../store/selectors/genericSelectors";

const ProjectMenu = ({ selectedProjectId, projectMenu, setProjectMenuAction }) => {
  React.useEffect(() => {
    if (!projectMenu) {
      const locationToken = history.location.pathname.split('/');
      const location = locationToken[locationToken.length - 1];

      let code = "";

      if (selectedProjectId && selectedProjectId !== "0") {
        switch (location) {
          case "project":
            code = "DSB";
            break;
          case "settings":
            code = 'SET';
            break;
          case "quotations":
          case "quotation":
          case "new-quotation":
            code = "QTS";
            break;
          case "invoices":
            code = "INV";
            break;
          case "budget":
            code = "BDG";
            break;
          case "analytics":
            code = "ADA";
            break;
          default:
        }
      }
      if (projectMenu !== code) setProjectMenuAction(code);
    }
  }, [selectedProjectId]);

  const setProjectMenu = (e, par) => {
    setProjectMenuAction(par.code);
  };

  return (
    <ul className="custom-tabs tabs-transparent">
      <li className={`custom-action-tab indigo lighten-3 ${projectMenu === "DSB" ? "active" : ""}`}>
        <CustomNavLink
          to={`/project?project=${selectedProjectId}`}
          code="DSB"
          className={projectMenu === "DSB" ? "active" : ""}
          onClick={setProjectMenu}
        >
          <span>Dashboard</span>
        </CustomNavLink>
      </li>
      <li className={`custom-action-tab indigo lighten-3 ${projectMenu === "QTS" ? "active" : ""}`}>
        <CustomNavLink
          to={`/project/quotations?project=${selectedProjectId}`}
          code="QTS"
          className={projectMenu === "QTS" ? "active" : ""}
          onClick={setProjectMenu}
        >
          <span>Quotations</span>
        </CustomNavLink>
      </li>
      <li className={`custom-action-tab indigo lighten-3 ${projectMenu === "INV" ? "active" : ""}`}>
        <CustomNavLink
          to={`/project/invoices?project=${selectedProjectId}`}
          code="INV"
          className={projectMenu === "INV" ? "active" : ""}
          onClick={setProjectMenu}
        >
          <span>Invoicing</span>
        </CustomNavLink>
      </li>
      <li className={`custom-action-tab indigo lighten-3 ${projectMenu === "BDG" ? "active" : ""}`}>
        <CustomNavLink
          to={`/project/budget?project=${selectedProjectId}`}
          code="BDG"
          className={projectMenu === "BDG" ? "active" : ""}
          onClick={setProjectMenu}
        >
          <span>Budget</span>
        </CustomNavLink>
      </li>
      <li className={`custom-action-tab indigo lighten-3 ${projectMenu === "SET" ? "active" : ""}`}>
        <CustomNavLink
          to={`/project/settings?project=${selectedProjectId}`}
          code="SET"
          className={projectMenu === "SET" ? "active" : ""}
          onClick={setProjectMenu}
        >
          <span>Settings</span>
        </CustomNavLink>
      </li>
      <li className={`custom-action-tab indigo lighten-3 ${projectMenu === "ADA" ? "active" : ""}`}>
        <CustomNavLink
          to={`/project/analytics?project=${selectedProjectId}`}
          code="ADA"
          className={projectMenu === "ADA" ? "active" : ""}
          onClick={setProjectMenu}
        >
          <span>Advanced Analytics</span>
        </CustomNavLink>
      </li>
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedProjectId: getSelectedProjectId(state),
    projectMenu: getProjectMenu(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProjectMenuAction: (code) => dispatch(setProjectMenuAction(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMenu);
