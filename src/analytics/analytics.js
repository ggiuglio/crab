import React from "react";
import { connect } from "react-redux";
import { getSelectedProjectId } from "../store/selectors/projectSelectors";
import { history } from "../App";

const Analytics = ({selectedProject, chooseProject}) => {
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
     This is the Analytics page
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedProject: getSelectedProjectId(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
