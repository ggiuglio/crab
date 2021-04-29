import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSelectedProjectId, getSelectedProjectModules, getSelectedProject } from "../store/selectors/projectSelectors";
import { history } from "../App";
import { loadProjectAction, selectProject, resetProjectModulesAction, removeProjectModuleAction, removeProjectActivityAction, addProjectModuleAction, addProjectActivityAction } from "../store/actions/projectActions";

const ProjectSettings = ({ project, modules, selectedProjectId, chooseProject, loadProject, removeProjectModule, removeProjectActivity, resetToDefaultProjetModule, addNewModule, addNewActivity }) => {
  useEffect(() => {
    if (!selectedProjectId) {
      const query = new URLSearchParams(history.location.search);
      const queryProject = query.get('project')
      if (queryProject) {
        chooseProject(queryProject);
      }
      else {
        history.push('/');
      }
    } else {
      if (!project || project.id !== selectedProjectId) {
        loadProject(selectedProjectId);
      }
    }
  });

  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newModuleCode, setNewModuleCode] = useState('');
  const [isPassthrough, setIsPassthrough] = useState(false);

  const [newActivityModule, setNewActivityModule] = useState(null);
  const [newActivityTitle, setNewActivityTitle] = useState('');
  const [newActivityCode, setNewActivityCode] = useState('');
  const [newActivityUnit, setNewActivityUnit] = useState('');

  const addModule = () => {
    if (newModuleTitle && newModuleCode) {
      const module = {
        title: newModuleTitle,
        code: newModuleCode,
        activities: [],
        isPassthrough: isPassthrough,
        index: modules[modules.length - 1].index + 1
      };
      addNewModule(project.id, module);
      setNewModuleTitle('');
      setNewModuleCode('');
      setIsPassthrough(false);
    }
  }

  const cancelActivity = () => {
    setNewActivityModule(null)
  }

  const addActivity = () => {
    if (newActivityTitle && setNewActivityCode) {
      const activity = {
        title: newActivityTitle,
        code: newActivityCode,
        unit: newActivityUnit,
        index: newActivityModule.activities.length > 0 ? newActivityModule.activities[newActivityModule.activities.length - 1].index + 1 : 1
      };
      addNewActivity(project.id, newActivityModule.id, activity);

      setNewActivityModule(null);
      setNewActivityTitle('');
      setNewActivityCode('');
      setNewActivityUnit('');
    }
  }

  return (
    <div className="container">
      <div className="bolder card-text">Add module</div>
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
            <input type="checkbox" checked={isPassthrough} onChange={e => setIsPassthrough()} />
            <span>Pass through</span>
          </label>
        </div>
        <div className="input-field col s2">
          <button
            className="btn indigo lighten-1 z-depth-0"
            onClick={() => addModule()}
          >Add module</button>
        </div>
      </div>

      <table className="responsive-table">
        <thead className="s-active">
          <tr>
            <th>
              Module title
            </th>
            <th>
              Module code
            </th>
            <th>
              Pass throught
            </th>
            <th width="36px">
            </th>
            <th width="36px">
            </th>
          </tr>
        </thead>
        <tbody>
          {
            modules ? modules.map((module) =>
              <>
                <tr>
                  <td>
                    {module.title}
                  </td>
                  <td>
                    {module.code}
                  </td>
                  <td>
                    {module.isPassthrough ? 'Yes' : 'No'}
                  </td>
                  <td className="delete-cell center">
                    <i
                      className="material-icons small"
                      title="Add"
                      onClick={() => setNewActivityModule(module)}
                    >add</i>
                  </td>
                  <td className="delete-cell center">
                    <i
                      className="material-icons delete small"
                      title="Delete"
                      onClick={() => removeProjectModule(project.id, module.id)}
                    ></i>
                  </td>
                </tr>
                <tr>
                  <td colSpan="5">
                    <table className="responsive-table">
                      <thead className="s-active">
                        <tr>
                          <th>+ &ensp;</th>
                          <th width="60%">
                            Activity title
                            </th>
                          <th>
                            Activity code
                            </th>
                          <th>
                          </th>
                          <th width="36px">
                            &ensp;
                          </th>
                          <th width="35px">
                            &ensp;
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          module.activities.map((activity) =>
                            <tr>
                              <td>&ensp;&ensp;</td>
                              <td>{activity.title}</td>
                              <td>{activity.code}</td>
                              <td>&ensp;&ensp;</td>
                              <td className="delete-cell center">&ensp;</td>
                              <td className="delete-cell center">
                                <i
                                  className="material-icons delete small"
                                  title="Delete"
                                  onClick={() => removeProjectActivity(project.id, module.id, activity.id)}
                                ></i>
                              </td>
                            </tr>
                          )
                        }
                      </tbody>
                    </table>
                  </td>
                </tr>
              </>
            )
              : ''}
        </tbody>
      </table>

      <button
        className="btn indigo lighten-1 z-depth-0"
        onClick={() => resetToDefaultProjetModule(project.id)}
      >
        Rest to default
      </button>

      { newActivityModule ?
        <div style={{ position: 'fixed', width: '60%', padding: '20px', height: '300px', top: '30%', border: '1px solid black', left: '20%', backgroundColor: 'white' }}>
          <div className="bolder card-text">Add module</div>
          <div className="row" style={{ marginTop: '50px' }}>
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
          <div className="row" style={{ marginTop: '100px' }}>
            <div className="input-field col s2 right">
              <button
                className="btn indigo lighten-1 z-depth-0"
                onClick={() => addActivity()}
              >Add Activity</button>
            </div>
            <div className="input-field col s2 right">
              <button
                className="btn indigo lighten-1 z-depth-0"
                onClick={() => cancelActivity()}
              >Cancel</button>
            </div>
          </div>
        </div>
        : ''}
    </div >
  );
};

const mapStateToProps = (state) => {
  return {
    project: getSelectedProject(state),
    modules: getSelectedProjectModules(state),
    selectedProjectId: getSelectedProjectId(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseProject: (projectId) => dispatch(selectProject(projectId)),
    loadProject: (projectId) => dispatch(loadProjectAction(projectId)),
    resetToDefaultProjetModule: (projectId) => dispatch(resetProjectModulesAction(projectId)),
    removeProjectModule: (projectId, moduleId) => dispatch(removeProjectModuleAction(projectId, moduleId)),
    removeProjectActivity: (projectId, moduleId, activityId) => dispatch(removeProjectActivityAction(projectId, moduleId, activityId)),
    addNewModule: (projectId, module) => dispatch(addProjectModuleAction(projectId, module)),
    addNewActivity: (projectId, moduleId, activity) => dispatch(addProjectActivityAction(projectId, moduleId, activity))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ProjectSettings);
