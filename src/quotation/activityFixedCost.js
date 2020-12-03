import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { VIEW_MODES } from "../store/constants/constants";
import { editActivityInSelectedQuotation } from "../store/actions/quotationActions";

const ActivityFixedCost = ({ moduleId, activity, editActivity, viewMode }) => {
  const [fixedCost, setFixedCost] = useState(0);

  useEffect(() => {
    setFixedCost(activity.fixedCost)
  }, [activity]);

  const fixedCostChanged = (cost) => {
    setFixedCost(cost);
    activity.fixedCost = cost;
    editActivity(moduleId, activity);
  }

  const removeFixedCost= () => {
    setFixedCost(undefined);
    activity.fixedCost = undefined;
    editActivity(moduleId, activity);
  }

  return (
    <tr>
      <td>FixedCost</td>
      <td className="text-right"></td>
      <td className="text-right">
      </td>
      <td className="text-right">
        <input className="text-right browser-default" type="number" min="0" max="9999"
          value={fixedCost}
          onChange={(e) => fixedCostChanged(e.target.value)}
          disabled={viewMode === VIEW_MODES.VIEW} />
      </td>
      {viewMode !== VIEW_MODES.VIEW ? (
        <td className="text-right">
          <a title="Remove resource" onClick={() => removeFixedCost()}>
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
    editActivity: (moduleId, activity) => dispatch(editActivityInSelectedQuotation(moduleId, activity))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityFixedCost);
