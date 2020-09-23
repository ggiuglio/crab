import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { loadProjectAction, selectProject } from "../store/actions/actionsCreator";

const ProjectTile = ({ project, chooseProject, loadProject }) => {
  const goToProjectPage = () => {
    chooseProject(project.id);
    loadProject();
  };

  return (
    <div className="col s12 l6">
      <div className="card indigo lighten-2">
        <div className="card-content" onClick={() => goToProjectPage()}>
          <NavLink to="quotations">
            <div className="white-text">
              <p className="card-title">
                <span className="bolder">{project.title}</span>
                <span className="right">{project.status}</span>
              </p>
              <p>
                <span>Sponsor: {project.sponsor} </span>
                <span className="right">PM: {project.PM}</span>
              </p>
              <p>
                <span>Creation date: {project.creationDate} </span>
                <span className="right">End date: {project.endDate}</span>
              </p>
            </div>
          </NavLink>
        </div>
        <div className="card-action clear-flow">
          <div className="fixed-action-btn static right">
            <a className="btn-floating orange darken-4">
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
                <NavLink
                  className="btn-floating btn-small green darken-1"
                  to="#"
                >
                  <i className="material-icons">edit</i>
                </NavLink>
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
    loadProject: () => dispatch(loadProjectAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTile);
