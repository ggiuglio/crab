import React from "react";
import { connect } from "react-redux";
import { VIEW_MODES } from "../constants/constants";
import {
  setProjectViewMode,
  cancelProjectEdit,
} from "../store/actions/projectActions";
import { getSelectedProject } from "../store/selectors/projectSelectors";

const ProjectViewMode = ({
  project,
  startEditProject,
  cancelEditProject
}) => {
  return (
    <div className="col s1">
      { project ? <div>
      {project.viewMode === VIEW_MODES.VIEW ? (
        <a
          href="#!"
          className="btn-floating btn-small waves-effect waves-light indigo"
          onClick={() => startEditProject()}
          title="Edit project"
        >
          <i className="material-icons">edit</i>
        </a>
      ) : (
        ""
      )}
      {project.viewMode === VIEW_MODES.EDIT ? (
        <a
          href="#!"
          className="btn-floating btn-small waves-effect waves-light red darken-1"
          onClick={() => cancelEditProject()}
          title="Cancel edit project"
        >
          <i className="material-icons">undo</i>
        </a>
      ) : (
        ""
      )}
      </div> : ""}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    project: getSelectedProject(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startEditProject: () => dispatch(setProjectViewMode(VIEW_MODES.EDIT)),
    cancelEditProject: () => dispatch(cancelProjectEdit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectViewMode);
