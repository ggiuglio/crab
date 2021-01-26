import React from "react";
import { connect } from "react-redux";
import { selectProject } from "../store/actions/projectActions";
import CustomNavLink from "../common/customNavLink";

const ProjectTile = ({ project, chooseProject }) => {
  const goToProjectPage = () => {
    chooseProject(project.id);
  };

  return (
    <div className="col s12">
      <div className="card indigo lighten-2">
        <div className="card-content">
          <div className="row card-text">
            <div className="col s11">
              <div className="row">
                <CustomNavLink to={`/project?project=${project.id}`} code="DSB" onClick={() => goToProjectPage()}>
                  <span
                    className="bolder col s12 m6 s-center truncate white-text"
                    title={project.title}
                  >
                    {project.title}
                  </span>
                  <span
                    className="col s12 m5 s-center truncate white-text"
                    title={project.sponsor}
                  >
                    {project.sponsor}
                  </span>
                </CustomNavLink>
                <span className="col s12 m1 center-align tooltip relative m-space-up">
                  <span className="tooltiptext bottom">{project.status}</span>
                  {project.status.toLowerCase() === "open" ? (
                    <i className="material-icons amber-text">lock_open</i>
                  ) : (
                    <i className="material-icons brown-text text-darken-3">
                      lock
                    </i>
                  )}
                </span>
              </div>
            </div>
            <div className="col s1 card-action-btn relative">
              <div>
                <div className="fixed-action-btn absolute">
                  <span className="tooltip relative">
                    <a
                      className="btn-floating btn-small red darken-1 modal-trigger"
                      href="#modal-archive"
                    >
                      <i className="material-icons">archive</i>
                    </a>
                    <span className="tooltiptext bottom">Archive</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseProject: (projectId) => dispatch(selectProject(projectId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTile);
