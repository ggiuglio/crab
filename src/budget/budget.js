import React from "react";
import { connect } from "react-redux";
import { getBudget, getSelectedProjectId, getProject } from "../store/selectors/selector";
import { history } from "../App";
import { selectProject, loadProjectAction } from "../store/actions/actionsCreator";

const Budget = ({selectedProjectId, chooseProject, budget, project, loadProject}) => {
  React.useEffect(() => {
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

  console.log('budget component', budget);

  return (
    <div>
     This is the budget page
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedProjectId: getSelectedProjectId(state),
    budget: getBudget(state),
    project: getProject(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseProject: (projectId) => dispatch(selectProject(projectId)),
    loadProject: (projectId) => dispatch(loadProjectAction(projectId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
