import React from "react";
import { connect } from "react-redux";
import { createNewProject } from "../store/actions/projectActions";
import { getSelectedProject } from "../store/selectors/projectSelectors";

const CreateProject = ({
  project,
  createProject
}) => {

  const checkCreateDisabled =
    !project ||
    !project.title ||
    !project.pm ||
    !project.sponsor ||
    Object.keys(project.geos).length === 0 ||
    project.providers.length === 0;

  const saveProject = (e) => {
    e.preventDefault();

    const newProject = {
      title: project.title,
      sponsor: project.sponsor,
      geo: project.geos,
      creationDate: new Date().toLocaleString("It-it").split(",")[0],
      pm: project.pm,
      status: "Open",
      providers: project.providers
    };
    createProject(newProject);
  };

  return (
    <div>
      { project ? <div>

        <div className="input-field col s12 center">
          <button
            className="btn indigo lighten-1 z-depth-0"
            type="submit"
            disabled={checkCreateDisabled}
            onClick={(e) => saveProject(e)}
          >
            Create
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
    createProject: (project) => dispatch(createNewProject(project)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
