import React from "react";
import { connect } from "react-redux";
import { selectProject } from "../store/actions/projectActions";
import CustomNavLink from "../common/customNavLink";
import M from "materialize-css/dist/js/materialize.min.js";

const ProjectTile = ({ project, chooseProject }) => {
  React.useEffect(() => {
    if (project) {
      let fab = document.querySelectorAll(".fixed-action-btn");
      M.FloatingActionButton.init(fab, { direction: 'buttom', hoverEnabled: false });
    }
  }, []);

  const goToProjectPage = () => {
    chooseProject(project.id);
  };

  return (
    <div className="col s12">
      <div className="card indigo lighten-2">
        <div className="card-content" onClick={() => goToProjectPage()}>
          <div className="white-text">
            <div className="row card-title">
              <CustomNavLink to={`/project?project=${project.id}`} code="DSB">
                <span
                  className="bolder col s12 m6 s-center truncate white-text"
                  title={project.title}
                >
                  {project.title}
                </span>
                <span
                  className="col s11 m5 s-center truncate white-text"
                  title={project.status}
                >
                  {project.status}
                </span>
              </CustomNavLink>
              <div className="col s1 relative">
                <div>
                  <div className="fixed-action-btn absolute">
                    <a
                      className="btn-floating btn-small orange darken-4"
                      href="#!"
                    >
                      <i className="material-icons">menu</i>
                    </a>
                    <ul>
                      <li key={"liarc_" + project.id} className="tooltip relative">
                        <a
                          className="btn-floating btn-small red darken-1 modal-trigger"
                          href="#modal-archive"
                        >
                          <i className="material-icons">archive</i>
                        </a>
                        <span className="tooltiptext right">Archive</span>
                      </li>
                      <li key={"liedit_" + project.id} className="tooltip relative">
                        <CustomNavLink
                          className="btn-floating btn-small yellow darken-1"
                          to="#"
                          iconType="MATERIAL"
                          iconName="edit"
                          code="PJS"
                        />
                          <span className="tooltiptext right">Edit</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <span
                className="col s12 m3 s-center truncate"
                title={project.sponsor}
              >
                Sponsor: {project.sponsor}{" "}
              </span>
              <span className="col s12 m3 s-center truncate" title={project.PM}>
                PM: {project.pm}
              </span>
              <span
                className="col s12 m3 s-center truncate"
                title={project.creationDate}
              >
                Creation date: {project.creationDate}{" "}
              </span>
              <span
                className="col s12 m3 s-center truncate"
                title={project.endDate}
              >
                End date: {project.endDate}
              </span>
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
