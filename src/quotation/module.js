import React from "react";
import { connect } from "react-redux";
import Activity from "./activity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VIEW_MODES } from "../store/constants/constants";

const Module = ({
  key,
  module,
  geo,
  handleModalResources,
  setActivityProp,
  editResource,
  removeModule,
  removeActivity,
  availableActivities,
  activityChange,
  addActivity,
  removeResource,
  viewMode,
  quotationType,
}) => {
  const geoDesc = geo ? geo[Object.keys(geo)[0]].description : "N/A";
  return (
    <li>
      <div className="collapsible-header indigo lighten-2 white-text">
        <div className="center">
          <div className="col s11">
            <span className="bolder">{module.title}</span>{" "}
            <FontAwesomeIcon
              icon={getGeoIcon(geoDesc)}
              className="white-text"
              fixedWidth
            />{" "}
            {geoDesc}
            {viewMode !== VIEW_MODES.VIEW ? (
              <a
                href="!#"
                className="lateral-margin"
                title="Remove"
                onClick={(e) => {
                  removeModule(e, module.id, geo);
                }}
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
          {module.activities
            ? Object.entries(module.activities)
                .sort((a, b) => (a[1].index > b[1].index ? 1 : -1))
                .map((objArray) => {
                  const key = objArray[0];
                  const value = objArray[1];
                  return (
                    <Activity
                      key={key + "_" + module.id + "_" + geoDesc}
                      activityId={key}
                      activity={value}
                      moduleId={module.id}
                      moduleTitle={module.title}
                      geo={geoDesc}
                      handleModalResources={handleModalResources}
                      setActivityProp={setActivityProp}
                      editResource={editResource}
                      removeActivity={removeActivity}
                      removeResource={removeResource}
                      viewMode={viewMode}
                      quotationType={quotationType}
                    />
                  );
                })
            : null}
          {viewMode !== VIEW_MODES.VIEW &&
          availableActivities &&
          availableActivities.hasOwnProperty(module.id) &&
          availableActivities[module.id].hasOwnProperty(geoDesc) &&
          Object.keys(availableActivities[module.id][geoDesc]).length > 0 ? (
            <li>
              <div className="collapsible-header block">
                <div className="row">
                  <div
                    id={"wrapper-select-activity" + module.id + geoDesc}
                    className="input-field col s7 offset-s1"
                  >
                    <select
                      id={"availableActivities" + module.id + geoDesc}
                      className="addActivitySelect"
                      onChange={(e) =>
                        activityChange(module.id, geoDesc, e.target.value)
                      }
                    >
                      <option key={module.id + geoDesc} value="" defaultValue>
                        Select activity
                      </option>
                      {Object.entries(availableActivities[module.id][geoDesc])
                        .sort((a, b) => (a[1].index > b[1].index ? 1 : -1))
                        .map((objArray) => {
                          const key = objArray[0];
                          const value = objArray[1];
                          return (
                            <option key={module.id + geoDesc + key} value={key}>
                              {value.title}
                            </option>
                          );
                        })}
                    </select>
                    <label>Activity</label>
                  </div>
                  <div className="col s2 offset-s1">
                    <a
                      id={"availableActivitiesButton" + module.id + geoDesc}
                      className="waves-effect waves-light btn-small green darken-1"
                      href="#!"
                      disabled
                      onClick={(e) => addActivity(e, module.id, geoDesc)}
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

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Module);
