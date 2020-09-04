import React from "react";
import { connect } from "react-redux";
import Resource from "./resource";

const Activity = ({ key, activity }) => {
  return (
    <li>
      <div className="collapsible-header">{activity.title}</div>
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
