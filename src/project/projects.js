import React from "react";
import { connect } from "react-redux";
import { getProjects } from "../store/selectors/projectSelectors";
import M from "materialize-css/dist/js/materialize.min.js";
import ProjectTile from "./projectTile";
import {
  selectProject,
  initializeProject,
} from "../store/actions/projectActions";
import Preloader from "../common/preloader";
import CustomNavLink from "../common/customNavLink";

const Projects = ({ projects, clearSelectedProject, startNewProject }) => {
  React.useEffect(() => {
    clearSelectedProject();

    if (projects) {
      let modal = document.querySelector(".modal");
      M.Modal.init(modal);
    }
  }, []);

  return (
    <div className="container">
      <h4 className="center page-title"></h4>
      <div className="row">
        <div className="col s12 center">
          <span className="tooltip relative">
            <CustomNavLink
              className="btn-floating waves-effect waves-light indigo"
              to="/new-project"
              iconType="MATERIAL"
              iconName="add"
              code="NPJ"
              onClick={() => startNewProject()}
            />
            <span className="tooltiptext right">Create new project</span>
          </span>
        </div>
      </div>

      {projects ? (
        <div>
          <div className="row">
            {projects.map((p) => (
              <ProjectTile key={p.id} project={p} />
            ))}
          </div>

          <div id="modal-archive" className="modal">
            <div className="modal-content">
              <h4>Project Archiving</h4>
              <p>Are you sure you want to archive this project?</p>
            </div>
            <div className="modal-footer">
              <a
                href="#!"
                className="modal-close waves-effect waves-indigo btn-flat"
              >
                Cancel
              </a>
              <a
                href="#!"
                className="modal-close btn red darken-2 waves-effect waves-light"
              >
                Ok
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="center valign-page-center">
          <Preloader classes="preloader-wrapper big active" />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: getProjects(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearSelectedProject: () => dispatch(selectProject(null)),
    startNewProject: () => dispatch(initializeProject()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
