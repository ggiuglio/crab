import React from "react";
import { NavLink } from "react-router-dom";

const ProjectMenu = () => {
  return (
    <div>
      <ul id="menu-project-dd" className="dropdown-content dd-padding">
        <li>
          <NavLink to="/dashboard" className="black-text">
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="divider" tabIndex="-1"></li>
        <li>
          <NavLink to="/quotations" className="black-text">
            <span>Quotations</span>
          </NavLink>
        </li>
        <li className="divider" tabIndex="-1"></li>
        <li>
          <NavLink to="/invoice" className="black-text">
            <span>Invoicing</span>
          </NavLink>
        </li>
        <li className="divider" tabIndex="-1"></li>
        <li>
          <NavLink to="/budget" className="black-text">
            <span>Budget</span>
          </NavLink>
        </li>
        <li className="divider" tabIndex="-1"></li>
        <li>
          <NavLink to="/#" className="black-text">
            <span>Advanced Analytics</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default ProjectMenu;
