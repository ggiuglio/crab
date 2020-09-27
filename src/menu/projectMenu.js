import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getSelectedProjectId } from "../store/selectors/selector";

const ProjectMenu = ({selectedProjectId}) => {

  return (
    <div>
      <ul id="menu-project-dd" className="dropdown-content dd-padding">
        <li>
          <NavLink to={`/project/dashboard?project=${selectedProjectId}`} className="black-text">
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="divider" tabIndex="-1"></li>
        <li>
          <NavLink to={`/project/quotations?project=${selectedProjectId}`} className="black-text">
            <span>Quotations</span>
          </NavLink>
        </li>
        <li className="divider" tabIndex="-1"></li>
        <li>
          <NavLink to={`/project/invoices?project=${selectedProjectId}`} className="black-text">
            <span>Invoicing</span>
          </NavLink>
        </li>
        <li className="divider" tabIndex="-1"></li>
        <li>
          <NavLink to={`/project/budget?project=${selectedProjectId}`} className="black-text">
            <span>Budget</span>
          </NavLink>
        </li>
        <li className="divider" tabIndex="-1"></li>
        <li>
          <NavLink to={`/project/analytics?project=${selectedProjectId}`} className="black-text">
            <span>Advanced Analytics</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedProjectId: getSelectedProjectId(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMenu);
