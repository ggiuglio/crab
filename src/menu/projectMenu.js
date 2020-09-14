import React from "react";
import { NavLink } from "react-router-dom";

const ProjectMenu = () => {
  return (
    <div>
      <ul id="menu-project-dd" className="dropdown-content dd-padding">
        <li>
          <p>
            <NavLink to="/dashboard" className="black-text">
              Dashboard
            </NavLink>
          </p>
        </li>
        <li className="divider" tabIndex="-1"></li>
        <li>
          <p>
            <NavLink to="/quotations" className="black-text">
              Quotations
            </NavLink>
          </p>
        </li>
        <li className="divider" tabIndex="-1"></li>
        <li>
          <p>
            <NavLink to="/invoice" className="black-text">
              Invoicing
            </NavLink>
          </p>
        </li>
        <li className="divider" tabIndex="-1"></li>
        <li>
          <p>
            <NavLink to="/budget" className="black-text">
              Budget
            </NavLink>
          </p>
        </li>
        <li className="divider" tabIndex="-1"></li>
        <li>
          <p>
            <NavLink to="/#" className="black-text">
              Advanced Analytics
            </NavLink>
          </p>
        </li>
      </ul>
    </div>
  );
};

export default ProjectMenu;
