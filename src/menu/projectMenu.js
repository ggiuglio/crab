import React from "react";
import { connect } from "react-redux";
import { getSelectedProjectId } from "../store/selectors/projectSelectors";
import CustomNavLink from "../common/customNavLink";

const ProjectMenu = ({ selectedProjectId }) => {
  return (
    <ul className="tabs tabs-transparent">
      <li className="tab">
        <CustomNavLink
          to={`/project?project=${selectedProjectId}`}
          code="DSB"
        >
          <span>Dashboard</span>
        </CustomNavLink>
      </li>
      <li className="tab">
        <CustomNavLink
          to={`/project/quotations?project=${selectedProjectId}`}
          code="QTS"
        >
          <span>Quotations</span>
        </CustomNavLink>
      </li>
      <li className="tab">
        <CustomNavLink
          to={`/project/invoices?project=${selectedProjectId}`}
          code="INV"
        >
          <span>Invoicing</span>
        </CustomNavLink>
      </li>
      <li className="tab">
        <CustomNavLink
          to={`/project/budget?project=${selectedProjectId}`}
          code="BDG"
        >
          <span>Budget</span>
        </CustomNavLink>
      </li>
      <li className="tab">
        <CustomNavLink
          to={`/project/analytics?project=${selectedProjectId}`}
          code="ADA"
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMenu);
