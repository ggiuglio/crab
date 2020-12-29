import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProject, getSelectedProjectId } from "../store/selectors/selector";
import { selectProject, loadProjectAction } from "../store/actions/actionsCreator";
import Quotations from "../quotation/quotations";
import { history } from "../App";
import { QUOTATION_TYPES } from "../store/constants/constants";
import { startNewQuotation } from "../store/actions/quotationActions";
import CustomNavLink from "../common/customNavLink";

const Project = ({ selectedProjectId, project, chooseProject, loadProject, startNewQuotation }) => {
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
  });

  return (
    <div className="container">
      {project ? <div>
        <h4 className="center page-title">{project.title} - <span className="italic">{project.status}</span></h4>
        <div className="row">
          <div className="col s6 center">
            <CustomNavLink
              className="btn-floating btn-large waves-effect waves-light green darken-1"
              to={`/project/new-quotation?project=${selectedProjectId}&quotation-type=${QUOTATION_TYPES.SPONSOR}`}
              onClick={() => startNewQuotation(QUOTATION_TYPES.SPONSOR)}
              iconType="MATERIAL"
              iconName="add"
              code="QTN"
            />
            <p>CREATE NEW SPONSOR QUOTATION</p>
          </div>
          <div className="col s6 center">
            <CustomNavLink
              className="btn-floating btn-large waves-effect waves-light red darken-1"
              to={`/project/new-quotation?project=${selectedProjectId}&quotation-type=${QUOTATION_TYPES.PROVIDER}`}
              onClick={() => startNewQuotation(QUOTATION_TYPES.PROVIDER)}
              iconType="MATERIAL"
              iconName="add"
              code="QTN"
            />
            <p>CREATE NEW PROVIDER QUOTATION</p>
          </div>
        </div>
      </div>
      : ''}

      <Quotations />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedProjectId: getSelectedProjectId(state),
    project: getProject(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseProject: (projectId) => dispatch(selectProject(projectId)),
    loadProject: (projectId) => dispatch(loadProjectAction(projectId)),
    startNewQuotation: (type) => dispatch(startNewQuotation(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
