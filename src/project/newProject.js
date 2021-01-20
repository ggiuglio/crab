import React, { useEffect } from "react";
import { connect } from "react-redux";
import { initializeProject } from "../store/actions/projectActions";
import { getSelectedProject } from "../store/selectors/projectSelectors";
import Project from "./project";

const NewProject = ({ project, initializeNewProject }) => {
  useEffect(() => { 
    if (!project) {
      initializeNewProject();
    }
  }, [])

  return (
    <Project />
  )
}

const mapStateToProps = (state) => {
  return {
    project: getSelectedProject(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initializeNewProject: () => dispatch(initializeProject())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProject);