import React from "react";
import { connect } from "react-redux";
import Activity from "./activity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Module = ({ key, module, geo, handleModalResources, setActivityProp, editResource, removeModule }) => {
  const geoDesc = geo[Object.keys(geo)[0]].description;
  return (
    <li>
      <div className="collapsible-header indigo lighten-2 white-text">
        <div className="center">
          <span className="bolder">{module.title}</span>{" "}
          <FontAwesomeIcon
              icon={getGeoIcon(geoDesc)}
              className="white-text"
              fixedWidth
            />{" "}{geoDesc}
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
        </div>
          <span className="right price">{module.moduleCost}</span>
      </div>
      <div className="collapsible-body">
        <ul className="collapsible">
          {Object.keys(module.activities).map((key) => (
            <Activity key={key+"_"+module.id+"_"+geoDesc} activityId={key} activity={module.activities[key]} moduleId={module.id} moduleTitle={module.title} geo={geoDesc} handleModalResources={handleModalResources} setActivityProp={setActivityProp} editResource={editResource} />
          ))}
        </ul>
      </div>
    </li>
  );
};

const getGeoIcon = (geo) => {
  if(geo) {
    let geoLower = geo.toLowerCase();
    if(geoLower.includes("africa")) {
      return "globe-africa";
    } else if(geoLower.includes("america")) {
      return "globe-americas";
    } else if(geoLower.includes("asia")) {
      return "globe-asia";
    } else if(geoLower.includes("europe")) {
      return "globe-europe";
    }
  }
  return "globe";
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Module);
