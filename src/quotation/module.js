import React from "react";
import { connect } from "react-redux";
import Activity from "./activity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Module = ({ key, module, handleModalResources }) => {
  return (
    <li>
      <div className="collapsible-header indigo lighten-2 white-text">
        <div className="center">
          <span className="bolder">{module.title}</span>{" "}
          <FontAwesomeIcon
              icon={getGeoIcon(module.geo)}
              className="white-text"
              fixedWidth
            />{" "}{module.geo}
          <span className="right price">{module.moduleCost}</span>
        </div>
      </div>
      <div className="collapsible-body">
        <ul className="collapsible">
          {Object.keys(module.activities).map((key) => (
            <Activity key={key+"_"+module.id+"_"+module.geo} activityId={key} activity={module.activities[key]} moduleId={module.id} moduleTitle={module.title} geo={module.geo} handleModalResources={handleModalResources} />
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
