import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { VIEW_MODES } from "../constants/constants";
import {
  editResourceInSelectedQuotation,
  removeResourceFromSelectedQuotation
} from "../store/actions/quotationActions";

const ActivityResource = ({ resource, moduleId, activityId, editResource, removeResource, viewMode }) => {
  const [resourceHours, setResourceHours] = useState(0);

  useEffect(() => {
    setResourceHours(resource.hours)
  }, [resource]);

  const resourceHoursChanged = (hours) => {
    setResourceHours(hours);
    const newResource = {
      id: resource.id,
      hours: hours,
      title: resource.title
    };

    editResource(moduleId, activityId, newResource);
  }

  return (
    <tr>
      <td>{resource.title}</td>
      <td className="text-right">{resource.hourCost}</td>
      <td className="text-right">
        <input className="text-right browser-default" type="number" min="0" max="9999"
          value={resourceHours}
          onChange={(e) => resourceHoursChanged(e.target.value)}
          disabled={viewMode === VIEW_MODES.VIEW} />
      </td>
      <td className="text-right">{resource.cost}</td>
      {viewMode !== VIEW_MODES.VIEW ? (
        <td className="text-right">
          <a href="#!" title="Remove resource" onClick={() => removeResource(moduleId, activityId, resource.id)}>
            <i className="tiny material-icons red-text text-darken-2">clear</i>
          </a>
        </td>) : null}
    </tr>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeResource: (moduleId, activityId, resourceId) => dispatch(removeResourceFromSelectedQuotation(moduleId, activityId, resourceId)),
    editResource: (moduleId, activityId, resource) => dispatch(editResourceInSelectedQuotation(moduleId, activityId, resource))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityResource);
