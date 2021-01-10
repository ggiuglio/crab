import React from "react";
import { connect } from "react-redux";
import { getSelectedProjectId } from "../store/selectors/projectSelectors";
import CustomNavLink from "../common/customNavLink";

const ProjectMenu = ({selectedProjectId}) => {

  return (
    <div>
      <ul id="menu-project-dd" className="dropdown-content dd-padding">
        <li>
          <CustomNavLink to={`/project?project=${selectedProjectId}`} className="black-text" code="DSB">
            <span>Dashboard</span>
          </CustomNavLink>
        </li>
        <li className="divider" tabIndex="-1"></li>
        <li>
          <CustomNavLink to={`/project/quotations?project=${selectedProjectId}`} className="black-text" code="QTS">
            <span>Quotations</span>
          </CustomNavLink>
        </li>
        <li className="divider" tabIndex="-1"></li>
        <li>
          <CustomNavLink to={`/project/invoices?project=${selectedProjectId}`} className="black-text" code="INV">
            <span>Invoicing</span>
          </CustomNavLink>
        </li>
        <li className="divider" tabIndex="-1"></li>
        <li>
          <CustomNavLink to={`/project/budget?project=${selectedProjectId}`} className="black-text" code="BDG">
            <span>Budget</span>
          </CustomNavLink>
        </li>
        <li className="divider" tabIndex="-1"></li>
        <li>
          <CustomNavLink to={`/project/analytics?project=${selectedProjectId}`} className="black-text" code="ADA">
            <span>Advanced Analytics</span>
          </CustomNavLink>
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
