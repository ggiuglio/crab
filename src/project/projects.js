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
import { setProjectMenuAction } from "../store/actions/genericActions";

const Projects = ({ projects, clearSelectedProject, startNewProject, clearProjectMenu }) => {
  React.useEffect(() => {
    clearSelectedProject();
    clearProjectMenu();

    let newPrjTooltip = document.querySelector(".tooltipped");
    M.Tooltip.init(newPrjTooltip);
  }, []);
  
  React.useEffect(() => {
    if (projects) {
      let modal = document.querySelector(".modal");
      M.Modal.init(modal);
    }
  });

  return (
    <div className="container">
      <h4 className="center page-title"></h4>
      <div className="row">
        <div className="col s12 center">
          <CustomNavLink
            className="btn-floating btn-small waves-effect waves-light indigo tooltipped"
            to="/new-project"
            iconType="MATERIAL"
            iconName="add"
            code="NPJ"
            onClick={() => startNewProject()}
            dataPosition="bottom"
            dataTooltip="Create new project"
          />
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
              <h5>Are you sure you want to archive this project?</h5>
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
    clearProjectMenu: () => dispatch(setProjectMenuAction(undefined)),
    startNewProject: () => dispatch(initializeProject()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
