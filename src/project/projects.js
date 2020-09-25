import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getProjects } from "../store/selectors/selector";
import M from "materialize-css/dist/js/materialize.min.js";
import ProjectTile from "./projectTile";
import { loadProjectsAction, clearUserData } from "../store/actions/actionsCreator";

const Projects = ({ projects, loadProjects, clearSelectedProject }) => {
  React.useEffect(() => {
    clearSelectedProject();
    if (projects) {
      let modal = document.querySelector(".modal");
      M.Modal.init(modal);
      let fab = document.querySelectorAll(".fixed-action-btn");
      M.FloatingActionButton.init(fab, { direction: "left" });
    } else {
      loadProjects();
    }
  }, []);

  return (
    <div className="container">
      <h4 className="center page-title"></h4>
      <div className="row">
        <div className="col s12 center">
          <NavLink
            className="btn-floating btn-large waves-effect waves-light indigo"
            to="#"
          >
            <i className="material-icons">add</i>
          </NavLink>
          <p>CREATE NEW PROJECTS</p>
        </div>
      </div>

      {projects ? (
        <div>
          <div className="row">
          { projects.map(p => <ProjectTile key={p.id} project={p} />) }
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
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
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
    loadProjects: () => dispatch(loadProjectsAction()),
    clearSelectedProject: () => dispatch(clearUserData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
