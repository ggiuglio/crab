import React from "react";
import { connect } from "react-redux";
import { selectProject } from "../store/actions/projectActions";
import CustomNavLink from "../common/customNavLink";
import M from "materialize-css/dist/js/materialize.min.js";

const ProjectTile = ({ project, chooseProject }) => {
  React.useEffect(() => {
    let tooltips = document.querySelectorAll(".tooltipped");
    M.Tooltip.init(tooltips);
  });

  const goToProjectPage = () => {
    chooseProject(project.id);
  };

  return (
    <div className="col s12">
      <div className="card indigo lighten-2">
        <div className="card-content">
          <div className="row card-text">
            <div className="col s10 m11">
              <div className="row">
                <CustomNavLink to={`/project?project=${project.id}`} code="DSB" onClick={goToProjectPage}>
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
                <span className="col s12 m1 center-align">
                  <i className="material-icons amber-text tooltipped" data-position="bottom" data-tooltip={project.status}>settings</i>
                </span>
              </div>
            </div>
            <div className="col s2 m1 center">
              <a
                className="modal-trigger transparent tooltipped"
                href="#modal-archive"
                data-position="bottom"
                data-tooltip="Archive project"
              >
                <i className="material-icons red-text text-darken-3">archive</i>
              </a>
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
