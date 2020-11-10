import React from "react";
import { connect } from "react-redux";

const Resource = ({ resource, moduleId, geo, activityId, editResource, removeResource }) => {
  return (
    <tr>
      <td>{resource.resourceType}</td>
      <td className="text-right">{resource.resourceHourCost}</td>
      <td className="text-right"><input className="text-right browser-default" type="number" name={moduleId+geo+activityId+resource.resourceId} min="0" max="9999" value={resource.hours} onChange={(e) => editResource(moduleId, geo, activityId, resource, e.target.value)}></input></td>
      <td className="text-right">{resource.resourceCost}</td>
      <td className="text-right">
        <a href="#!" title="Remove resource" onClick={e => removeResource(e, moduleId, geo, activityId, resource.resourceId)}>
          <i className="tiny material-icons red-text text-darken-2">clear</i>
        </a>
      </td>
    </tr>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Resource);
