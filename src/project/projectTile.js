import React from "react";
import { connect } from "react-redux";
import { selectProject } from "../store/actions/projectActions";
import CustomNavLink from "../common/customNavLink";

const ProjectTile = ({ project, chooseProject, clearOldProject }) => {
  const goToProjectPage = () => {
    chooseProject(project.id);
  };

  return (
    <div className="col s12 l6">
      <div className="card indigo lighten-2">
        <div className="card-content" onClick={() => goToProjectPage()}>
          <CustomNavLink to={`/project?project=${project.id}`} code="DSB">
            <div className="white-text">
                <div className="row card-title">
                  <span className="bolder col s12 m6 s-center truncate" title={project.title}>{project.title}</span>
                  <span className="col s12 m6 s-center truncate" title={project.status}>{project.status}</span>
                </div>
                <div className="row">
                <span className="col s12 m6 s-center truncate" title={project.sponsor}>Sponsor: {project.sponsor} </span>
                <span className="col s12 m6 s-center truncate" title={project.PM}>PM: {project.pm}</span>
              </div>
              <div className="row">
                <span className="col s12 m6 s-center truncate" title={project.creationDate}>Creation date: {project.creationDate} </span>
                <span className="col s12 m6 s-center truncate" title={project.endDate}>End date: {project.endDate}</span>
              </div>
            </div>
          </CustomNavLink>
        </div>
        <div className="card-action clear-flow">
          <div className="fixed-action-btn static right">
            <a className="btn-floating orange darken-4"  href="#!">
              <i className="material-icons">menu</i>
            </a>
            <ul>
              <li key={"liarc_" + project.id}>
                <a
                  className="btn-floating btn-small red darken-1 modal-trigger"
                  href="#modal-archive"
                  title="Archive"
                >
                  <i className="material-icons">archive</i>
                </a>
              </li>
              <li key={"liedit_" + project.id}>
                <CustomNavLink
                  className="btn-floating btn-small green darken-1"
                  to="#"
                  iconType="MATERIAL"
                  iconName="edit"
                  code="PJS"
                />
              </li>
            </ul>
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
