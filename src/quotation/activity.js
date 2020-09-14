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
  return (
    <li>
      <div className="collapsible-header">
        <div className="row">
          <div className="col s7 l5">
            <span className="indigo-text indigo-darken-2 space-right">
              <b>{activity.title}</b>
            </span>
            
          </div>
          <div className="col s4 l2"><span className="document-type">
              <FontAwesomeIcon
                icon={iconTypeMap[activity.unit.toLowerCase()]}
                className="indigo-text"
                fixedWidth
              />
              {activity.unit}
            </span></div>
          <div className="col s1 l1"></div>
          <div className="col s4 l1">
            <span className="price right">Unit cost: {activity.unitCost}</span>
          </div>
          <div className="col s4 l2">
            <span className="right">Unit number: {activity.unitNumber}</span>
          </div>
          <div className="col s4 l1">
            <span className="price right">
              Total cost: {activity.activityCost}
            </span>
          </div>
        </div>
        {/* <span className="indigo-text indigo-darken-2 space-right">
          <b>{activity.title}</b>
        </span> */}
        {/* <FontAwesomeIcon icon="file" className="indigo-text" fixedWidth />
        <span className="document-type">{activity.unit}</span> */}
        {/* <div className="right"> */}
        {/* <span className="price">Unit cost: {activity.unitCost}</span> */}
        {/* <span>Unit number: {activity.unitNumber}</span> */}
        {/* <span className="price">Total cost: {activity.activityCost}</span> */}
        {/* </div> */}
      </div>
      <div className="collapsible-body" id={key}>
        <div className="row">
          {activity.resources.map((resource) => (
            <Resource key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </li>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
