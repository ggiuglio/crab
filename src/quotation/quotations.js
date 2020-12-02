import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getProject, getSelectedProjectId } from "../store/selectors/selector";
import { getQuotations } from "../store/selectors/quotationSelector";
import { selectProject, loadProjectAction } from "../store/actions/actionsCreator";
import M from "materialize-css/dist/js/materialize.min.js";
import QuotationTile from "./quotationTile";
import { history } from "../App";
import {QUOTATION_TYPES} from "../store/constants/constants";
import { startNewQuotation } from "../store/actions/quotationActions";

const Quotations = ({ selectedProjectId, project, quotations, chooseProject, loadProject, startNewQuotation }) => {
  useEffect(() => {
    if(!selectedProjectId) {
      const query = new URLSearchParams(history.location.search);
      const queryProject = query.get('project')
      if(queryProject) {
        chooseProject(queryProject);
      }
      else {
        history.push('/');
      }
    } else {
      if (!project || project.id !== selectedProjectId) {
        loadProject(selectedProjectId);
      }
    }

    if (quotations) {
      let modal = document.querySelector(".modal");
      M.Modal.init(modal);
      let fab = document.querySelectorAll(".fixed-action-btn");
      M.FloatingActionButton.init(fab, { direction: "left" });
    }
  });

  return (
    <div className="container">
      {project ? <div>
        <h4 className="center page-title">{project.title} - <span className="italic">{project.status}</span></h4>
        <div className="row">
          <div className="col s6 center">
            <NavLink
              className="btn-floating btn-large waves-effect waves-light green darken-1"
              to={`/project/new-quotation?project=${selectedProjectId}&quotation-type=${QUOTATION_TYPES.SPONSOR}`}
              onClick={() => startNewQuotation(QUOTATION_TYPES.SPONSOR)}
            >
              <i className="material-icons">add</i>
            </NavLink>
            <p>CREATE NEW SPONSOR QUOTATION</p>
          </div>
          <div className="col s6 center">
            <NavLink
              className="btn-floating btn-large waves-effect waves-light red darken-1"
              to={`/project/new-quotation?project=${selectedProjectId}&quotation-type=${QUOTATION_TYPES.PROVIDER}`}
              onClick={() => startNewQuotation(QUOTATION_TYPES.PROVIDER)}
            >
              <i className="material-icons">add</i>
            </NavLink>
            <p>CREATE NEW PROVIDER QUOTATION</p>
          </div>
        </div>
      </div>
      : ''}

      { quotations !== undefined ? 
        <div>
          <div className="row">
            { quotations.map(q => <QuotationTile key={q.id} projectId={project.id} quotation={q} />) }
          </div>
          <div id="modal-archive" className="modal">
            <div className="modal-content">
            <h4>Quotation Archiving</h4>
            <p>Are you sure you want to archive this quotation?</p>
            </div>
            <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-indigo btn-flat"
            >
              Cancel
            </a>
            <a
              href="#!"
              className="modal-close btn red darken-2 waves-effect waves-light"
            >
              Ok
            </a>
            </div>
          </div>
        </div>
        : (
        <div className="center valign-page-center">
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedProjectId: getSelectedProjectId(state),
    project: getProject(state),
    quotations: getQuotations(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseProject: (projectId) => dispatch(selectProject(projectId)),
    loadProject: (projectId) => dispatch(loadProjectAction(projectId)),
    startNewQuotation: (type) => dispatch(startNewQuotation(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quotations);
