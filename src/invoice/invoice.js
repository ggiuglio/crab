import React, { useEffect } from "react";
import { connect } from "react-redux";
import InvoiceList from "./invoiceList";
import NewInvoice from "./newInvoice";
import {
  selectProject,
  loadProjectAction,
} from "../store/actions/projectActions";
import {
  getSelectedProjectId,
  getProject,
} from "../store/selectors/projectSelectors";
import InvoiceFilter from "./invoiceFilter";
import { history } from "../App";
import M from "materialize-css/dist/js/materialize.min.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/invoice.css";

const Invoice = ({
  selectedProjectId,
  project,
  chooseProject,
  loadProject,
}) => {
  useEffect(() => {
    if (!selectedProjectId) {
      const query = new URLSearchParams(history.location.search);
      const queryProject = query.get("project");
      if (queryProject) {
        chooseProject(queryProject);
      } else {
        history.push("/");
      }
    } else {
      if (!project || project.id !== selectedProjectId) {
        loadProject(selectedProjectId);
      }
    }

    let collapsible = document.querySelectorAll(".collapsible");
    if (collapsible) M.Collapsible.init(collapsible, { accordion: false });
    let tooltips = document.querySelectorAll(".tooltipped");
    M.Tooltip.init(tooltips);
  });

  return (
    <div>
      <div className="row">
        <div className="col s12">
          <ul className="collapsible">
            <li>
              <div className="collapsible-header indigo lighten-2 block center">
                <a
                  href="#!"
                  className="btn-floating btn-small waves-effect waves-light indigo darken-4 white-text tooltipped"
                  title="Insert new activity"
                  data-position="bottom"
                  data-tooltip="Insert new activity"
                >
                  <i className="small material-icons">add</i>
                </a>
              </div>
              <NewInvoice />
            </li>
            <li className="hide-on-large-only">
              <div className="collapsible-header indigo lighten-2 block center">
                <a
                  href="#!"
                  className="btn-floating btn-small waves-effect waves-light indigo darken-4 tooltipped"
                  title="Filter activities"
                  data-position="bottom"
                  data-tooltip="Filter activities"
                >
                  <FontAwesomeIcon
                  icon="filter"
                  className="white-text "
                  fixedWidth
                />
                </a>
              </div>
              <InvoiceFilter isSmall={true} />
            </li>
          </ul>

          <div className="row">
            <div className="col l2 hide-on-med-and-down">
              <InvoiceFilter isSmall={false} />
            </div>
            <div className="col s12 l10">
              <InvoiceList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedProjectId: getSelectedProjectId(state),
    project: getProject(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseProject: (projectId) => dispatch(selectProject(projectId)),
    loadProject: (projectId) => dispatch(loadProjectAction(projectId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
