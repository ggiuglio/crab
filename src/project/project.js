import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProject, getSelectedProjectId } from "../store/selectors/projectSelectors";
import { selectProject, loadProjectAction } from "../store/actions/projectActions";
import Dashboard from "../dashboard/dashboard";
import { history } from "../App";

const Project = ({ selectedProjectId, project, chooseProject, loadProject }) => {
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
      {project ? 
        <h6 className="center page-title">{project.title}</h6>
        // aggiugnere info progetto - bandierine ecc...
      : ''}

      <Dashboard />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
