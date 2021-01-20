import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getSelectedProject, getSelectedProjectId } from "../store/selectors/projectSelectors";
import { selectProject, loadProjectAction } from "../store/actions/projectActions";
import ProjectViewMode from "./projectViewMode";
import { history } from "../App";
import Project from "./project"
import EditProject from "./editProject";
import { VIEW_MODES } from "../constants/constants";

const ProjectDashboard = ({ selectedProjectId, project, chooseProject, loadProject }) => {
  useEffect(() => {
    if (!selectedProjectId) {
      const query = new URLSearchParams(history.location.search);
      const queryProject = query.get('project')
      if (queryProject) {
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
        <div>
          <ProjectViewMode />
          <Project />
          {project.viewMode === VIEW_MODES.EDIT ?
            <EditProject />
            : ""}
        </div>
        : ''}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedProjectId: getSelectedProjectId(state),
    project: getSelectedProject(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseProject: (projectId) => dispatch(selectProject(projectId)),
    loadProject: (projectId) => dispatch(loadProjectAction(projectId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDashboard);
