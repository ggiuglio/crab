import React from "react";
import { connect } from "react-redux";
import ActivityResource from "./activityResource";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  VIEW_MODES
} from "../constants/constants";
import {
  removeActivityFromSelectedQuotation,
  editActivityInSelectedQuotation,
  showActivityResourceModal
} from "../store/actions/quotationActions";
import ActivityFixedCost from "./activityFixedCost";

const Activity = ({
  activity,
  moduleId,
  geo,
  viewMode,
  removeActivity,
  editActivity,
  showResourceModal
}) => {

  const iconTypeMap = {
    document: "folder",
    file: "file",
    process: "project-diagram",
    visit: "eye",
    contact: "phone-square-alt",
    hour: "clock",
    site: "location-arrow",
    month: "calendar-alt",
    study: "microscope",
    database: "database",
    user: "user",
    laboratory: "flask",
    subject: "medrt",
    sae: "book-dead",
    event: "calendar-check",
    page: "scroll",
    submission: "balance-scale",
    license: "id-badge",
    shipment: "truck",
    meeting: "handshake",
    member: "user-friends",
    patient: "user-injured",
    year: "dot-circle",
  };

  const deleteActivity = (e) => {
    removeActivity(moduleId, activity.id);
  };

  const editActivityNumber = (e) => {
    activity.unitNumber = e.target.value;
    editActivity(moduleId, activity);
  };

  const editActivityRespCRO = (active) => {
    activity.responsibilityCRO = active;
    editActivity(moduleId, activity);
  };

  const editActivityRespSPO = (active) => {
    activity.responsibilitySponsor = active;
    editActivity(moduleId, activity);
  };

  const addFixedCost = () => {
    activity.fixedCost = 0;
    editActivity(moduleId, activity);
  };

  const openResourceModal = (e) => {
    showResourceModal(moduleId, geo, activity.id);
  }

  const toggleResources = (id, event) => {
    event.preventDefault();
    let res = document.getElementById("resources_" + id);
    res.classList.contains("hide")
      ? res.classList.remove("hide")
      : res.classList.add("hide");
  };

  return (
    <li>
      <div className="collapsible-header block">
        <div className="row">
          <div className="col s4">
            <span className="bolder indigo-text">{activity.title}</span>
          </div>
          <div className="col s2">
            <span className="document-type">
              <FontAwesomeIcon
                icon={iconTypeMap[activity.unit.toLowerCase()]}
                className="indigo-text"
                fixedWidth
              />{" "}
              <span className="s-truncate">{activity.unit}</span>
            </span>
            {viewMode !== VIEW_MODES.VIEW ? (
              <a
                href="#!"
                className="lateral-margin"
                title="Remove"
                onClick={(e) => deleteActivity(e)}
              >
                <FontAwesomeIcon
                  icon="minus-circle"
                  className="red-text text-darken-2"
                  fixedWidth
                />
              </a>
            ) : null}
          </div>
          <div className="col s2">
            <div className="center price">
              <span className="hide-on-med-and-up mbold">Unit c: </span>
              <span className="hide-on-small-only mbold">Unit cost: </span>
              <br className="hide-on-med-and-up" />
              {activity.unitCost || 0}
            </div>
          </div>
          <div className="col s2">
            <div className="center">
              <span className="hide-on-med-and-up mbold">Unit n: </span>
              <span className="hide-on-small-only mbold">Unit number: </span>
              <br className="hide-on-med-and-up" />
              <input
                className="text-right browser-default unit-number-input"
                type="number"
                name={"unitNumber" + moduleId + geo + activity.id}
                min="0"
                max="99"
                value={activity.unitNumber || 0}
                onChange={(e) => editActivityNumber(e)}
                disabled={viewMode === VIEW_MODES.VIEW ? true : null}
              ></input>
            </div>
          </div>
          <div className="col s2">
            <div className="center price">
              <span className="hide-on-med-and-up mbold">Total: </span>
              <span className="hide-on-small-only mbold">Total cost: </span>
              <br className="hide-on-med-and-up" />
              {activity.activityCost || 0}
            </div>
          </div>
        </div>
      </div>
      <div className="collapsible-body">
        <div className="row">
          <div className="col s5 m2 activityCheck">
            <label className="hide-on-med-and-down">
              <input
                type="checkbox"
                checked={activity.responsibilityCRO === true}
                onChange={(e) =>
                  editActivityRespCRO(
                    !activity.responsibilityCRO
                  )
                }
                disabled={viewMode === VIEW_MODES.VIEW ? true : null}
              />
              <span>Responsibility CRO</span>
            </label>
            <label className="hide-on-large-only">
              <input
                type="checkbox"
                checked={activity.responsibilityCRO === true}
                onChange={(e) =>
                  editActivityRespCRO(
                    !activity.responsibilityCRO
                  )
                }
                disabled={viewMode === VIEW_MODES.VIEW ? true : null}
              />
              <span>Resp CRO</span>
            </label>
          </div>
          <div className="col s5 m2 activityCheck">
            <label className="hide-on-med-and-down">
              <input
                type="checkbox"
                checked={activity.responsibilitySponsor === true}
                onChange={(e) =>
                  editActivityRespSPO(
                    !activity.responsibilitySponsor
                  )
                }
                disabled={viewMode === VIEW_MODES.VIEW ? true : null}
              />
              <span>Responsibility SPONSOR</span>
            </label>
            <label className="hide-on-large-only">
              <input
                type="checkbox"
                checked={activity.responsibilitySponsor === true}
                onChange={(e) =>
                  editActivityRespSPO(
                    !activity.responsibilitySponsor
                  )
                }
                disabled={viewMode === VIEW_MODES.VIEW ? true : null}
              />
              <span>Resp SPO</span>
            </label>
          </div>
          <div className="col s2 side-by-side resourcesTrigger">
            <a href="#!" onClick={(e) => toggleResources(activity.code, e)}>
              <FontAwesomeIcon
                icon="user-tie"
                className="indigo-text"
                title="Show Resources"
                fixedWidth
              />
              <span className="hide-on-med-and-down ">
                {" "}
                Show&nbsp;Resources
              </span>
              <span className="hide-on-small-only hide-on-large-only">
                {" "}
                Show&nbsp;Res
              </span>
            </a>
          </div>
          <div className="col s12 m6 italic s-space-up activityComment">
            {activity.comment}
          </div>
        </div>
        <div className="container hide" id={"resources_" + activity.code}>
          <div className="container">
            <div className="row centered">
              <div className="col s10">
                <table className="responsive-table">
                  <thead>
                    <tr>
                      <th className="hide-on-small-only">Type</th>
                      <th className="text-right hide-on-small-only">
                        Resource cost E/h
                      </th>
                      <th className="text-right hide-on-small-only">Hours</th>
                      <th className="text-right hide-on-small-only">
                        Resource cost €
                      </th>
                      <th className="hide-on-med-and-up">Type</th>
                      <th className="text-right hide-on-med-and-up">€/h</th>
                      <th className="text-right hide-on-med-and-up">Hours</th>
                      <th className="text-right hide-on-med-and-up">Cost €</th>
                      {viewMode !== VIEW_MODES.VIEW ? <th></th> : null}
                    </tr>
                  </thead>
                  <tbody>
                    {activity.fixedCost || activity.fixedCost === 0 ? (
                      <ActivityFixedCost moduleId={moduleId} activity={activity} viewMode={viewMode} />
                    ) : null}
                    {
                      activity.resources
                        ? activity.resources.map((resource) => (
                          <ActivityResource
                            key={resource.id}
                            moduleId={moduleId}
                            activityId={activity.id}
                            resource={resource}
                            viewMode={viewMode}
                          />
                        ))
                        : null
                    }
                  </tbody>
                </table>
              </div>
              {
                viewMode !== VIEW_MODES.VIEW ? (
                  <div className="col s1">
                    <a
                      href="#!"
                      onClick={() => {
                        openResourceModal()
                      }}
                    >
                      <i
                        className="material-icons indigo-text"
                        title="Add resource"
                      >
                        add_circle_outline
                    </i>
                    </a>
                  </div>
                ) : null
              }
              {
                viewMode !== VIEW_MODES.VIEW && !activity.fixedCost ? (
                  <div className="col s1">
                    <a
                      href="#!"
                      title="Add fixed costs"
                      onClick={(e) => {
                        e.preventDefault();
                        addFixedCost();
                      }}
                    >
                      <i
                        className="material-icons amber-text text-accent-4"
                        title="Add fixed costs"
                      >
                        attach_money
                    </i>
                    </a>
                  </div>
                ) : ''
              }
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeActivity: (moduleId, activityId) => dispatch(removeActivityFromSelectedQuotation(moduleId, activityId)),
    editActivity: (moduleId, activity) => dispatch(editActivityInSelectedQuotation(moduleId, activity)),
    showResourceModal: (moduleId, moduleGeo, activityId) => dispatch(showActivityResourceModal(moduleId, moduleGeo, activityId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
