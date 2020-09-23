import React from "react";
import { connect } from "react-redux";
import Resource from "./resource";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Activity = ({ key, activity }) => {
  const iconTypeMap = {
    document: "file",
    process: "project-diagram",
    visit: "eye",
  };
  let rdm = Date.now();
  return (
    <li>
      <div className="collapsible-header block">
        <div className="section center">
          <span className="bolder indigo-text">{activity.title}</span>{" "}
          <span className="document-type side-by-side">
            <FontAwesomeIcon
              icon={iconTypeMap[activity.unit.toLowerCase()]}
              className="indigo-text"
              fixedWidth
            />{" "}
            {activity.unit}
          </span>
          <div className="right"></div>
        </div>
        <div className="row">
          <div className="col s4">
            <div className="center price">
              <span className="hide-on-med-and-up mbold">Unit c: </span>
              <span className="hide-on-small-only mbold">Unit cost: </span>
              <br className="hide-on-med-and-up" />
              {activity.unitCost}
            </div>
          </div>
          <div className="col s4">
            <div className="center">
              <span className="hide-on-med-and-up mbold">Unit n: </span>
              <span className="hide-on-small-only mbold">Unit number: </span>
              <br className="hide-on-med-and-up" />
              {activity.unitNumber}
            </div>
          </div>
          <div className="col s4">
            <div className="center price">
              <span className="hide-on-med-and-up mbold">Total: </span>
              <span className="hide-on-small-only mbold">Total cost: </span>
              <br className="hide-on-med-and-up" />
              {activity.activityCost}
            </div>
          </div>
        </div>
      </div>
      <div className="collapsible-body">
        <div className="row">
          <div className="col s5 m2">
            <label className="hide-on-med-and-down">
              <input
                type="checkbox"
                checked={activity.responsibilityCRO}
                disabled="disabled"
              />
              <span>Responsibility CRO</span>
            </label>
            <label className="hide-on-large-only">
              <input
                type="checkbox"
                checked={activity.responsibilityCRO}
                disabled="disabled"
              />
              <span>Resp CRO</span>
            </label>
          </div>
          <div className="col s5 m2">
            <label className="hide-on-med-and-down">
              <input
                type="checkbox"
                checked={activity.responsibilitySponsor}
                disabled="disabled"
              />
              <span>
                Responsibility SPONSOR
              </span>
            </label>
            <label className="hide-on-large-only">
              <input
                type="checkbox"
                checked={activity.responsibilitySponsor}
                disabled="disabled"
              />
              <span>Resp SPO</span>
            </label>
          </div>
          <div className="col s2 side-by-side">
            <a href="!#" onClick={(e) => toggleResources(rdm, e)}>
              <FontAwesomeIcon
                icon="user-tie"
                className="indigo-text"
                title="Show Resources"
                fixedWidth
              />
              <span className="hide-on-med-and-down"> Show&nbsp;Resources</span>
              <span className="hide-on-small-only hide-on-large-only">
                {" "}
                Show&nbsp;Res
              </span>
            </a>
          </div>
          <div className="col s12 m6 italic s-m-space-up">{activity.comment}</div>
        </div>
        <div className="container hide" id={"resources_" + rdm}>
          <div className="container">
            <table className="centered responsive-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Hours</th>
                  {/* <th>Item Price</th> */}
                </tr>
              </thead>
              <tbody>
                {activity.resources.map((resource) => (
                  <Resource key={resource.id} resource={resource} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </li>
  );
};

const toggleResources = (id, event) => {
  event.preventDefault();
  let res = document.getElementById("resources_" + id);
  res.classList.contains("hide")
    ? res.classList.remove("hide")
    : res.classList.add("hide");
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
