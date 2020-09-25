import React from "react";
import { connect } from "react-redux";
import { getSelectedProject } from "../store/selectors/selector";
import { history } from "../App";

const Dahsboard = ({selectedProject, chooseProject}) => {
  React.useEffect(() => {
    if(!selectedProject) {
      const query = new URLSearchParams(history.location.search);
      const queryProject = query.get('project')
      if(queryProject) {
        chooseProject(queryProject);
      }
      else {
        history.push('/');
      }
    }
  });

  return (
    <div>
     This is the dashboard
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedProject: getSelectedProject(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dahsboard);
