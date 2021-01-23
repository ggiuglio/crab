import React from "react";
import { connect } from "react-redux";
import { getSelectedProject } from "../store/selectors/projectSelectors";
import CustomNavLink from "../common/customNavLink";
import M from "materialize-css/dist/js/materialize.min.js";

const ProjectOperations = ({ project }) => {
  React.useEffect(() => {
    if (project) {
      let fab = document.querySelector(".fixed-action-btn");
      M.FloatingActionButton.init(fab, {
        direction: "left",
        hoverEnabled: false,
      });
    }
  }, []);

  return (
    <div className="col s11 relative">
      {project ? (
        <div>
          <div className="fixed-action-btn absolute right">
            <a className="btn-floating btn-small orange darken-4" href="#!">
              <i className="material-icons">menu</i>
            </a>
            <ul>
              <li className="tooltip relative" key="quotations">
                <CustomNavLink
                  className="btn-floating btn-small orange lighten-2"
                  to={`/project/quotations?project=${project.id}`}
                  iconType="AWESOME"
                  iconName="search-dollar"
                  code="QTS"
                />
                <span className="tooltiptext bottom">Quotations</span>
              </li>
              <li className="tooltip relative" key="invoice">
                <CustomNavLink
                  className="btn-floating btn-small orange lighten-2"
                  to={`/project/invoices?project=${project.id}`}
                  iconType="AWESOME"
                  iconName="file-invoice-dollar"
                  code="INV"
                />
                <span className="tooltiptext bottom">Invoicing</span>
              </li>
              <li className="tooltip relative" key="budget">
                <CustomNavLink
                  className="btn-floating btn-small orange lighten-2"
                  to={`/project/budget?project=${project.id}`}
                  iconType="AWESOME"
                  iconName="piggy-bank"
                  code="BDG"
                />
                <span className="tooltiptext bottom">Budget</span>
              </li>
              <li className="tooltip relative" key="advanalytics">
                <CustomNavLink
                  className="btn-floating btn-small orange lighten-2"
                  to={`/project/analytics?project=${project.id}`}
                  iconType="AWESOME"
                  iconName="chart-line"
                  code="ADA"
                />
                <span className="tooltiptext bottom">Advanced Analytics</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    project: getSelectedProject(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectOperations);
