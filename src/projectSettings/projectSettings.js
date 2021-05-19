import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getSelectedProjectId,
  getSelectedProjectModules,
  getSelectedProject,
} from "../store/selectors/projectSelectors";
import { history } from "../App";
import {
  loadProjectAction,
  selectProject,
  resetProjectModulesAction,
  removeProjectModuleAction,
  removeProjectActivityAction,
  addProjectModuleAction,
  addProjectActivityAction,
} from "../store/actions/projectActions";
import M from "materialize-css/dist/js/materialize.min.js";
import "./css/settings.css";

const ProjectSettings = ({
  project,
  modules,
  selectedProjectId,
  chooseProject,
  loadProject,
  removeProjectModule,
  removeProjectActivity,
  resetToDefaultProjetModule,
  addNewModule,
  addNewActivity,
}) => {
  useEffect(() => {
    if (!selectedProjectId) {
      const query = new URLSearchParams(history.location.search);
      const queryProject = query.get("project");
      if (queryProject) {
        chooseProject(queryProject);
      } else {
        history.push("/");
      }
    } else {
      if (!project || project.id !== selectedProjectId) {
        loadProject(selectedProjectId);
      }
    }

    let modCollapsible = document.getElementById('add-module-collapsible');
    if (modCollapsible) M.Collapsible.init(modCollapsible, { accordion: false });
    let tooltips = document.querySelectorAll(".tooltipped");
    M.Tooltip.init(tooltips);
  });

  useEffect(() => {
    if (modules) {
      let modal = document.getElementById("modal-activity");
      M.Modal.init(modal, { onCloseEnd: cancelActivity() });

      let openPanels = document.querySelectorAll(".open-panel");
      Object.keys(openPanels).forEach((i) => {
        openPanels[i].addEventListener(
          "click",
          (e) => {
            if(!e.target.classList.contains('no-open')) {
              openPanels[i].classList.toggle('active');
              openPanels[i].querySelector(".collapsible-body").classList.toggle('block');
            }
          },
        );
      });
    }
  }, [modules]);

  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [newModuleCode, setNewModuleCode] = useState("");
  const [isPassthrough, setIsPassthrough] = useState(false);

  const [newActivityModule, setNewActivityModule] = useState(null);
  const [newActivityTitle, setNewActivityTitle] = useState("");
  const [newActivityCode, setNewActivityCode] = useState("");
  const [newActivityUnit, setNewActivityUnit] = useState("");

  const addModule = () => {
    if (newModuleTitle && newModuleCode) {
      const module = {
        title: newModuleTitle,
        code: newModuleCode,
        activities: [],
        isPassthrough: isPassthrough,
        index: modules[modules.length - 1].index + 1,
      };
      addNewModule(project.id, module);
      setNewModuleTitle("");
      setNewModuleCode("");
      setIsPassthrough(false);
    }
  };

  const cancelActivity = () => {
    setNewActivityModule(null);
  };

  const addActivity = () => {
    if (newActivityTitle && setNewActivityCode) {
      const activity = {
        title: newActivityTitle,
        code: newActivityCode,
        unit: newActivityUnit,
        index:
          newActivityModule.activities.length > 0
            ? newActivityModule.activities[
                newActivityModule.activities.length - 1
              ].index + 1
            : 1,
      };
      addNewActivity(project.id, newActivityModule.id, activity);

      setNewActivityModule(null);
      setNewActivityTitle("");
      setNewActivityCode("");
      setNewActivityUnit("");
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col s12">
          <ul id="add-module-collapsible" className="collapsible">
            <li>
              <div className="collapsible-header indigo lighten-2 block center">
                <a
                  href="#!"
                  className="btn-floating btn-small waves-effect waves-light indigo darken-4 white-text tooltipped"
                  title="Add module"
                  data-position="bottom"
                  data-tooltip="Add module"
                >
                  <i className="small material-icons">add</i>
                </a>
              </div>
              <div className="collapsible-body">
                <div className="section">
                  <div className="row">
                    <div className="input-field col s4">
                      <label className="active" htmlFor="moduleTitle">
                        Module title
                      </label>
                      <input
                        name="moduleTitle"
                        type="text"
                        value={newModuleTitle}
                        onChange={(e) => setNewModuleTitle(e.target.value)}
                      ></input>
                    </div>
                    <div className="input-field col s4">
                      <label className="active" htmlFor="moduleCode">
                        Module code
                      </label>
                      <input
                        name="moduleCode"
                        type="text"
                        value={newModuleCode}
                        onChange={(e) => setNewModuleCode(e.target.value)}
                      ></input>
                    </div>
                    <div className="input-field col s2">
                      <label>
                        <input
                          type="checkbox"
                          checked={isPassthrough}
                          onChange={(e) => setIsPassthrough()}
                        />
                        <span>Pass through</span>
                      </label>
                    </div>
                    <div className="input-field col s2">
                      <button
                        className="btn indigo lighten-1 z-depth-0"
                        onClick={() => addModule()}
                      >
                        Add module
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <div className="section">
            <ul className="collapsible">
              <li key="module_0">
                <div className="settings-module-header">
                  <div className="row">
                    <div className="col s5">Module title</div>
                    <div className="col s3">Module code</div>
                    <div className="col s2 hide-on-small-only">Pass throught</div>
                    <div className="col s2 hide-on-med-and-up">Pass th.</div>
                    <div className="col s1"></div>
                    <div className="col s1"></div>
                  </div>
                </div>
              </li>
              {modules
                ? modules.map((module, idx) => (
                    <li key={`${module.id}_${idx}`} className="open-panel">
                      <div className="collapsible-header indigo lighten-4 block">
                        <div className="row">
                          <div className="col s5">{module.title}</div>
                          <div className="col s3">{module.code}</div>
                          <div className="col s2">
                            {module.isPassthrough ? "Yes" : "No"}
                          </div>
                          <div className="col s1 center no-open">
                            <a
                              className="modal-trigger transparent tooltipped no-open"
                              href="#modal-activity"
                              data-position="bottom"
                              data-tooltip="Add activity"
                              onClick={() => setNewActivityModule(module)}
                            >
                              <i className="material-icons small no-open green-text text-darken-2 add" title="add">
                                add
                              </i>
                            </a>
                          </div>
                          <div className="col s1 center">
                            <a
                              className="transparent tooltipped"
                              data-position="bottom"
                              data-tooltip="Delete module"
                              onClickCapture={() => removeProjectModule(project.id, module.id) }
                            >
                              <i
                                className="material-icons delete small red-text text-darken-2"
                                title="Delete"
                              ></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="collapsible-body">
                        <div className="row">
                          <div className="col offset-l1 s12 l10">
                            <table className="settings-activity-table responsive-table">
                              <thead>
                                <tr>
                                  <th className="hide-on-med-and-down" width="60%">Activity title</th>
                                  <th className="hide-on-med-and-down" width="35%">Activity code</th>
                                  <th className="hide-on-med-and-down center" width="5%">Delete</th>
                                  <th className="hide-on-large-only" width="60%">Title</th>
                                  <th className="hide-on-large-only" width="35%">Code</th>
                                  <th className="hide-on-large-only" width="5%">Del.</th>
                                </tr>
                              </thead>
                              <tbody>
                                {module.activities.map((activity) => (
                                  <tr key={`${module.id}-${activity.id}`}>
                                    <td>{activity.title}</td>
                                    <td>{activity.code}</td>
                                    <td className="delete-cell center">
                                      <a
                                        className="transparent tooltipped"
                                        data-position="bottom"
                                        data-tooltip="Delete activity"
                                        onClick={() =>
                                          removeProjectActivity(
                                            project.id,
                                            module.id,
                                            activity.id
                                          )
                                        }
                                      >
                                        <i
                                          className="material-icons delete small"
                                          title="Delete"
                                        ></i>
                                      </a>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                : ""}
            </ul>

            <button
              className="btn indigo lighten-1 z-depth-0"
              onClick={() => resetToDefaultProjetModule(project.id)}
            >
              Reset to default
            </button>
          </div>

          <div id="modal-activity" className="modal">
            <div className="modal-content">
              <h4>Add activity</h4>
              <div className="row">
                <div className="input-field col s4">
                  <label className="active" htmlFor="moduleTitle">
                    Activity title
                  </label>
                  <input
                    name="moduleTitle"
                    type="text"
                    onChange={(e) => setNewActivityTitle(e.target.value)}
                  ></input>
                </div>
                <div className="input-field col s4">
                  <label className="active" htmlFor="moduleCode">
                    Activity code
                  </label>
                  <input
                    name="moduleCode"
                    type="text"
                    onChange={(e) => setNewActivityCode(e.target.value)}
                  ></input>
                </div>
                <div className="input-field col s4">
                  <label className="active" htmlFor="moduleCode">
                    Unit
                  </label>
                  <input
                    name="moduleCode"
                    type="text"
                    onChange={(e) => setNewActivityUnit(e.target.value)}
                  ></input>
                </div>
              </div>
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
                className="modal-close btn indigo lighten-1 waves-effect waves-light"
                onClick={() => addActivity()}
              >
                Ok
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    project: getSelectedProject(state),
    modules: getSelectedProjectModules(state),
    selectedProjectId: getSelectedProjectId(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseProject: (projectId) => dispatch(selectProject(projectId)),
    loadProject: (projectId) => dispatch(loadProjectAction(projectId)),
    resetToDefaultProjetModule: (projectId) =>
      dispatch(resetProjectModulesAction(projectId)),
    removeProjectModule: (projectId, moduleId) =>
      dispatch(removeProjectModuleAction(projectId, moduleId)),
    removeProjectActivity: (projectId, moduleId, activityId) =>
      dispatch(removeProjectActivityAction(projectId, moduleId, activityId)),
    addNewModule: (projectId, module) =>
      dispatch(addProjectModuleAction(projectId, module)),
    addNewActivity: (projectId, moduleId, activity) =>
      dispatch(addProjectActivityAction(projectId, moduleId, activity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSettings);
