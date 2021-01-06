import React from "react";
import { connect } from "react-redux";
import { VIEW_MODES } from "../constants/constants";
import { editDefaultResourceCostInSelectedQuotation } from "../store/actions/quotationActions";

const ResourceCost = ({ resource, viewMode, editResourceCost }) => {

  const changeFee = (fee) => {
    editResourceCost(resource.id, fee);
  }

  return (
    <tr>
      <td>{resource.title} {resource.geo}</td>
      <td className="text-right">
        <input className="text-right browser-default" type="number" name={resource.id + resource.geo} min="0" max="999" value={resource.fee} onChange={(e) => changeFee(e.target.value)} disabled={viewMode === VIEW_MODES.VIEW ? true : null} />
      </td>
    </tr>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    editResourceCost: (resourceId, cost) => dispatch(editDefaultResourceCostInSelectedQuotation(resourceId, cost))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourceCost);
