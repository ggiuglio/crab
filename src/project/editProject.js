import React from "react";
import { connect } from "react-redux";
import { editSelectedProject } from "../store/actions/projectActions";
import { getSelectedProject } from "../store/selectors/projectSelectors";

const EditProject = ({
  project,
  editProject
}) => {

  const checkEditDisabled =
    !project ||
    !project.title ||
    !project.pm ||
    Object.keys(project.geos).length === 0 ||
    project.providers.length === 0;

  const saveProject = (e) => {
    e.preventDefault();

    const newProject = {
      title: project.title,
      geo: project.geos,
      creationDate: project.creationDate,
      updateDate: new Date().toLocaleString("It-it").split(",")[0],
      pm: project.pm,
      status: project.status,
      ownerId: project.ownerId,
      providers: project.providers
    };
    editProject(newProject, project.id);
  };

  return (
    <div>
      { project ? <div>

        <div className="input-field col s12 center">
          <button
            className="btn indigo lighten-1 z-depth-0"
            type="submit"
            disabled={checkEditDisabled}
            onClick={(e) => saveProject(e)}
          >
            SAVE
          </button>
        </div>

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
    editProject: (project, id) => dispatch(editSelectedProject(project, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProject);
