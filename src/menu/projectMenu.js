import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getSelectedProject } from "../store/selectors/selector";

const ProjectMenu = ({selectedProject}) => {

  return (
    <div>
      <ul id="menu-project-dd" className="dropdown-content dd-padding">
        <li>
          <NavLink to={`/project/dashboard?project=${selectedProject.id}`} className="black-text">
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="divider" tabIndex="-1"></li>
        <li>
          <NavLink to={`/project/quotations?project=${selectedProject.id}`} className="black-text">
            <span>Quotations</span>
          </NavLink>
        </li>
        <li className="divider" tabIndex="-1"></li>
        <li>
          <NavLink to={`/project/invoices?project=${selectedProject.id}`} className="black-text">
            <span>Invoicing</span>
          </NavLink>
        </li>
        <li className="divider" tabIndex="-1"></li>
        <li>
          <NavLink to={`/project/budget?project=${selectedProject.id}`} className="black-text">
            <span>Budget</span>
          </NavLink>
        </li>
        <li className="divider" tabIndex="-1"></li>
        <li>
          <NavLink to={`/project/analytics?project=${selectedProject.id}`} className="black-text">
            <span>Advanced Analytics</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedProject: getSelectedProject(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMenu);
