import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Activity from "./activity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VIEW_MODES } from "../store/constants/constants";
import { removeModuleFromSelectedQuotation, addActivityToSelectedQuotation } from "../store/actions/quotationActions";
import { getBaseModulesWithActivitiesAsList } from "../store/selectors/selector";

const Module = ({
  module,
  removeModule,
  viewMode,
  quotationType,
  baseModules,
  addActivity
}) => {
  const [availableActivities, setAvailableActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(undefined);
  const [baseModule, setBaseModule] = useState(undefined);

  useEffect(() => {
    if (module) {
      const selectedBaseModule = baseModules.find(m => m.code == module.type);
      setBaseModule(selectedBaseModule);
      const notSelectedActivities = selectedBaseModule ? JSON.parse(JSON.stringify(selectedBaseModule.activities.filter(ba => !module.activities.find(a => a.code == ba.code)))) : [];
      setAvailableActivities(notSelectedActivities);
    }
  }, [module])

  const getGeoIcon = (geo) => {
    if (geo) {
      let geoLower = geo.toLowerCase();
      if (geoLower.includes("africa")) {
        return "globe-africa";
      } else if (geoLower.includes("america")) {
        return "globe-americas";
      } else if (geoLower.includes("asia")) {
        return "globe-asia";
      } else if (geoLower.includes("europe")) {
        return "globe-europe";
      }
    }
    return "globe";
  };

  const addActivityEvent = () => {
    addActivity(module.id, selectedActivity);
    setSelectedActivity(undefined);
  }

  const activityChange = (activityCode) => {
    if(activityCode != "-1") {
      const activity = baseModule.activities.find(a => a.code === activityCode);
      setSelectedActivity(activity);
    }
  };


  return (
    <li>
      <div className="collapsible-header indigo lighten-2 white-text">
        <div className="center">
          <div className="col s11">
            <span className="bolder">{module.title}</span>{" "}
            <FontAwesomeIcon
              icon={getGeoIcon(module.geo.description)}
              className="white-text"
              fixedWidth
            />{" "}
            {module.geo.description}
            {viewMode !== VIEW_MODES.VIEW ? (
              <a
                className="lateral-margin"
                title="Remove"
                onClick={() => removeModule(module.id)}
              >
                <FontAwesomeIcon
                  icon="minus-circle"
                  className="red-text text-darken-2"
                  fixedWidth
                />
              </a>
            ) : null}
          </div>
          <div className="col s1 text-right">
            <span className="price">{module.moduleCost || 0}</span>
          </div>
        </div>
      </div>
      <div className="collapsible-body">
        <ul className="collapsible">
          {module.activities ? module.activities.map((activity) => {
            return (
              <Activity
                key={activity.id}
                activity={activity}
                moduleId={module.id}
                moduleTitle={module.title}
                geo={module.geo.description}
                viewMode={viewMode}
                quotationType={quotationType}
              />
            );
          })
            : null}
          {viewMode !== VIEW_MODES.VIEW
            ? (
              <li>
                <div className="collapsible-header block">
                  <div className="row">
                    <div
                      id={"wrapper-select-activity" + module.id}
                      className="input-field col s7 offset-s1"
                    >
                      <select
                        id={"availableActivities" + module.id}
                        className="addActivitySelect"
                        onChange={(e) =>
                          activityChange(e.target.value)
                        }
                      >
                        <option key={module.id} value="-1" defaultValue>
                          Select activity
                      </option>
                        {availableActivities.map((activity) => {
                          return (
                            <option key={activity.code} value={activity.code}>
                              {activity.title}
                            </option>
                          );
                        })}
                      </select>
                      <label>Activity</label>
                    </div>
                    <div className="col s2 offset-s1">
                      <a
                        id={"availableActivitiesButton" + module.id}
                        className="waves-effect waves-light btn-small green darken-1"
                        disabled={!selectedActivity}
                        onClick={(e) => addActivityEvent(e)}
                      >
                        Add activity
                      <i className="left material-icons" title="Add activity">
                          add
                      </i>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ) : null}
        </ul>
      </div>
    </li>
  );
};

const mapStateToProps = (state) => {
  return {
    baseModules: getBaseModulesWithActivitiesAsList(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeModule: (moduleId) => dispatch(removeModuleFromSelectedQuotation(moduleId)),
    addActivity: (moduleId, activity) => dispatch(addActivityToSelectedQuotation(moduleId, activity))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Module);
